import type React from "react";

interface WindowHeaderProps {
  id: string;
  title: string;
  icon: string;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

const WindowHeader = ({
  title,
  icon,
  onMinimize,
  onMaximize,
  onClose,
}: WindowHeaderProps) => {
  return (
    <div
      style={{
        height: "42px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 8px 0 12px",
        background: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        borderBottom: "1px solid rgba(255,255,255,0.16)",
        color: "white",
        userSelect: "none",
      }}
    >
      {/* Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "9px",
          minWidth: 0,
        }}
      >
        {icon && (
          <img
            src={icon}
            alt=""
            draggable={false}
            style={{
              width: "22px",
              height: "22px",
              objectFit: "contain",
            }}
          />
        )}

        <span
          style={{
            fontSize: "13px",
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </span>
      </div>

      {/* Window Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2px",
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onMinimize}
          style={buttonStyle}
          onMouseEnter={(event) => {
            event.currentTarget.style.background =
              "rgba(255,255,255,0.14)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = "transparent";
          }}
          aria-label="Minimize window"
        >
          −
        </button>

        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onMaximize}
          style={buttonStyle}
          onMouseEnter={(event) => {
            event.currentTarget.style.background =
              "rgba(255,255,255,0.14)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = "transparent";
          }}
          aria-label="Maximize window"
        >
          □
        </button>

        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onClose}
          style={{
            ...buttonStyle,
            color: "#fecaca",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.background = "#dc2626";
            event.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = "transparent";
            event.currentTarget.style.color = "#fecaca";
          }}
          aria-label="Close window"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  width: "38px",
  height: "32px",
  border: "none",
  borderRadius: "6px",
  background: "transparent",
  color: "#e2e8f0",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "background 0.2s ease, color 0.2s ease",
};

export default WindowHeader;