export const portfolio = {
  name: "Abhishek Ranjan",

  role: "Software Developer",

  tagline: "AI & Backend Developer",

  about:
    "I build practical software across backend systems, web applications, and AI-powered applications.",

  availability: "Open to opportunities",

  focus: [
    "AI",
    "Backend",
    "Full Stack",
  ],

  skills: [
    "Java",
    "Spring Boot",
    "React",
  ],

  projects: [
    {
      id: "ai-lecture-companion",
      name: "AI Lecture Companion",
      description:
        "An AI-focused application for making lecture content easier to search, understand, and interact with.",
      technologies: [
        "Java",
        "Spring Boot",
        "React",
        "Groq",
        "Qdrant",
      ],
    },
  ],

  resume: {
    available: true,
    file: "/resume.pdf",
  },

  contact: {
    email: "",
    github: "",
    linkedin: "",
  },
} as const;