
import { useEffect, useState } from "react";
import type { AppId, WindowState } from "../../types";

import ThisPC from "../apps/ThisPC/ThisPC";

import aiIcon from "../../assets/icons/ai.png";
import projectsIcon from "../../assets/icons/projects.png";
import resumeIcon from "../../assets/icons/resume.png";

import recycleBinIcon from "../../assets/icons/recycle-bin.png";
import thisPcIcon from "../../assets/icons/this-pc.png";

import AI from "../apps/AI/AI";
import Projects from "../apps/Projects/Projects";
import ProjectDetails from "../apps/Projects/ProjectDetails";
import Resume from "../apps/Resume/Resume";

import RecycleBin from "../apps/RecycleBin/RecycleBin";

import Window from "./Window";

interface WindowManagerProps {
  appToOpen?: AppId | null;
}

const WindowManager = ({ appToOpen }: WindowManagerProps) => {
  const [windows, setWindows] = useState<WindowState[]>([]);

  // ================================
  // OPEN NORMAL APPLICATION
  // ================================

  const openApp = (id: AppId) => {
    setWindows((current) => {
      const existing = current.find(
        (window) => window.id === id
      );

      if (existing) {
        return [
          ...current.filter(
            (window) => window.id !== id
          ),
          {
            ...existing,
            minimized: false,
          },
        ];
      }

      const newWindow: WindowState = {
        id,
        title: getTitle(id),
        icon: getIcon(id),
        x: 150 + current.length * 30,
        y: 80 + current.length * 30,
        width: 700,
        height: 500,
        minimized: false,
        maximized: false,
      };

      return [...current, newWindow];
    });
  };

  // ================================
  // OPEN PROJECT DETAIL WINDOW
  // ================================

  const openProject = (projectId: string) => {
    const windowId = `project-${projectId}` as AppId;

    setWindows((current) => {
      const existing = current.find(
        (window) => window.id === windowId
      );

      // If already open, restore and bring to front
      if (existing) {
        return [
          ...current.filter(
            (window) => window.id !== windowId
          ),
          {
            ...existing,
            minimized: false,
          },
        ];
      }

      const projectTitles: Record<string, string> = {
        lecture: "Multimodal Lecture Companion",
        "aws-faceai": "AWS FaceAI Multi-Camera",
        portfolio: "AbhishekOS Portfolio",
        "upi-offline": "UPI Offline",
      };

      const newWindow: WindowState = {
        id: windowId,
        title: projectTitles[projectId] ?? "Project",
        icon: projectsIcon,

        x: 190 + current.length * 25,
        y: 100 + current.length * 25,

        width: 700,
        height: 500,

        minimized: false,
        maximized: false,
      };

      return [...current, newWindow];
    });
  };

  // ================================
  // OPEN APP FROM PARENT
  // ================================

  useEffect(() => {
    if (appToOpen) {
      openApp(appToOpen);
    }
  }, [appToOpen]);

  // ================================
  // CLOSE WINDOW
  // ================================

  const closeWindow = (id: AppId) => {
    setWindows((current) =>
      current.filter(
        (window) => window.id !== id
      )
    );
  };

  // ================================
  // MINIMIZE WINDOW
  // ================================

  const minimizeWindow = (id: AppId) => {
    setWindows((current) =>
      current.map((window) =>
        window.id === id
          ? {
              ...window,
              minimized: true,
            }
          : window
      )
    );
  };

  // ================================
  // MAXIMIZE WINDOW
  // ================================

  const maximizeWindow = (id: AppId) => {
    setWindows((current) =>
      current.map((window) =>
        window.id === id
          ? {
              ...window,
              maximized: !window.maximized,
            }
          : window
      )
    );
  };

  // ================================
  // FOCUS WINDOW
  // ================================

  const focusWindow = (id: AppId) => {
    setWindows((current) => {
      const selected = current.find(
        (window) => window.id === id
      );

      if (!selected) return current;

      return [
        ...current.filter(
          (window) => window.id !== id
        ),
        selected,
      ];
    });
  };

  // ================================
  // RENDER APPLICATION
  // ================================

  const renderApp = (id: AppId) => {
    // Project detail window
    if (id.startsWith("project-")) {
      const projectId = id.replace(
        "project-",
        ""
      );

      return (
        <ProjectDetails
          projectId={projectId}
        />
      );
    }

    // Normal applications
    switch (id) {
      case "ai":
        return <AI />;

      case "projects":
        return (
          <Projects
            onOpenProject={openProject}
          />
        );

      case "resume":
        return <Resume />;

    

      case "recycle-bin":
        return <RecycleBin />;

      case "this-pc":
        return <ThisPC />;

      default:
        return null;
    }
  };

  // ================================
  // RENDER WINDOWS
  // ================================

  return (
    <>
      {windows.map((window, index) => (
        <Window
          key={window.id}
          window={window}
          onClose={() =>
            closeWindow(window.id)
          }
          onMinimize={() =>
            minimizeWindow(window.id)
          }
          onMaximize={() =>
            maximizeWindow(window.id)
          }
          onFocus={() =>
            focusWindow(window.id)
          }
          zIndex={200 + index}
        >
          {renderApp(window.id)}
        </Window>
      ))}
    </>
  );
};

// ================================
// WINDOW TITLES
// ================================

const getTitle = (id: AppId) => {
  switch (id) {
    case "this-pc":
      return "This PC";

    case "ai":
      return "Ask My AI";

    case "projects":
      return "Projects";

    case "resume":
      return "Resume";

    case "notepad":
      return "Notepad";

    case "recycle-bin":
      return "Recycle Bin";

    default:
      return id;
  }
};

// ================================
// WINDOW ICONS
// ================================

const getIcon = (id: AppId) => {
  switch (id) {
    case "this-pc":
      return thisPcIcon;

    case "ai":
      return aiIcon;

    case "projects":
      return projectsIcon;

    case "resume":
      return resumeIcon;

    

    case "recycle-bin":
      return recycleBinIcon;

    default:
      return "";
  }
};

export default WindowManager;
