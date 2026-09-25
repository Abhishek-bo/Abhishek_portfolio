interface StartMenuProps {
  onOpenApp?: (app: string) => void;
}

import aiIcon from "../../assets/icons/ai.png";
import projectsIcon from "../../assets/icons/projects.png";
import resumeIcon from "../../assets/icons/resume.png";
import thisPcIcon from "../../assets/icons/this-pc.png";
import recycleBinIcon from "../../assets/icons/recycle-bin.png";
import githubIcon from "../../assets/icons/github.png";

const StartMenu = ({
  onOpenApp,
}: StartMenuProps) => {
  const apps = [
    {
      id: "ai",
      name: "Ask My AI",
      icon: aiIcon,
    },
    {
      id: "projects",
      name: "Projects",
      icon: projectsIcon,
    },
    {
      id: "resume",
      name: "Resume",
      icon: resumeIcon,
    },
    {
      id: "this-pc",
      name: "This PC",
      icon: thisPcIcon,
    },
    {
      id: "recycle-bin",
      name: "Recycle Bin",
      icon: recycleBinIcon,
    },
    {
      id: "github",
      name: "GitHub",
      icon: githubIcon,
    },
  ];

  const handleAppClick = (appId: string) => {
    if (appId === "github") {
      window.open(
        "https://github.com/Abhishek-bo",
        "_blank",
        "noopener,noreferrer"
      );

      return;
    }

    onOpenApp?.(appId);
  };

  return (
    <div
      className="start-menu-glass"
      style={{
        position: "absolute",
        bottom: "65px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "420px",
        padding: "24px",
        borderRadius: "16px",
        background:
  "linear-gradient(135deg, rgba(15, 76, 129, 0.97), rgba(25, 55, 105, 0.97))",
        backdropFilter: "blur(24px)",
        border:
          "1px solid rgba(255,255,255,0.15)",
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.5)",
        color: "white",
        zIndex: 500,
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 600,
          margin: "0 0 20px",
        }}
      >
        AbhishekOS
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: "12px",
        }}
      >
        {apps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() =>
              handleAppClick(app.id)
            }
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "14px 8px",
              border:
                "1px solid transparent",
              borderRadius: "10px",
              background: "transparent",
              color: "white",
              cursor: "pointer",
              transition:
                "background 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background =
                "rgba(255,255,255,0.12)";

              event.currentTarget.style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background =
                "transparent";

              event.currentTarget.style.transform =
                "translateY(0)";
            }}
          >
            <img
              src={app.icon}
              alt={app.name}
              draggable={false}
              style={{
                width: "42px",
                height: "42px",
                objectFit: "contain",
              }}
            />

            <span
              style={{
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              {app.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StartMenu;