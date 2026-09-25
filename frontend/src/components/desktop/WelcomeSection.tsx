const WelcomeSection = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "24%",
        left: "14%",
        zIndex: 5,
        color: "#ffffff",
        userSelect: "none",
      }}
    >
      {/* Small heading */}
      <div
        style={{
          fontSize: "16px",
          letterSpacing: "8px",
          fontWeight: 400,
          opacity: 0.85,
          marginBottom: "14px",
        }}
      >
        WELCOME TO
      </div>

      {/* Main title */}
      <h1
        style={{
          margin: 0,
          fontSize: "clamp(42px, 5vw, 82px)",
          fontWeight: 700,
          letterSpacing: "-3px",
          lineHeight: 1.1,
          whiteSpace: "nowrap",
        }}
      >
        Abhishek
        <span
          style={{
            background:
              "linear-gradient(135deg, #38bdf8, #2563eb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          OS
        </span>
      </h1>

      {/* Subtitle */}
      <div
        style={{
          marginTop: "18px",
          fontSize: "18px",
          letterSpacing: "6px",
          fontWeight: 400,
          opacity: 0.9,
        }}
      >
        SOFTWARE DEVELOPER
      </div>

      {/* Divider */}
      <div
        style={{
          width: "48px",
          height: "3px",
          marginTop: "28px",
          background: "#38bdf8",
          borderRadius: "10px",
        }}
      />

      {/* Keywords */}
      <div
        style={{
          marginTop: "24px",
          display: "flex",
          gap: "18px",
          fontSize: "13px",
          letterSpacing: "4px",
          opacity: 0.8,
        }}
      >
        <span>EXPLORE</span>
        <span>|</span>
        <span>BUILD</span>
        <span>|</span>
        <span>INNOVATE</span>
        <span>|</span>
        <span>GROW</span>
      </div>

      {/* Quote */}
      <div
        style={{
          marginTop: "48px",
          maxWidth: "280px",
          fontSize: "17px",
          lineHeight: 1.7,
          fontStyle: "italic",
          opacity: 0.8,
        }}
      >
        “Better software,
        <br />
        a brighter tomorrow.”
      </div>
    </div>
  );
};

export default WelcomeSection;