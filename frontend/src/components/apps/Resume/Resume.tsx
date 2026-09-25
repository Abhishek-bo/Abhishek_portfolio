import { Download, ExternalLink } from "lucide-react";

const Resume = () => {
  const resumePath = "/my_resume.pdf";

  const openResume = () => {
    window.open(
      resumePath,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const downloadResume = () => {
    const link = document.createElement("a");

    link.href = resumePath;
    link.download = "Abhishek-Ranjan-Resume.pdf";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "rgba(15, 23, 42, 0.2)",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          height: "52px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px",
          background:
            "rgba(15, 23, 42, 0.45)",
          borderBottom:
            "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter:
            "blur(18px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#e2e8f0",
            }}
          >
            Abhishek Ranjan — Resume
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <button
            type="button"
            onClick={openResume}
            title="Open in new tab"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "7px 10px",
              borderRadius: "8px",
              border:
                "1px solid rgba(255,255,255,0.14)",
              background:
                "rgba(255,255,255,0.07)",
              color: "#e2e8f0",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            <ExternalLink size={14} />
            Open
          </button>

          <button
            type="button"
            onClick={downloadResume}
            title="Download resume"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "7px 10px",
              borderRadius: "8px",
              border:
                "1px solid rgba(255,255,255,0.14)",
              background:
                "rgba(99,102,241,0.55)",
              color: "white",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            <Download size={14} />
            Download
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          background:
            "rgba(2, 6, 23, 0.65)",
          overflow: "hidden",
        }}
      >
        <iframe
          src={resumePath}
          title="Abhishek Ranjan Resume"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
            background: "#ffffff",
          }}
        />
      </div>
    </div>
  );
};

export default Resume;