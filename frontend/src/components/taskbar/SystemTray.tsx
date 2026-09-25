import { useEffect, useState } from "react";
import {
  ChevronUp,
  Wifi,
  Volume2,
  BatteryFull,
} from "lucide-react";

const SystemTray = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const time = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = currentTime.toLocaleDateString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        color: "white",
        fontSize: "12px",
        whiteSpace: "nowrap",
      }}
    >
      <ChevronUp size={16} />
      <Wifi size={16} />
      <Volume2 size={16} />
      <BatteryFull size={18} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          lineHeight: "1.4",
          minWidth: "75px",
        }}
      >
        <span>{time}</span>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default SystemTray;