
import { useState } from "react";
import {
  Ghost,
  ArrowLeft,
  CalendarDays,
  Code2,
  Cpu,
  Network,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  Layers3,
  Shield,
  Zap,
  CircleDot,
} from "lucide-react";

interface GhostProject {
  id: number;
  name: string;
  type: string;
  status: string;
  year: string;

  overview: string;
  problem: string;
  originalIdea: string;
  technicalApproach: string;
  challenges: string[];
  whyPaused: string;
  explored: string[];
  survived: string[];
  lessons: string[];
  future: string;
  technologies: string[];
}

const ghostProjects: GhostProject[] = [
  {
    id: 1,
    name: "Offline Data Transfer",
    type: "Experimental Prototype",
    status: "Abandoned",
    year: "2026",

    overview:
      "The idea was to build a communication application that could transfer data directly between nearby devices without depending on traditional Bluetooth, Wi-Fi networks, or an Internet connection. The goal was to explore whether a useful file-transfer experience could be created by building the communication layer around alternative device-to-device techniques.",

    problem:
      "Most modern file-sharing applications depend on an existing communication channel. Bluetooth has limited throughput and range, Wi-Fi usually requires a network or hotspot, and Internet-based transfer introduces servers, bandwidth costs, latency, and connectivity requirements. The project started from a simple question: can two devices exchange useful amounts of data when those conventional options are unavailable?",

    originalIdea:
      "The original concept was a simple application where one device acts as a sender and another acts as a receiver. A user would select a file, discover another nearby device, establish a communication session, split the file into smaller packets, transfer those packets, verify the received data, and reconstruct the original file on the destination device.",

    technicalApproach:
      "The design required several layers: device discovery, connection establishment, data encoding, packet segmentation, transmission, integrity verification, retransmission of failed packets, and final file reconstruction. The architecture also needed to account for different operating systems, hardware capabilities, permissions, connection interruptions, and the possibility that devices could disappear during a transfer.",

    challenges: [
      "Finding a reliable communication method that works without depending on Wi-Fi or Bluetooth.",
      "Discovering nearby devices without a centralized server.",
      "Maintaining a connection when devices move or the communication channel becomes unstable.",
      "Splitting large files into manageable packets and reconstructing them correctly.",
      "Detecting corrupted or missing packets and requesting retransmission.",
      "Supporting different device hardware and operating-system restrictions.",
      "Maintaining acceptable transfer speed while keeping the protocol reliable.",
      "Handling authentication and preventing unauthorized devices from receiving data.",
    ],

    whyPaused:
      "The project was paused because the hardest part was not building the user interface or file-selection workflow. The difficult problem was creating a communication layer that was reliable across different devices while satisfying the requirement of avoiding the normal connectivity options. Solving that properly would require considerably more low-level networking and platform-specific work than the original prototype scope allowed.",

    explored: [
      "Direct device-to-device communication concepts.",
      "Peer discovery without a central application server.",
      "Packet-based file transfer architecture.",
      "File chunking and reconstruction.",
      "Transfer progress and reliability mechanisms.",
      "Integrity checking for transferred data.",
      "Connection failure and recovery scenarios.",
      "Security considerations for direct communication.",
    ],

    survived: [
      "Peer-to-peer communication architecture ideas.",
      "Packet-based transfer design.",
      "File chunking and reconstruction concepts.",
      "Understanding of reliability problems in unstable connections.",
      "Experience thinking about networking below the application UI.",
    ],

    lessons: [
      "The hardest part of a product is not always the visible interface.",
      "A strong technical idea needs a practical communication layer underneath it.",
      "Cross-platform networking can introduce problems that are invisible during the initial design.",
      "Reducing dependencies can significantly increase engineering complexity.",
      "Before building the complete application, the core technical assumption should be proven with a small prototype.",
    ],

    future:
      "The idea could be revisited by narrowing the problem to a specific platform and communication technology instead of trying to support every device from the beginning. A future version could first solve reliable local transfer between two controlled devices and then gradually expand compatibility.",

    technologies: [
      "Networking",
      "Peer-to-Peer",
      "Packet Transfer",
      "File Systems",
      "Data Integrity",
      "Device Discovery",
    ],
  },

  {
    id: 2,
    name: "Compute Marketplace",
    type: "Experimental Platform",
    status: "Paused",
    year: "2026",

    overview:
      "The Compute Marketplace was a concept for allowing people with unused computing resources to share that capacity with users who need additional CPU, GPU, RAM, or other compute resources. The idea combined distributed computing with a marketplace model where resource providers could make idle hardware available while workload owners could submit jobs.",

    problem:
      "High-performance computing can be expensive. AI experiments, model inference, rendering, simulations, data processing, and other workloads can require hardware that many developers cannot continuously afford. At the same time, many personal computers remain idle for large portions of the day. The concept attempted to connect those two sides: unused computing resources and people who need temporary compute capacity.",

    originalIdea:
      "A person with a powerful computer could register their available resources and decide how much CPU, GPU, RAM, storage, or execution time they wanted to make available. Another user could submit a workload, select the required resources, receive an estimated cost, and run the workload on an available provider machine.",

    technicalApproach:
      "The platform would require a central control layer for discovering providers, scheduling workloads, tracking resource availability, authenticating machines, and reporting job status. Worker agents would run on provider machines and receive approved workloads. The system would need resource limits, monitoring, job queues, failure recovery, logging, and mechanisms to isolate workloads from the host computer.",

    challenges: [
      "Running untrusted workloads on another person's computer creates major security risks.",
      "A workload must not be allowed to access the provider's personal files or credentials.",
      "CPU and GPU resources need strict limits so one workload cannot consume the entire machine.",
      "Provider machines can disconnect, shut down, or become unavailable at any time.",
      "Workloads need checkpointing or recovery when a worker disappears.",
      "Different hardware configurations make workload scheduling difficult.",
      "GPU compatibility and driver differences can prevent workloads from running consistently.",
      "The marketplace would need authentication, reputation, monitoring, and abuse prevention.",
      "A pricing system would need to account for compute capacity, duration, hardware type, and availability.",
      "The system would need strong isolation before allowing arbitrary code to execute on third-party machines.",
    ],

    whyPaused:
      "The concept was paused after identifying that the marketplace itself was only one part of the problem. The deeper challenge was secure distributed execution. Allowing someone else's workload to run on a personal computer requires strong isolation, resource controls, authentication, monitoring, and recovery mechanisms. Without those foundations, a working marketplace interface would not be enough to make the system trustworthy.",

    explored: [
      "Distributed compute marketplace architecture.",
      "Provider and consumer roles.",
      "Worker-agent architecture.",
      "Job queues and workload scheduling.",
      "Resource discovery and availability tracking.",
      "CPU and GPU resource allocation.",
      "Workload monitoring.",
      "Failure recovery and disconnected workers.",
      "Security and workload isolation.",
      "Potential usage-based pricing models.",
    ],

    survived: [
      "Understanding of distributed compute architecture.",
      "Provider/consumer system design.",
      "Workload scheduling concepts.",
      "Resource allocation ideas.",
      "Understanding of distributed-system failure scenarios.",
      "Security considerations for remote execution.",
    ],

    lessons: [
      "A distributed system is only as reliable as its weakest component.",
      "Security has to be designed before arbitrary workloads are executed remotely.",
      "A marketplace can be easy to visualize but extremely difficult to operate safely.",
      "Hardware heterogeneity makes distributed computing much harder than simple task distribution.",
      "Good engineering sometimes means stopping a project when the core infrastructure needs a larger investment than the current scope allows.",
    ],

    future:
      "The concept could be revisited by restricting workloads to trusted containers or predefined workloads first. A smaller controlled environment would make it possible to validate scheduling, resource allocation, monitoring, and billing before attempting a fully open compute marketplace.",

    technologies: [
      "Distributed Systems",
      "Cloud Computing",
      "CPU/GPU Scheduling",
      "Workload Isolation",
      "Job Queues",
      "Resource Management",
    ],
  },
];

