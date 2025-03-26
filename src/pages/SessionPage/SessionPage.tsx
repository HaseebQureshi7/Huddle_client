import { useParams } from "react-router-dom";
import Canvas from "../../components/Canvas";
import VideoStream from "../../components/VideoStream";
import useGetRoom from "../../hooks/useGetRoom";
import useGetCanvasByRoomId from "../../hooks/useGetCanvasByRoomId";
import LoadingPage from "../LoadingPage/LoadingPage";
import NoRoomFound from "./NoRoomFound";
import Button from "../../components/ui/Button";
import {
  Confetti,
  CornersOut,
  Hand,
  MicrophoneSlash,
  PhoneDisconnect,
  Webcam,
} from "@phosphor-icons/react";
import { ColFlex, RowFlex } from "../../styles/utils/flexUtils";
import colors from "../../styles/colors";
import { useEffect, useState } from "react";
import { ICanvas } from "../../types/ICanvas";
import CreateNewCanvas from "./CreateNewCanvas";

function SessionPage() {
  const { id: room_id } = useParams();
  const { data: room, isLoading: roomLoading } = useGetRoom(room_id!);

  // Always call hooks at the top level. If room is not available, the query is disabled.
  const { data: existingCanvas, isPending: isFindingExistingCanvas } =
    useGetCanvasByRoomId(room?.id!);

  const [currentCanvas, setCurrentCanvas] = useState<ICanvas | null>(null);
  const [actionbarActive, setActionbarActive] = useState(false);

  // Handle side effects (setting canvas) in an effect.
  useEffect(() => {
    if (room && !isFindingExistingCanvas) {
      if (existingCanvas) {
        console.log("Existing canvas found!");
        setCurrentCanvas(existingCanvas);
      }
    }
  }, [room, existingCanvas, isFindingExistingCanvas, currentCanvas]);

  // Handle loading or missing room
  if (roomLoading) {
    return <LoadingPage width="100dvw" height="100dvh" />;
  }

  if (!room) {
    return <NoRoomFound />;
  }

  if (isFindingExistingCanvas) {
    return <LoadingPage width="100dvw" height="100dvh" />;
  }

  // Now you know the room exists and your hook is either disabled or finished.
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      style={{
        ...RowFlex,
        width: "100dvw",
        height: "100dvh",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "black",
        padding: "10px",
        gap: "15px",
      }}
    >
      {/* Canvas Section */}
      <div
        style={{
          width: "70%",
          height: "100%",
          border: "2px solid grey",
          borderRadius: "12.5px",
          overflow: "hidden",
        }}
      >
        {currentCanvas ? (
          <Canvas room={room} canvas={currentCanvas} />
        ) : (
          <CreateNewCanvas setCurrentCanvas={setCurrentCanvas} />
        )}
      </div>

      {/* Video Streams Section */}
      <div
        style={{
          ...ColFlex,
          width: "30%",
          height: "100%",
          justifyContent: "flex-start",
          border: "2px solid grey",
          borderRadius: "12.5px",
          padding: "10px",
          gap: "10px",
          overflowY: "scroll",
          scrollbarWidth: "thin",
        }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <VideoStream key={index} />
        ))}
      </div>

      {/* Floating Action Bar / Controls */}
      <div
        onMouseEnter={() => setActionbarActive(true)}
        onMouseLeave={() => setActionbarActive(false)}
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 999,
          width: actionbarActive ? "40%" : "20%",
          backgroundColor: "rgba(150,150,150, 0.3)",
          backdropFilter: "blur(2px)",
          borderRadius: "12.5px",
          padding: "5px",
          ...RowFlex,
          justifyContent: "space-evenly",
          transition: "all 0.4s",
        }}
      >
        <Button>
          <Confetti
            style={{ transition: "all 0.4s" }}
            size={actionbarActive ? 25 : 15}
          />
        </Button>
        <Button>
          <MicrophoneSlash
            style={{ transition: "all 0.4s" }}
            size={actionbarActive ? 25 : 15}
          />
        </Button>
        <Button>
          <Webcam
            style={{ transition: "all 0.4s" }}
            size={actionbarActive ? 25 : 15}
          />
        </Button>
        <Button style={{ backgroundColor: colors.error }}>
          <PhoneDisconnect
            style={{ transition: "all 0.4s" }}
            size={actionbarActive ? 25 : 15}
          />
        </Button>
        <Button style={{ backgroundColor: colors.warning }}>
          <Hand
            style={{ transition: "all 0.4s" }}
            size={actionbarActive ? 25 : 15}
          />
        </Button>
        <Button onClick={toggleFullScreen}>
          <CornersOut
            style={{ transition: "all 0.4s" }}
            size={actionbarActive ? 25 : 15}
          />
        </Button>
      </div>
    </div>
  );
}

export default SessionPage;
