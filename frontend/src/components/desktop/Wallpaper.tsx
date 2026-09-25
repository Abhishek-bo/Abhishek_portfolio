import mountainWallpaper from "../../assets/mountain-wallpaper.png";

const Wallpaper = () => {
  return (
    <div
      className="wallpaper-container"
      style={{
        position: "absolute",
        inset: 0,
       backgroundImage: `
  linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.72),
    rgba(0, 0, 0, 0.18),
    rgba(0, 0, 0, 0.45)
  ),
  url(${mountainWallpaper})

        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
      }}
    >
      <div className="ambient-glow" />
    </div>
  );
};

export default Wallpaper;