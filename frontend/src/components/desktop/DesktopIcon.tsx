interface DesktopIconProps {
  label: string;
  icon: string;
  onDoubleClick?: () => void;
  iconSize?: number;
}

const DesktopIcon = ({
  label,
  icon,
  onDoubleClick,
  iconSize = 52,
}: DesktopIconProps) => {
  return (
    <button
      type="button"
      onDoubleClick={onDoubleClick}
      style={{
        width: "90px",
        height: "92px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        padding: "4px",
        background: "transparent",
        border: "1px solid transparent",
        borderRadius: "7px",
        cursor: "default",
        userSelect: "none",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.background =
          "rgba(255,255,255,0.12)";
        event.currentTarget.style.border =
          "1px solid rgba(255,255,255,0.15)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.background =
          "transparent";
        event.currentTarget.style.border =
          "1px solid transparent";
      }}
    >
      <div
        style={{
          width: "72px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={icon}
          alt={label}
          draggable={false}
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      <span
        style={{
          width: "100%",
          color: "#ffffff",
          fontSize: "12px",
          lineHeight: "15px",
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textShadow:
            "0 1px 4px rgba(0,0,0,0.9)",
        }}
      >
        {label}
      </span>
    </button>
  );
};

export default DesktopIcon;