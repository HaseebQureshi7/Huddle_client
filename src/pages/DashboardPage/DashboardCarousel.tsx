import { useEffect, useState } from "react";
import { ColFlex } from "../../styles/utils/flexUtils";
import { preloadImages } from "../../utils/imagePreloader";
import LoadingPage from "../LoadingPage/LoadingPage";

const images = [
  "/public/images/illustrations/illustration-0.gif",
  "/public/images/illustrations/illustration-1.gif",
  "/public/images/illustrations/illustration-2.gif",
  "/public/images/illustrations/illustration-3.gif",
  "/public/images/illustrations/illustration-4.gif",
];

function DashboardCarousel() {
  const [currImageIndex, setCurrImageIndex] = useState<number>(0);
  const [imagesLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    preloadImages(images).then(() => {
      setImageLoaded(true);
      const interval = setInterval(() => {
        setCurrImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000);

      return () => clearInterval(interval);
    });
  }, []);

  if (!imagesLoaded) return <LoadingPage width={"40%"} height={"350px"} />;

  return (
    <div
      className="fade-in"
      style={{
        width: "40%",
        height: "350px",
        ...ColFlex,
        overflow: "hidden",
        aspectRatio: 1,
      }}
    >
      {/* upcoming / shadow image */}
      <img
        key={images[currImageIndex]}
        className="heart_beat_infinite"
        src={images[currImageIndex]}
        style={{
          height: "250px",
          position: "absolute",
          filter: "brightness(0.5)",
          zIndex: "-1",
          marginTop: "50px",
          marginRight: "50px",
          borderRadius: "10px",
          backgroundColor: "lightgrey",
          boxShadow: "20px 10px 20px rgba(0, 0, 0, 0.5)",
        }}
      />
      {/* current image */}
      <img
        className="heart_beat_infinite"
        key={images[currImageIndex + 1]}
        src={images[(currImageIndex + 1) % images.length]}
        style={{ height: "250px", width: "auto", borderRadius: "10px" }}
      />
    </div>
  );
}

export default DashboardCarousel;
