import { useState } from "react";


import StartButton from "./StartButton";
import SearchBar from "./SearchBar";
import TaskbarApps from "./TaskbarApps";

import SystemTray from "./SystemTray";
import StartMenu from "../start-menu/StartMenu";

interface TaskbarProps {
  onOpenApp?: (app: string) => void;
}

const Taskbar = ({ onOpenApp }: TaskbarProps) => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchReset, setSearchReset] = useState(0);

  const handleOpenApp = (app: string) => {
    onOpenApp?.(app);
    setStartMenuOpen(false);
    setSearchReset((previous) => previous + 1);
  };

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "56px",
        display: "flex",
        alignItems: "center",
        padding: "7px 12px",
        background: "rgba(12, 22, 35, 0.82)",
        borderTop: "1px solid rgba(255,255,255,0.14)",
        backdropFilter: "blur(24px)",
        boxShadow: "0 -8px 30px rgba(0,0,0,0.18)",
        zIndex: 1000,
      }}
    >
      {startMenuOpen && (
        <StartMenu onOpenApp={handleOpenApp} />
      )}

      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <StartButton
          onClick={() =>
            setStartMenuOpen((previous) => !previous)
          }
        />

        <SearchBar
          onOpenApp={handleOpenApp}
          resetKey={searchReset}
        />

        <TaskbarApps onOpenApp={handleOpenApp} />
      </div>

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
        }}
        
      >
        <SystemTray />
        
      </div>
    </div>
  );
};

export default Taskbar;