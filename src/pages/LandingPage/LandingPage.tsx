import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ColFlex, PageFlex } from "../../styles/utils/flexUtils";
import { preloadImages } from "../../utils/imagePreloader";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useUser } from "../../hooks/useUser";

function LandingPage() {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // navigate to dashboard if the user exits
  const { user } = useUser();
  if (user) {
    // navigate("/dashboard");
    return;
  }

  // Preload images and Auto navigate to the next page
  useEffect(() => {
    preloadImages(["/images/huddle-logo-top.png"]).then((loaded) => {
      setImagesLoaded(loaded);

      setTimeout(() => {
        if (location.pathname == "/") {
          navigate("/login");
        }
      }, 3000);
    });
  }, []);

  if (!imagesLoaded) return <LoadingPage width={"100%"} height={"100dvh"} />;

  return (
    <div
      className="fade-in"
      style={{ ...PageFlex, alignItems: "center", justifyContent: "center" }}
    >
      <img
        className="heart_beat_infinite"
        style={{ width: "10%", aspectRatio: "auto" }}
        src="/images/huddle-logo-top.png"
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
