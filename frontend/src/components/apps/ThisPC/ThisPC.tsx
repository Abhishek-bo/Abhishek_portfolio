
import {
  Monitor,
  User,
  Code2,
  FolderOpen,
  Cpu,
  Cloud,
  Database,
  FileText,
  ExternalLink,
  HardDrive,
  Sparkles,
  Layers3,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

const ThisPC = () => {
  const openGitHub = () => {
    window.open(
      "https://github.com/Abhishek-bo",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openResume = () => {
    window.open(
      "/my_resume.pdf",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div
      style={{
        minHeight: "100%",
        padding: "26px",
        color: "#fff",
        background:
          "radial-gradient(circle at 75% 10%, rgba(59,130,246,0.12), transparent 35%), rgba(5,12,22,0.18)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            width: "54px",
            height: "54px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "15px",
            background:
              "linear-gradient(145deg, rgba(96,165,250,0.18), rgba(255,255,255,0.05))",
            border:
              "1px solid rgba(255,255,255,0.14)",
            boxShadow:
              "0 12px 35px rgba(0,0,0,0.25)",
          }}
        >
          <Monitor size={29} />
        </div>

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "25px",
              fontWeight: 650,
              letterSpacing: "-0.4px",
            }}
          >
            This PC
          </h1>

          <p
            style={{
              margin: "5px 0 0",
              fontSize: "13px",
              color:
                "rgba(255,255,255,0.52)",
            }}
          >
            AbhishekOS Developer Workstation
          </p>
        </div>
      </div>

      {/* System Overview */}
      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <Monitor size={17} />
          <h2 style={sectionTitleStyle}>
            System Overview
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "12px",
          }}
        >
          <InfoCard
            icon={<User size={18} />}
            title="Developer"
            value="Abhishek Ranjan"
            description="Software Developer"
          />

          <InfoCard
            icon={<Code2 size={18} />}
            title="Primary Focus"
            value="Software Engineering"
            description="AI • Backend • Full Stack"
          />

          <InfoCard
            icon={<Cpu size={18} />}
            title="Environment"
            value="AbhishekOS"
            description="Windows-inspired portfolio"
          />

          <InfoCard
            icon={<Sparkles size={18} />}
            title="Current Mode"
            value="Building"
            description="Explore • Build • Innovate"
          />
        </div>
      </section>

      {/* About */}
      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <User size={17} />
          <h2 style={sectionTitleStyle}>
            About This Workstation
          </h2>
        </div>

        <p style={paragraphStyle}>
          AbhishekOS is a virtual developer
          workstation designed as an interactive
          portfolio. Instead of presenting
          information as a traditional collection of
          web pages, the portfolio behaves like a
          desktop operating system where projects,
          resume, AI assistant, and developer
          information are organized into applications.
        </p>

        <p
          style={{
            ...paragraphStyle,
            marginTop: "12px",
          }}
        >
          The interface combines a Windows-inspired
          desktop experience with modern web
          technologies, glassmorphism, animations,
          interactive windows, and an AI assistant.
          The goal is to make exploring a developer's
          work feel more like using a product than
          reading a conventional portfolio.
        </p>
      </section>

      {/* Portfolio Files */}
      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <FolderOpen size={17} />
          <h2 style={sectionTitleStyle}>
            Portfolio Files
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
          }}
        >
          <PortfolioFolder
            icon={<FolderOpen size={21} />}
            name="Projects"
            description="AI, cloud, full-stack and system projects"
          />

          <PortfolioFolder
            icon={<FileText size={21} />}
            name="Resume"
            description="Education, skills, certifications and experience"
            onClick={openResume}
          />

          <PortfolioFolder
            icon={<Code2 size={21} />}
            name="Skills"
            description="Java, Python, React, Spring Boot and more"
          />

          <PortfolioFolder
            icon={<FaGithub size={21} />}
            name="GitHub"
            description="Source code and development projects"
            onClick={openGitHub}
          />
        </div>
      </section>

      {/* Technology Stack */}
      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <Layers3 size={17} />
          <h2 style={sectionTitleStyle}>
            Technology Stack
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {[
            "Java",
            "Python",
            "JavaScript",
            "TypeScript",
            "React",
            "HTML5",
            "CSS3",
            "Spring Boot",
            "FastAPI",
            "Flask",
            "Tailwind CSS",
            "Vite",
            "Git",
            "GitHub",
          ].map((technology) => (
            <TechnologyTag
              key={technology}
              label={technology}
            />
          ))}
        </div>
      </section>

      {/* AI & Backend */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px",
        }}
      >
        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <Sparkles size={17} />
            <h2 style={sectionTitleStyle}>
              AI & Intelligent Systems
            </h2>
          </div>

          <p style={paragraphStyle}>
            Experience with AI-powered applications,
            multimodal systems, retrieval workflows,
            AI assistants, face recognition, and
            real-time AI processing.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "15px",
            }}
          >
            {[
              "Groq",
              "Qdrant",
              "RAG",
              "AWS Rekognition",
              "OpenCV",
            ].map((item) => (
              <TechnologyTag
                key={item}
                label={item}
              />
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <Cloud size={17} />
            <h2 style={sectionTitleStyle}>
              Cloud & Backend
            </h2>
          </div>

          <p style={paragraphStyle}>
            Backend development and cloud services
            used to build APIs, AI applications,
            data-processing systems, and scalable
            application workflows.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "15px",
            }}
          >
            {[
              "AWS",
              "S3",
              "DynamoDB",
              "Lambda",
              "FastAPI",
              "Flask",
              "Spring Boot",
            ].map((item) => (
              <TechnologyTag
                key={item}
                label={item}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Data & Storage */}
      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <Database size={17} />
          <h2 style={sectionTitleStyle}>
            Data & Storage
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          <SystemItem
            icon={<Database size={19} />}
            title="MySQL"
            description="Relational database systems"
          />

          <SystemItem
            icon={<Database size={19} />}
            title="DynamoDB"
            description="Cloud-native NoSQL storage"
          />

          <SystemItem
            icon={<HardDrive size={19} />}
            title="Qdrant"
            description="Vector database for AI retrieval"
          />
        </div>
      </section>

      {/* Devices and Drives */}
      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <HardDrive size={17} />
          <h2 style={sectionTitleStyle}>
            Devices and Drives
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "12px",
          }}
        >
          <DriveCard
            name="Portfolio Drive (C:)"
            description="Projects • Skills • Resume • AI"
            progress={72}
          />

          <DriveCard
            name="Project Archive (D:)"
            description="Experiments • Ghost Projects"
            progress={46}
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section
        style={{
          ...sectionStyle,
          marginBottom: 0,
        }}
      >
        <div style={sectionHeaderStyle}>
          <ExternalLink size={17} />
          <h2 style={sectionTitleStyle}>
            Quick Access
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <ActionButton
            icon={<FaGithub size={16} />}
            label="Open GitHub"
            onClick={openGitHub}
          />

          <ActionButton
            icon={<FileText size={16} />}
            label="Open Resume"
            onClick={openResume}
          />
        </div>
      </section>

      {/* Footer */}
      <div
        style={{
          padding: "24px 0 8px",
          textAlign: "center",
          color:
            "rgba(255,255,255,0.35)",
          fontSize: "11px",
        }}
      >
        AbhishekOS • Personal Developer
        Workstation
      </div>
    </div>
  );
};

/* =========================
   REUSABLE COMPONENTS
========================= */

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

const InfoCard = ({
  icon,
  title,
  value,
  description,
}: InfoCardProps) => {
  return (
    <div
      style={{
        padding: "15px",
        borderRadius: "13px",
        border:
          "1px solid rgba(255,255,255,0.08)",
        background:
          "rgba(255,255,255,0.035)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "9px",
          color:
            "rgba(147,197,253,0.85)",
          marginBottom: "10px",
        }}
      >
        {icon}

        <span
          style={{
            fontSize: "11px",
            color:
              "rgba(255,255,255,0.45)",
          }}
        >
          {title}
        </span>
      </div>

      <div
        style={{
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        {value}
      </div>

      <div
        style={{
          marginTop: "4px",
          fontSize: "11px",
          color:
            "rgba(255,255,255,0.42)",
        }}
      >
        {description}
      </div>
    </div>
  );
};

interface PortfolioFolderProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  onClick?: () => void;
}

const PortfolioFolder = ({
  icon,
  name,
  description,
  onClick,
}: PortfolioFolderProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: "16px",
        borderRadius: "13px",
        border:
          "1px solid rgba(255,255,255,0.08)",
        background:
          "rgba(255,255,255,0.035)",
        color: "#fff",
        cursor: onClick
          ? "pointer"
          : "default",
        transition:
          "transform 0.2s ease, background 0.2s ease",
      }}
      onMouseEnter={(event) => {
        if (!onClick) return;

        event.currentTarget.style.transform =
          "translateY(-2px)";
        event.currentTarget.style.background =
          "rgba(255,255,255,0.075)";
      }}
      onMouseLeave={(event) => {
        if (!onClick) return;

        event.currentTarget.style.transform =
          "translateY(0)";
        event.currentTarget.style.background =
          "rgba(255,255,255,0.035)";
      }}
    >
      <div
        style={{
          color:
            "rgba(147,197,253,0.85)",
          marginBottom: "10px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        {name}
      </div>

      <div
        style={{
          marginTop: "5px",
          color:
            "rgba(255,255,255,0.45)",
          fontSize: "11px",
          lineHeight: 1.5,
        }}
      >
        {description}
      </div>
    </button>
  );
};

interface TechnologyTagProps {
  label: string;
}

const TechnologyTag = ({
  label,
}: TechnologyTagProps) => {
  return (
    <span
      style={{
        padding: "7px 10px",
        borderRadius: "8px",
        background:
          "rgba(96,165,250,0.07)",
        border:
          "1px solid rgba(96,165,250,0.14)",
        color:
          "rgba(191,219,254,0.78)",
        fontSize: "11px",
      }}
    >
      {label}
    </span>
  );
};

interface SystemItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SystemItem = ({
  icon,
  title,
  description,
}: SystemItemProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px",
        borderRadius: "12px",
        background:
          "rgba(255,255,255,0.035)",
        border:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          color:
            "rgba(147,197,253,0.8)",
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: "3px",
            fontSize: "10px",
            color:
              "rgba(255,255,255,0.42)",
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

interface DriveCardProps {
  name: string;
  description: string;
  progress: number;
}

const DriveCard = ({
  name,
  description,
  progress,
}: DriveCardProps) => {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "13px",
        background:
          "rgba(255,255,255,0.035)",
        border:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "11px",
        }}
      >
        <HardDrive
          size={23}
          style={{
            color:
              "rgba(147,197,253,0.8)",
          }}
        />

        <div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {name}
          </div>

          <div
            style={{
              marginTop: "3px",
              fontSize: "10px",
              color:
                "rgba(255,255,255,0.42)",
            }}
          >
            {description}
          </div>
        </div>
      </div>

      <div
        style={{
          height: "5px",
          marginTop: "15px",
          borderRadius: "999px",
          background:
            "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            borderRadius: "999px",
            background:
              "rgba(96,165,250,0.65)",
          }}
        />
      </div>

      <div
        style={{
          marginTop: "6px",
          textAlign: "right",
          fontSize: "10px",
          color:
            "rgba(255,255,255,0.38)",
        }}
      >
        {progress}% used
      </div>
    </div>
  );
};

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const ActionButton = ({
  icon,
  label,
  onClick,
}: ActionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "9px 13px",
        borderRadius: "9px",
        border:
          "1px solid rgba(255,255,255,0.10)",
        background:
          "rgba(255,255,255,0.06)",
        color: "#fff",
        cursor: "pointer",
        fontSize: "12px",
      }}
    >
      {icon}
      {label}
    </button>
  );
};

const sectionStyle: React.CSSProperties = {
  marginBottom: "17px",
  padding: "19px",
  borderRadius: "15px",
  border:
    "1px solid rgba(255,255,255,0.10)",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.065), rgba(255,255,255,0.025))",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.04)",
};

const sectionHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "9px",
  marginBottom: "15px",
  color:
    "rgba(147,197,253,0.82)",
};

const sectionTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "14px",
  fontWeight: 650,
  color: "rgba(255,255,255,0.86)",
};

const paragraphStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "13px",
  lineHeight: 1.75,
  color: "rgba(255,255,255,0.60)",
};

export default ThisPC;
