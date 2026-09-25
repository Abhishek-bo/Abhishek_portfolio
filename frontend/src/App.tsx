import { useState } from "react";
import Desktop from "./components/desktop/Desktop";
import WindowManager from "./components/windows/WindowManager";
import type { AppId } from "./types";

function App() {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);

  const handleOpenApp = (app: string) => {
  setActiveApp(null);

  setTimeout(() => {
    setActiveApp(app as AppId);
  }, 0);
};

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Desktop onOpenApp={handleOpenApp} />

      <WindowManager appToOpen={activeApp} />
    </div>
  );
}

export default App;