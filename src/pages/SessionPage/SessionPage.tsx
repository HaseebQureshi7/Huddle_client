import { useNavigate, useParams } from "react-router-dom";
import Canvas from "../../components/Canvas";
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
import { RowFlex } from "../../styles/utils/flexUtils";
import colors from "../../styles/colors";
import { useEffect, useRef, useState } from "react";
import { ICanvas } from "../../types/ICanvas";
import CreateNewCanvas from "./CreateNewCanvas";
import { socketURL } from "../../config/baseURL";
import io from "socket.io-client";
import { useUser } from "../../hooks/useUser";
import VideoStreamingContainer from "./VideoStreamingContainer";
import { useAlert } from "../../hooks/useAlert";
import { IStreamOptions } from "../../types/IStreamOptions";

function SessionPage() {
  const { id: room_id } = useParams();
  const {
    data: room,
    isLoading: roomLoading,
    isError: roomError,
  } = useGetRoom(room_id!);
  const { data: existingCanvas, isPending: isFindingExistingCanvas } =
    useGetCanvasByRoomId(room?.id!);

  const navigate = useNavigate();

  const [currentCanvas, setCurrentCanvas] = useState<ICanvas | null>(null);
  const [actionbarActive, setActionbarActive] = useState(false);

  const [streamOptions, setStreamOptions] = useState<IStreamOptions>({
    audio: true,
    video: true,
  });

  useEffect(() => {
    if (room && !isFindingExistingCanvas && existingCanvas) {
      setCurrentCanvas(existingCanvas);
    }
  }, [room, existingCanvas, isFindingExistingCanvas]);

  // Socket Setup
  const { user } = useUser();
  const socketRef = useRef<any>(null);
  const { showAlert, edgeGlow } = useAlert();
  // Use memberDetails instead of memberIds – each member has id and name
  const [memberDetails, setMemberDetails] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const joinRoom = () => {
    if (room && user) {
      // Emit join-room along with user's id and name
      socketRef.current.emit("join-room", {
        roomId: room.id,
        userId: user.id,
        userName: user.name,
      });
    }
  };

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io(socketURL);
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Join room when available
  useEffect(() => {
    if (room) {
      joinRoom();
    }
  }, [room]);

  useEffect(() => {
    const handleRoomMembers = ({ members }: any) => {
      // memberDetails is the previous state (default to empty array if undefined)
      const oldMembers = memberDetails || [];

      // Find which members have left: those in oldMembers not in the new members list
      const leftMembers = oldMembers.filter(
        (old) => !members.some((m: any) => m.id === old.id)
      );

      // Find which members have joined: those in new members not in oldMembers
      const joinedMembers = members.filter(
        (m: any) => !oldMembers.some((old) => old.id === m.id)
      );

      leftMembers.forEach((member) => {
        showAlert(`${member.name} has left`, "error");
        edgeGlow("error");
      });

      joinedMembers.forEach((member: any) => {
        // Optionally, ignore showing alert if it's the current user
        if (member.name !== user?.name) {
          showAlert(`${member.name} has joined`, "info");
          edgeGlow("info");
        }
      });

      // Update state with new members
      setMemberDetails(members);
    };

    socketRef.current.on("room-members", handleRoomMembers);
    return () => {
      socketRef.current.off("room-members", handleRoomMembers);
    };
  }, [memberDetails, user, edgeGlow, showAlert]);

  if (roomLoading || isFindingExistingCanvas) {
    return <LoadingPage width="100dvw" height="100dvh" />;
  }
  if (roomError || !room) {
    return <NoRoomFound />;
  }

  // To toggle audio:
  const toggleAudio = () => {
    showAlert("Audio off", "info");
    setStreamOptions((prev) => ({ ...prev, audio: !prev.audio }));
  };

  // To toggle video:
  const toggleVideo = () => {
    if (streamOptions.video) {
      showAlert("Video off", "info");
      setStreamOptions((prev) => ({ ...prev, video: false }));
    } else {
      showAlert("Video on", "info");
      setStreamOptions((prev) => ({ ...prev, video: true }));
    }
  };

  const leaveSession = () => {
    showAlert("You left", "info");
    socketRef.current.disconnect();
    navigate("/dashboard");
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error enabling full-screen mode: ${err.message}`);
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
      <VideoStreamingContainer
        memberDetails={memberDetails}
        socket={socketRef.current}
        room={room}
        user={user}
        streamOptions={streamOptions}
      />

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
          transition: "all 0.4s",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button>
          <Confetti
            style={{ transition: "all 0.4s" }}
            size={actionbarActive ? 25 : 15}
          />
        </Button>
        <Button
          onClick={toggleAudio}
          style={{
            backgroundColor: streamOptions.audio ? "black" : colors.error,
          }}
        >
          <MicrophoneSlash
            style={{ transition: "all 0.4s" }}
            size={actionbarActive ? 25 : 15}
          />
        </Button>
        <Button
          onClick={toggleVideo}
          style={{
            backgroundColor: streamOptions.video ? "black" : colors.error,
          }}
        >
          <Webcam
            style={{ transition: "all 0.4s" }}
            size={actionbarActive ? 25 : 15}
          />
        </Button>
        <Button
          onClick={leaveSession}
          style={{ backgroundColor: colors.error }}
        >
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
