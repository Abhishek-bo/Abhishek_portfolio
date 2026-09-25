interface Project {
  id: string;
  name: string;
}

const projects: Project[] = [
  {
    id: "lecture",
    name: "Multimodal Lecture Companion",
  },
  {
    id: "aws-faceai",
    name: "AWS FaceAI Multi-Camera",
  },
  {
    id: "portfolio",
    name: "AbhishekOS Portfolio",
  },
  {
    id: "upi-offline",
    name: "UPI Offline",
  },
];

interface ProjectsProps {
  onOpenProject?: (projectId: string) => void;
}

const Projects = ({ onOpenProject }: ProjectsProps) => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        padding: "32px",
        color: "white",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(180px, 180px))",
          gap: "40px 55px",
          alignItems: "start",
        }}
      >
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onOpenProject?.(project.id)}
            style={{
              width: "180px",
              minHeight: "140px",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",

              padding: "16px",

              border: "1px solid transparent",
              borderRadius: "12px",

              background: "transparent",
              color: "white",

              cursor: "pointer",

              transition:
                "background 0.2s ease, transform 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background =
                "rgba(255,255,255,0.08)";

              event.currentTarget.style.borderColor =
                "rgba(255,255,255,0.12)";

              event.currentTarget.style.transform =
                "translateY(-3px)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background =
                "transparent";

              event.currentTarget.style.borderColor =
                "transparent";

              event.currentTarget.style.transform =
                "translateY(0)";
            }}
          >
            {/* Folder */}
            <div
              style={{
                position: "relative",
                width: "82px",
                height: "68px",
                marginBottom: "12px",
              }}
            >
              {/* Folder tab */}
              <div
                style={{
                  position: "absolute",
                  left: "6px",
                  top: "0",
                  width: "34px",
                  height: "13px",
                  borderRadius: "5px 5px 0 0",
                  background:
                    "linear-gradient(180deg, #f9d65c, #eab83f)",
                }}
              />

              {/* Folder body */}
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  top: "8px",
                  width: "82px",
                  height: "60px",
                  borderRadius: "4px 7px 7px 7px",

                  background:
                    "linear-gradient(180deg, #ffe58a 0%, #f6c94f 50%, #dda82f 100%)",

                  boxShadow:
                    "0 8px 18px rgba(0,0,0,0.35), inset 0 1px 2px rgba(255,255,255,0.55)",
                }}
              >
                {/* Folder highlight */}
                <div
                  style={{
                    position: "absolute",
                    left: "8px",
                    right: "8px",
                    top: "7px",
                    height: "2px",
                    borderRadius: "10px",
                    background:
                      "rgba(255,255,255,0.45)",
                  }}
                />
              </div>
            </div>

            {/* Project name */}
            <span
              style={{
                width: "160px",

                fontSize: "13px",
                lineHeight: "18px",
                fontWeight: 500,

                textAlign: "center",

                color: "rgba(255,255,255,0.95)",

                wordBreak: "normal",
                overflowWrap: "break-word",
              }}
            >
              {project.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Projects;