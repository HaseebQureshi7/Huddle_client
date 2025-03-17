import { useEffect } from "react";
import { ColFlex, PageFlex } from "../styles/utils/flexUtils";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  // Auto navigate to the next page
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }, []);

  return (
    <div
      className="fade-in"
      style={{ ...PageFlex, alignItems: "center", justifyContent: "center" }}
    >
      <img
        className="heart_beat_infinite"
        style={{ width: "10%", aspectRatio: "auto" }}
        src="/public/images/huddle-logo-top.png"
      />
      <div style={{ ...ColFlex }}>
        <h1 className="gradient-text" style={{ fontWeight: 500 }}>
          Huddle
        </h1>
        <h5 style={{ fontWeight: 500, color: "grey" }}>
          Collaborative Space for creatives
        </h5>
      </div>
    </div>
  );
}

export default LandingPage;
