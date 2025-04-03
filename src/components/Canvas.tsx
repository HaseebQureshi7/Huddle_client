import { useRef, useEffect, useState } from "react";
import Button from "./ui/Button";
import {
  ArrowClockwise,
  Broom,
  Chalkboard,
  Eraser,
  Upload,
} from "@phosphor-icons/react";
import Typography from "./ui/Typography";
import { RowFlex } from "../styles/utils/flexUtils";
import colors from "../styles/colors";
import { IRoom } from "../types/IRoom";
import useUpdateCanvas from "../hooks/useUpdateCanvas";
import { ICanvas } from "../types/ICanvas";
import { Socket } from "socket.io-client";
import useFetchLatestCanvas from "../hooks/useFetchLatestCanvas";

interface ICanvasProps {
  room: IRoom;
  socket: typeof Socket;
  canvas: ICanvas;
}

function Canvas({ room, socket, canvas }: ICanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevMouse, setPrevMouse] = useState<{ x: number; y: number } | null>(
    null
  );
  const [isErasing, setIsErasing] = useState(false);
  const [canvasData, setCanvasData] = useState<string | null>(canvas?.data); // Store canvas contents

  const { mutate: syncCanvasState, isPending: syncCanvasStatus } =
    useUpdateCanvas();

  const {
    data: latestCanvasData,
    refetch,
  } = useFetchLatestCanvas(canvas.id!);

  const update = () => {
    const updateCanvasData: Partial<ICanvas> = {
      id: canvas.id,
      data: canvasData,
    };
    syncCanvasState(updateCanvasData);
  };

  const sendNewCanvasEvent = () => {
    socket.emit("new-canvas-state", { roomId: room.id, canvasState: "new" });
  };

  useEffect(() => {
    const handleNewCanvasState = async () => {
      console.log("New canvas state received!");
      await refetch(); // Fetch the latest data
    };

    socket.on("new-canvas-state", handleNewCanvasState);

    return () => {
      socket.off("new-canvas-state", handleNewCanvasState);
    };
  }, [socket, refetch]);

  useEffect(() => {
    // console.log(latestCanvasData)
    setCanvasData(latestCanvasData);
  }, [latestCanvasData]);

  // Only save when user makes changes
  useEffect(() => {
    if (canvasData) {
      update()
      sendNewCanvasEvent();
    }
  }, [canvasData]);

  // Clear canvas
  const clearScreen = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasData(null); // Reset stored data
    // update()
    sendNewCanvasEvent()
  };

  const toggleEraser = () => {
    setIsErasing((prev) => !prev);
  };

  const [isErasingActive, setIsErasingActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Restore previous canvas data if available
    if (canvasData) {
      const img = new Image();
      img.src = canvasData;
      img.onload = () => ctx.drawImage(img, 0, 0);
    }

    const updateCanvasSize = () => {
      const { width, height } = canvas.parentElement?.getBoundingClientRect()!;
      setCanvasSize({ width, height });
    };
    updateCanvasSize();

    const getPosition = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ("touches" in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      if (isErasing) {
        setIsErasingActive(true);
        erase(e);
        return;
      }
      setIsDrawing(true);
      setPrevMouse(getPosition(e));
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing || !prevMouse) return;
      const pos = getPosition(e);

      ctx.beginPath();
      ctx.moveTo(prevMouse.x, prevMouse.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();

      setPrevMouse(pos);
    };

    const erase = (e: MouseEvent | TouchEvent) => {
      if (!isErasingActive) return;
      const pos = getPosition(e);
      ctx.clearRect(pos.x - 10, pos.y - 10, 20, 20);
    };

    const stopDrawing = () => {
      setIsDrawing(false);
      setPrevMouse(null);
      setIsErasingActive(false);
      saveCanvas(); // Save canvas after drawing
    };

    const saveCanvas = () => {
      const data = canvas.toDataURL(); // Convert canvas to Base64
      setCanvasData(data);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mousemove", erase);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchmove", erase);
    canvas.addEventListener("touchend", stopDrawing);
    canvas.addEventListener("touchcancel", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mousemove", erase);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);

      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchmove", erase);
      canvas.removeEventListener("touchend", stopDrawing);
      canvas.removeEventListener("touchcancel", stopDrawing);
    };
  }, [isDrawing, isErasing, prevMouse, isErasingActive, canvasData]);

  // Update called to set the current canvas data from the db
  useEffect(() => {
    update();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Name / Info - LEFT SIDE */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: syncCanvasStatus ? colors.primary : "grey",
          ...RowFlex,
          gap: "10px",
        }}
      >
        {syncCanvasStatus ? (
          <ArrowClockwise className="rotate-infinite" />
        ) : (
          <Chalkboard />
        )}
        <Typography>{syncCanvasStatus ? "Saving..." : room?.name}</Typography>
      </div>

      {/* Toolbar - RIGHT SIDE */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          borderRadius: "12.5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Button
          onClick={toggleEraser}
          style={{ backgroundColor: isErasing ? colors.info : "black" }}
        >
          <Eraser />
        </Button>
        <Button onClick={clearScreen}>
          <Broom />
        </Button>
        <Button onClick={update}>
          <Upload />
        </Button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          backgroundColor: "whitesmoke",
          display: "block",
          touchAction: "none",
          cursor: isErasing ? "cell" : "crosshair",
        }}
      />
    </div>
  );
}

export default Canvas;
