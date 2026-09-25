import aiIcon from "../../assets/icons/ai.png";
import projectsIcon from "../../assets/icons/projects.png";
import resumeIcon from "../../assets/icons/resume.png";
import githubIcon from "../../assets/icons/github.png";
import leetcodeIcon from "../../assets/icons/leetcode.png";

interface TaskbarAppsProps {
  onOpenApp?: (app: string) => void;
}

const TaskbarApps = ({ onOpenApp }: TaskbarAppsProps) => {
  const apps = [
    {
      id: "ai",
      title: "Ask My AI",
      icon: aiIcon,
    },
    {
      id: "projects",
      title: "Projects",
      icon: projectsIcon,
    },
    {
      id: "resume",
      title: "Resume",
      icon: resumeIcon,
    },
    {
      id: "github",
      title: "GitHub",
      icon: githubIcon,
    },
    {
  id: "leetcode",
  title: "LeetCode",
  icon: leetcodeIcon,
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
    if (appId === "leetcode") {
    window.open(
      "https://leetcode.com/u/Abiranjan47/",
      "_blank",
      "noopener,noreferrer"
    );
    return;
  }

    onOpenApp?.(appId);
  };

  return (
    <div
      style={{
        position: "relative",
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {apps.map((app) => (
        <button
          key={app.id}
          type="button"
          className="task-app"
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
          onClick={(event) => {
            event.stopPropagation();
            handleAppClick(app.id);
          }}
          title={app.title}
          aria-label={app.title}
          style={{
            width: "42px",
            height: "42px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid transparent",
            borderRadius: "9px",
            background: "transparent",
            cursor: "pointer",
            padding: "5px",
            transition:
              "background 0.2s ease, transform 0.2s ease",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.background =
              "rgba(255,255,255,0.14)";

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
            alt={app.title}
            style={{
              width: "32px",
              height: "32px",
              objectFit: "contain",
            }}
          />
        </button>
      ))}
    </div>
  );
};

export default TaskbarApps;