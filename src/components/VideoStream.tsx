import { ColFlex, RowFlex } from "../styles/utils/flexUtils";
import colors from "../styles/colors";
import { useEffect, useRef, useState } from "react";
import { SpeakerHigh } from "@phosphor-icons/react";
import Button from "./ui/Button";
import Typography from "./ui/Typography";

function VideoStream() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        // console.log(userStream)
        setStream(userStream);
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
        }
      } catch (err) {
        console.log("Error accessing webcam:", err);
      }
    };

    getMediaStream();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div
    className="fade-in-fast"
      style={{
        ...ColFlex,
        width: "100%",
        // height: "100%",
        aspectRatio: 2,
        borderRadius: "12.5px",
        backgroundColor: colors.warning,
        position: "relative",
      }}
    >
      {/* Name & Mute */}
      <div
        style={{
          position: "absolute",
          top: "5px",
          left: "5px",
          zIndex: 999,
          ...RowFlex,
          gap: "10px",
        }}
      >
        <Button style={{ padding: "5px 10px" }}>
          <SpeakerHigh />
          <Typography styles={{ fontWeight: 600, color: "grey" }}>
            Haseeb Parvaiz
          </Typography>
        </Button>
      </div>

      {/* ✅ Attach ref to video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", height: "100%", borderRadius: "12.5px" }}
      />
    </div>
  );
}

export default VideoStream;
