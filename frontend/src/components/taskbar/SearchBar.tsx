import { useEffect, useRef, useState } from "react";

import aiIcon from "../../assets/icons/ai.png";
import projectsIcon from "../../assets/icons/projects.png";
import recycleBinIcon from "../../assets/icons/recycle-bin.png";
import resumeIcon from "../../assets/icons/resume.png";
import thisPcIcon from "../../assets/icons/this-pc.png";
import githubIcon from "../../assets/icons/github.png";
import leetcodeIcon from "../../assets/icons/leetcode.png";

interface SearchBarProps {
  onOpenApp?: (app: string) => void;
  resetKey?: number;
}

const SearchBar = ({
  onOpenApp,
  resetKey,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const searchRef =
    useRef<HTMLDivElement>(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const apps = [
    {
      id: "this-pc",
      name: "This PC",
      icon: thisPcIcon,
    },
    {
      id: "ai",
      name: "Ask My AI",
      icon: aiIcon,
    },
    {
      id: "projects",
      name: "Projects",
      icon: projectsIcon,
    },
    {
      id: "resume",
      name: "Resume",
      icon: resumeIcon,
    },
    {
      id: "recycle-bin",
      name: "Recycle Bin",
      icon: recycleBinIcon,
    },
    {
      id: "github",
      name: "GitHub",
      icon: githubIcon,
    },
    {
  id: "leetcode",
  name: "LeetCode",
  icon: leetcodeIcon,
},
  ];

  const filteredApps = apps.filter((app) =>
    `${app.name} ${app.id}`
      .toLowerCase()
      .includes(query.toLowerCase().trim())
  );

  useEffect(() => {
    setQuery("");
    setIsFocused(false);
  }, [resetKey]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent
    ) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(
          event.target as Node
        )
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // Close search with Escape
  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const openApp = (appId: string) => {
    if (appId === "github") {
      window.open(
        "https://github.com/Abhishek-bo",
        "_blank",
        "noopener,noreferrer"
      );
    }
    else if (appId === "leetcode") {
    window.open(
      "https://leetcode.com/u/Abiranjan47/",
      "_blank",
      "noopener,noreferrer"
    );
  } else {
      onOpenApp?.(appId);
    }

    setQuery("");
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (filteredApps.length > 0) {
      openApp(filteredApps[0].id);
    }
  };

  return (
    <div
      ref={searchRef}
      style={{
        position: "relative",
        width: "220px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          onFocus={() =>
            setIsFocused(true)
          }
          placeholder="Search"
          aria-label="Search applications"
          style={{
            width: "100%",
            height: "36px",
            padding: "0 34px 0 12px",
            borderRadius: "9px",
            border:
              "1px solid rgba(255,255,255,0.15)",
            background:
              "rgba(255,255,255,0.1)",
            color: "#ffffff",
            outline: "none",
            fontSize: "13px",
            backdropFilter: "blur(12px)",
          }}
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            style={{
              position: "absolute",
              right: "8px",
              border: "none",
              background: "transparent",
              color:
                "rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ×
          </button>
        )}
      </form>

      {isFocused &&
        query.trim() && (
          <div
            style={{
              position: "absolute",
              bottom: "45px",
              left: 0,
              width: "260px",
              maxHeight: "280px",
              overflowY: "auto",
              padding: "8px",
              borderRadius: "12px",
              background:
                "rgba(20, 30, 45, 0.97)",
              border:
                "1px solid rgba(255,255,255,0.15)",
              boxShadow:
                "0 12px 35px rgba(0,0,0,0.4)",
              backdropFilter: "blur(20px)",
              animation:
                "searchDropdownIn 0.18s ease-out",
              zIndex: 2000,
            }}
          >
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onMouseDown={(event) =>
                    event.preventDefault()
                  }
                  onClick={() =>
                    openApp(app.id)
                  }
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "9px",
                    border: "none",
                    borderRadius: "8px",
                    background: "transparent",
                    color: "#ffffff",
                    cursor: "pointer",
                    textAlign: "left",
                    transition:
                      "background 0.15s ease",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background =
                      "rgba(255,255,255,0.13)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background =
                      "transparent";
                  }}
                >
                  <img
                    src={app.icon}
                    alt={app.name}
                    style={{
                      width: "34px",
                      height: "34px",
                      objectFit: "contain",
                    }}
                  />

                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {app.name}
                  </span>
                </button>
              ))
            ) : (
              <div
                style={{
                  padding:
                    "14px 10px",
                  color:
                    "rgba(255,255,255,0.6)",
                  fontSize: "13px",
                  textAlign: "center",
                }}
              >
                No application found
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default SearchBar;