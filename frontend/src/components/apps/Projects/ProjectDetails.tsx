import { ExternalLink, Cpu } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectDetailsProps {
  projectId: string;
}

const projectData: Record<
  string,
  {
    name: string;
    category: string;
    description: string;
    technologies: string[];
    features: string[];
    github?: string;
  }
> = {
  lecture: {
    name: "Multimodal Lecture Companion",
    category: "AI / Education",
    description:
      "A real-time AI learning assistant that helps students understand and interact with recorded or live lecture content. The system processes lecture information, retrieves relevant context using a vector-based RAG pipeline, and uses Groq-powered inference with streaming responses to provide fast, context-aware assistance.",
    technologies: [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "Groq",
      "Qdrant",
    ],
    features: [
      "AI-assisted lecture understanding",
      "Real-time streaming responses",
      "Context-aware question answering",
      "RAG-based semantic retrieval",
      "Topic-focused information retrieval",
    ],
  },

  "aws-faceai": {
    name: "AWS FaceAI Multi-Camera",
    category: "AI / Computer Vision",
    description:
      "A cloud-assisted computer vision system designed to identify registered individuals across multiple camera streams. OpenCV handles camera and frame processing while AWS Rekognition performs face recognition, with cloud services supporting image storage and recognition-related data management.",
    technologies: [
      "Python",
      "AWS Rekognition",
      "Amazon S3",
      "DynamoDB",
      "OpenCV",
      "Flask",
    ],
    features: [
      "Multi-camera face detection",
      "Registered face recognition",
      "Real-time identity matching",
      "AWS-based image processing",
      "Recognition event management",
    ],
    github:
      "https://github.com/Abhishek-bo/AWS-Face-Recognition",
  },

  portfolio: {
    name: "AbhishekOS Portfolio",
    category: "Web / AI",
    description:
      "An interactive developer portfolio designed as a Windows-inspired desktop environment rather than a traditional webpage. It combines a glassmorphism interface with desktop applications, project exploration, resume access, system-style navigation, and an AI assistant that allows recruiters to interact with profile information conversationally.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "shadcn/ui",
    ],
    features: [
      "Windows-inspired desktop interface",
      "Interactive desktop applications",
      "Glassmorphism UI system",
      "Start Menu and Taskbar",
      "Interactive project explorer",
      "AI-powered portfolio assistant",
    ],
  },

  "upi-offline": {
    name: "UPI Offline",
    category: "FinTech / Backend",
    description:
      "An experimental payment system exploring how digital payment workflows could operate when conventional internet connectivity is unavailable. The project focuses on offline transaction concepts, device-to-device communication, payment request handling, and the challenges involved in maintaining transaction reliability without continuous network access.",
    technologies: [
      "Java",
      "Spring Boot",
      "Android",
      "UPI",
      "Offline Communication",
    ],
    features: [
      "Offline payment workflow",
      "Device-to-device communication",
      "Payment request handling",
      "Internet-independent transaction concept",
      "Offline transaction processing",
    ],
  },
};

const ProjectDetails = ({
  projectId,
}: ProjectDetailsProps) => {
  const project = projectData[projectId];

  if (!project) {
    return (
      <div className="flex h-full items-center justify-center text-white">
        Project not found.
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        padding: "28px",
        color: "white",
      }}
    >
      {/* Hero */}
      <div
        style={{
          padding: "24px",
          borderRadius: "20px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.035))",
          border: "1px solid rgba(255,255,255,0.16)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          {/* Project icon */}
          <div
            style={{
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "17px",
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(37,99,235,0.08))",
              border: "1px solid rgba(96,165,250,0.25)",
              boxShadow:
                "0 10px 30px rgba(37,99,235,0.15)",
            }}
          >
            <Cpu
              size={29}
              strokeWidth={1.7}
              color="#93c5fd"
            />
          </div>

          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#93c5fd",
              }}
            >
              {project.category}
            </div>

            <h1
              style={{
                margin: "5px 0 0",
                fontSize: "25px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              {project.name}
            </h1>
          </div>
        </div>
      </div>

      {/* About */}
      <section style={{ marginTop: "28px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          About
        </h2>

        <p
          style={{
            marginTop: "9px",
            maxWidth: "760px",
            color: "rgba(226,232,240,0.75)",
            fontSize: "14px",
            lineHeight: "1.8",
          }}
        >
          {project.description}
        </p>
      </section>

      {/* Technologies */}
      <section style={{ marginTop: "28px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          Technologies
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "9px",
            marginTop: "13px",
          }}
        >
          {project.technologies.map((technology) => (
            <span
              key={technology}
              style={{
                padding: "8px 12px",
                borderRadius: "9px",
                background: "rgba(255,255,255,0.06)",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                color: "rgba(226,232,240,0.85)",
                fontSize: "12px",
              }}
            >
              {technology}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ marginTop: "28px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          Key Features
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "10px",
            marginTop: "13px",
          }}
        >
          {project.features.map((feature) => (
            <div
              key={feature}
              style={{
                padding: "13px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.045)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                color: "rgba(226,232,240,0.8)",
                fontSize: "13px",
              }}
            >
              <span
                style={{
                  color: "#60a5fa",
                  marginRight: "8px",
                }}
              >
                ✓
              </span>

              {feature}
            </div>
          ))}
        </div>
      </section>

      {/* GitHub */}
      {project.github && (
        <div style={{ marginTop: "30px" }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "11px 16px",
              borderRadius: "10px",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
              border:
                "1px solid rgba(255,255,255,0.14)",
              color: "white",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            <FaGithub size={17} />
            View on GitHub
            <ExternalLink size={14} />
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;