const sectionStyle: React.CSSProperties = {
  marginBottom: "18px",
  padding: "20px",
  borderRadius: "15px",
  border: "1px solid rgba(255,255,255,0.10)",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025))",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.05)",
};

const sectionTitleStyle: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: "15px",
  fontWeight: 650,
  color: "rgba(255,255,255,0.88)",
};

const paragraphStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "13px",
  lineHeight: 1.75,
  color: "rgba(255,255,255,0.62)",
};

const RecycleBin = () => {
  const [selectedProject, setSelectedProject] =
    useState<GhostProject | null>(null);

  if (selectedProject) {
    return (
      <div
        style={{
          minHeight: "100%",
          padding: "28px",
          color: "#fff",
          background:
            "radial-gradient(circle at 75% 10%, rgba(96,165,250,0.12), transparent 32%), rgba(5,12,22,0.18)",
        }}
      >
        {/* Back */}
        <button
          type="button"
          onClick={() => setSelectedProject(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "26px",
            padding: "8px 13px",
            borderRadius: "9px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={16} />
          Back to Ghost Projects
        </button>

        {/* Project Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              flexShrink: 0,
              borderRadius: "17px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(145deg, rgba(148,163,184,0.18), rgba(59,130,246,0.08))",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow:
                "0 15px 40px rgba(0,0,0,0.3)",
            }}
          >
            <Ghost size={33} />
          </div>

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "26px",
                fontWeight: 650,
                letterSpacing: "-0.5px",
              }}
            >
              {selectedProject.name}
            </h1>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "9px",
                marginTop: "7px",
                color: "rgba(255,255,255,0.52)",
                fontSize: "12px",
              }}
            >
              <span>{selectedProject.type}</span>
              <span>•</span>
              <span>{selectedProject.status}</span>
              <span>•</span>
              <span>{selectedProject.year}</span>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              marginBottom: "10px",
            }}
          >
            <Layers3 size={17} />
            <h2 style={sectionTitleStyle}>
              Project Overview
            </h2>
          </div>

          <p style={paragraphStyle}>
            {selectedProject.overview}
          </p>
        </div>

        {/* Problem */}
        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              marginBottom: "10px",
            }}
          >
            <AlertTriangle size={17} />
            <h2 style={sectionTitleStyle}>
              The Problem
            </h2>
          </div>

          <p style={paragraphStyle}>
            {selectedProject.problem}
          </p>
        </div>

        {/* Original Idea */}
        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              marginBottom: "10px",
            }}
          >
            <Lightbulb size={17} />
            <h2 style={sectionTitleStyle}>
              Original Idea
            </h2>
          </div>

          <p style={paragraphStyle}>
            {selectedProject.originalIdea}
          </p>
        </div>

        {/* Technical Approach */}
        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              marginBottom: "10px",
            }}
          >
            <Cpu size={17} />
            <h2 style={sectionTitleStyle}>
              Technical Approach
            </h2>
          </div>

          <p style={paragraphStyle}>
            {selectedProject.technicalApproach}
          </p>
        </div>

        {/* Technologies */}
        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              marginBottom: "14px",
            }}
          >
            <Code2 size={17} />
            <h2 style={sectionTitleStyle}>
              Technical Areas
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {selectedProject.technologies.map(
              (technology) => (
                <span
                  key={technology}
                  style={{
                    padding: "7px 10px",
                    borderRadius: "8px",
                    background:
                      "rgba(96,165,250,0.08)",
                    border:
                      "1px solid rgba(96,165,250,0.16)",
                    color:
                      "rgba(191,219,254,0.82)",
                    fontSize: "12px",
                  }}
                >
                  {technology}
                </span>
              )
            )}
          </div>
        </div>

        {/* Challenges */}
        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              marginBottom: "14px",
            }}
          >
            <Network size={17} />
            <h2 style={sectionTitleStyle}>
              Main Technical Challenges
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "11px",
            }}
          >
            {selectedProject.challenges.map(
              (challenge) => (
                <div
                  key={challenge}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    color:
                      "rgba(255,255,255,0.62)",
                    fontSize: "13px",
                    lineHeight: 1.55,
                  }}
                >
                  <CircleDot
                    size={13}
                    style={{
                      marginTop: "3px",
                      flexShrink: 0,
                    }}
                  />
                  <span>{challenge}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Why Paused */}
        <div
          style={{
            ...sectionStyle,
            borderColor:
              "rgba(251,191,36,0.18)",
            background:
              "linear-gradient(135deg, rgba(251,191,36,0.07), rgba(255,255,255,0.025))",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              marginBottom: "10px",
            }}
          >
            <h2 style={sectionTitleStyle}>
              Why This Project Was{" "}
              {selectedProject.status ===
              "Abandoned"
                ? "Abandoned"
                : "Paused"}
            </h2>
          </div>

          <p style={paragraphStyle}>
            {selectedProject.whyPaused}
          </p>
        </div>

        {/* Explored */}
        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              marginBottom: "14px",
            }}
          >
            <Zap size={17} />
            <h2 style={sectionTitleStyle}>
              What I Explored
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "9px",
            }}
          >
            {selectedProject.explored.map(
              (item) => (
                <div
                  key={item}
                  style={{
                    padding: "11px 12px",
                    borderRadius: "9px",
                    background:
                      "rgba(255,255,255,0.04)",
                    border:
                      "1px solid rgba(255,255,255,0.07)",
                    color:
                      "rgba(255,255,255,0.58)",
                    fontSize: "12px",
                    lineHeight: 1.45,
                  }}
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        {/* What Survived */}
        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              marginBottom: "14px",
            }}
          >
            <Shield size={17} />
            <h2 style={sectionTitleStyle}>
              What Survived
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "9px",
            }}
          >
            {selectedProject.survived.map(
              (item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color:
                      "rgba(255,255,255,0.65)",
                    fontSize: "13px",
                  }}
                >
                  <CircleDot size={13} />
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        {/* Lessons */}
        <div
          style={{
            ...sectionStyle,
            borderColor:
              "rgba(96,165,250,0.20)",
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.10), rgba(255,255,255,0.025))",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              marginBottom: "14px",
            }}
          >
            <BookOpen size={17} />
            <h2 style={sectionTitleStyle}>
              What I Learned
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "11px",
            }}
          >
            {selectedProject.lessons.map(
              (lesson) => (
                <div
                  key={lesson}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    color:
                      "rgba(255,255,255,0.68)",
                    fontSize: "13px",
                    lineHeight: 1.6,
                  }}
                >
                  <CircleDot
                    size={13}
                    style={{
                      marginTop: "4px",
                      flexShrink: 0,
                    }}
                  />
                  {lesson}
                </div>
              )
            )}
          </div>
        </div>

        {/* Future */}
        <div style={sectionStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              marginBottom: "10px",
            }}
          >
            <CalendarDays size={17} />
            <h2 style={sectionTitleStyle}>
              Possible Future
            </h2>
          </div>

          <p style={paragraphStyle}>
            {selectedProject.future}
          </p>
        </div>

        {/* Bottom */}
        <div
          style={{
            marginTop: "26px",
            padding: "18px",
            textAlign: "center",
            borderTop:
              "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.38)",
            fontSize: "12px",
            fontStyle: "italic",
          }}
        >
          “A project can disappear without the
          lessons disappearing with it.”
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100%",
        padding: "28px",
        color: "#fff",
        background:
          "radial-gradient(circle at 75% 10%, rgba(96,165,250,0.12), transparent 35%), rgba(5,12,22,0.18)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
              background:
                "linear-gradient(145deg, rgba(148,163,184,0.18), rgba(59,130,246,0.08))",
              border:
                "1px solid rgba(255,255,255,0.14)",
              boxShadow:
                "0 14px 38px rgba(0,0,0,0.28)",
            }}
          >
            <Ghost size={30} />
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
              Ghost Projects
            </h1>

            <p
              style={{
                margin: "5px 0 0",
                fontSize: "13px",
                color:
                  "rgba(255,255,255,0.52)",
              }}
            >
              Projects that almost existed.
            </p>
          </div>
        </div>

        <div
          style={{
            padding: "7px 12px",
            borderRadius: "999px",
            background:
              "rgba(255,255,255,0.07)",
            border:
              "1px solid rgba(255,255,255,0.10)",
            color:
              "rgba(255,255,255,0.58)",
            fontSize: "12px",
          }}
        >
          {ghostProjects.length} ghosts
        </div>
      </div>

      {/* Intro */}
      <div
        style={{
          marginBottom: "22px",
          padding: "17px 18px",
          borderRadius: "14px",
          border:
            "1px solid rgba(255,255,255,0.08)",
          background:
            "rgba(255,255,255,0.035)",
          color:
            "rgba(255,255,255,0.54)",
          fontSize: "13px",
          lineHeight: 1.7,
        }}
      >
        Not every idea becomes a shipped product.
        These are experiments and concepts that
        were explored, questioned, and eventually
        moved into the archive. They represent
        technical curiosity, unfinished directions,
        and lessons that continue to influence
        future projects.
      </div>

      {/* Ghost Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {ghostProjects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() =>
              setSelectedProject(project)
            }
            style={{
              textAlign: "left",
              padding: "20px",
              borderRadius: "16px",
              border:
                "1px solid rgba(255,255,255,0.11)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025))",
              color: "#fff",
              cursor: "pointer",
              transition:
                "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform =
                "translateY(-4px)";
              event.currentTarget.style.borderColor =
                "rgba(147,197,253,0.35)";
              event.currentTarget.style.boxShadow =
                "0 18px 45px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform =
                "translateY(0)";
              event.currentTarget.style.borderColor =
                "rgba(255,255,255,0.11)";
              event.currentTarget.style.boxShadow =
                "none";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  background:
                    "rgba(255,255,255,0.06)",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Ghost size={23} />
              </div>

              <span
                style={{
                  padding: "5px 8px",
                  borderRadius: "7px",
                  background:
                    "rgba(255,255,255,0.05)",
                  color:
                    "rgba(255,255,255,0.42)",
                  fontSize: "10px",
                }}
              >
                {project.status}
              </span>
            </div>

            <h2
              style={{
                margin: "18px 0 7px",
                fontSize: "17px",
                fontWeight: 600,
              }}
            >
              {project.name}
            </h2>

            <p
              style={{
                margin: "0 0 12px",
                color:
                  "rgba(255,255,255,0.48)",
                fontSize: "12px",
              }}
            >
              {project.type} • {project.year}
            </p>

            <p
              style={{
                margin: 0,
                color:
                  "rgba(255,255,255,0.58)",
                fontSize: "12px",
                lineHeight: 1.65,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.overview}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "18px",
                color:
                  "rgba(147,197,253,0.78)",
                fontSize: "12px",
              }}
            >
              <Ghost size={14} />
              Explore project
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "30px",
          padding: "18px",
          textAlign: "center",
          borderTop:
            "1px solid rgba(255,255,255,0.08)",
          color:
            "rgba(255,255,255,0.38)",
          fontSize: "12px",
          fontStyle: "italic",
        }}
      >
        “Not every project needs to ship.”
      </div>
    </div>
  );
};

export default RecycleBin;
