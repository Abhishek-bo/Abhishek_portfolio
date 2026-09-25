import { useState } from "react";

interface StartButtonProps {
  onClick?: () => void;
}

const StartButton = ({ onClick }: StartButtonProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Start"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "42px",
        height: "42px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        borderRadius: "8px",
        background: hovered
          ? "rgba(255,255,255,0.12)"
          : "transparent",
        cursor: "pointer",
        transition: "background 0.2s ease, transform 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <svg
        width="23"
        height="23"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 4.5L10.5 3.3V11.4H2V4.5Z"
          fill="white"
        />
        <path
          d="M12 3.1L22 1.7V11.4H12V3.1Z"
          fill="white"
        />
        <path
          d="M2 12.6H10.5V20.7L2 19.5V12.6Z"
          fill="white"
        />
        <path
          d="M12 12.6H22V22.3L12 20.9V12.6Z"
          fill="white"
        />
      </svg>
    </button>
  );
};

export default StartButton;