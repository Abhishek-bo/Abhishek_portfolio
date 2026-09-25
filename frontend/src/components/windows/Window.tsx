import type { ReactNode } from "react";
import type { WindowState } from "../../types";
import WindowHeader from "./WindowHeader";

interface WindowProps {
  window: WindowState;
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  zIndex: number;
}

const Window = ({
  window,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  zIndex,
}: WindowProps) => {
  if (window.minimized) {
    return null;
  }

  return (
    <div
      className="portfolio-window"
      onMouseDown={onFocus}
      style={{
        position: "absolute",
        left: window.maximized ? 0 : window.x,
        top: window.maximized ? 0 : window.y,
        width: window.maximized ? "100%" : window.width,
        height: window.maximized
          ? "calc(100% - 56px)"
          : window.height,
        zIndex,

        // Glass background
        background: "rgba(30, 41, 59, 0.38)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",

        color: "#ffffff",

        border: "1px solid rgba(255, 255, 255, 0.25)",
        borderRadius: window.maximized ? 0 : 12,

        overflow: "hidden",

        boxShadow:
          "0 20px 60px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <WindowHeader
        id={window.id}
        title={window.title}
        icon={window.icon}
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
      />

      <div
        style={{
          width: "100%",
          height: "calc(100% - 42px)",
          overflow: "auto",

          // Transparent content
          background: "rgba(255, 255, 255, 0.04)",
          color: "#ffffff",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Window;