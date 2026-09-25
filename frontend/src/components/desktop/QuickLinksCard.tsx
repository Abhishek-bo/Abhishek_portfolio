import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Globe, Mail, ExternalLink } from "lucide-react";

const QuickLinksCard = () => {
  const links = [
    {
      name: "GitHub",
      description: "View my projects",
      icon: FaGithub,
      url: "https://github.com/Abhishek-bo",
    },
    {
      name: "LinkedIn",
      description: "Connect with me",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/abhishekranjan0123/",
    },
    {
  name: "LeetCode",
  description: "View my coding profile",
  icon: SiLeetcode,
  url: "https://leetcode.com/u/Abiranjan47/",
},
    {
      name: "Email",
      description: "Contact",
      icon: Mail,
      url: "mailto:your-email@gmail.com",
    },
  ];

  return (
    <div
    style={{
  position: "fixed",
  top: "300px",
  right: "32px",
  width: "280px",
  padding: "20px",
  borderRadius: "20px",
  background: "rgba(15, 23, 42, 0.55)",
  border: "1px solid rgba(255,255,255,0.15)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  color: "white",
  zIndex: 5,
  boxSizing: "border-box",
}}
    >
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "16px",
        }}
      >
        Quick Links
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {links.map((link) => {
          const Icon = link.icon;
          const isExternal = !link.url.startsWith("mailto:");

          return (
            <a
              key={link.name}
              href={link.url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                borderRadius: "12px",
                color: "white",
                textDecoration: "none",
                background: "rgba(255,255,255,0.06)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.16)";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <Icon size={23} />

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>
                  {link.name}
                </div>

                <div
                  style={{
                    fontSize: "11px",
                    opacity: 0.6,
                    marginTop: "3px",
                  }}
                >
                  {link.description}
                </div>
              </div>

              {isExternal && <ExternalLink size={14} opacity={0.5} />}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinksCard;