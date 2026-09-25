import Wallpaper from "./Wallpaper";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "../taskbar/Taskbar";
import WelcomeSection from "./WelcomeSection";
import thisPcIcon from "../../assets/icons/this-pc.png";
import aiIcon from "../../assets/icons/ai.png";
import projectsIcon from "../../assets/icons/projects.png";
import resumeIcon from "../../assets/icons/resume.png";
import githubIcon from "../../assets/icons/github.png";
import recycleBinIcon from "../../assets/icons/recycle-bin.png";
import TimeWeatherCard from "./TimeWeatherCard";
import QuickLinksCard from "./QuickLinksCard";

interface DesktopProps {
  onOpenApp?: (app: string) => void;
}

const Desktop = ({ onOpenApp }: DesktopProps) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Wallpaper />
      <WelcomeSection />
      <TimeWeatherCard />
      <QuickLinksCard />

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <DesktopIcon
          label="This PC"
          icon={thisPcIcon}
          onDoubleClick={() => onOpenApp?.("this-pc")}
        />

        <DesktopIcon
          label="Ask My AI"
          icon={aiIcon}
          onDoubleClick={() => onOpenApp?.("ai")}
        />

        <DesktopIcon
          label="Projects"
          icon={projectsIcon}
          onDoubleClick={() => onOpenApp?.("projects")}
        />

        <DesktopIcon
          label="Resume"
          icon={resumeIcon}
          onDoubleClick={() => onOpenApp?.("resume")}
        />
 

        <DesktopIcon
          label="Recycle Bin"
          icon={recycleBinIcon}
          onDoubleClick={() => onOpenApp?.("recycle-bin")}
        />
        <DesktopIcon
  label="GitHub"
  icon={githubIcon}
  iconSize={50}
  onDoubleClick={() =>
    window.open(
      "https://github.com/Abhishek-bo",
      "_blank",
      "noopener,noreferrer"
    )
  }
/>
      </div>

      <Taskbar onOpenApp={onOpenApp} />
    </div>
  );
};

export default Desktop;