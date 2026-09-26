import json
import os
from pathlib import Path
from typing import Iterator

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from groq import Groq
from pydantic import BaseModel, Field
from pypdf import PdfReader


# =========================================================
# CONFIGURATION
# =========================================================

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent

RESUME_PATH = BASE_DIR / "my_resume.pdf"
PROJECTS_PATH = BASE_DIR / "projects.json"

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is not set.")

client = Groq(
    api_key=GROQ_API_KEY,
    timeout=30.0,
    max_retries=2,
)

MODEL = "openai/gpt-oss-120b"


# =========================================================
# FASTAPI
# =========================================================

app = FastAPI(
    title="AbhishekOS AI Backend",
    version="1.2.0",
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://abhishek-portfolio-chi-two.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# MODELS
# =========================================================

class Experience(BaseModel):
    company: str | None = None
    role: str | None = None
    duration: str | None = None
    description: str | None = None
    skills_used: list[str] = Field(default_factory=list)


class Resume(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None
    total_experience_years: float | None = None
    skills: list[str] = Field(default_factory=list)
    experiences: list[Experience] = Field(default_factory=list)
    education: list[str] = Field(default_factory=list)
    projects: list[str] = Field(default_factory=list)
    certifications: list[str] = Field(default_factory=list)


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    question: str
    conversation: list[ChatMessage] = Field(default_factory=list)


# =========================================================
# READ RESUME PDF
# =========================================================

def read_pdf(file_path: Path) -> str:

    if not file_path.exists():
        raise FileNotFoundError(
            f"Resume not found: {file_path}"
        )

    reader = PdfReader(file_path)

    text_parts = []

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text_parts.append(page_text)

    return "\n".join(text_parts).strip()


# =========================================================
# LOAD PROJECTS
# =========================================================

def load_projects() -> dict:

    if not PROJECTS_PATH.exists():
        raise FileNotFoundError(
            f"Projects file not found: {PROJECTS_PATH}"
        )

    with open(
        PROJECTS_PATH,
        "r",
        encoding="utf-8"
    ) as file:

        return json.load(file)


# =========================================================
# LOAD RESUME
# =========================================================
#
# IMPORTANT:
# We no longer call Groq during server startup.
#
# This makes Render cold starts much faster.
#
# The resume is kept as plain text and supplied to
# the AI only when an AI request is made.
#
# =========================================================

try:

    print("Loading resume...")

    resume_text = read_pdf(
        RESUME_PATH
    )

    if not resume_text:
        raise ValueError(
            "Resume PDF contains no readable text."
        )

    print("Resume loaded successfully.")

except Exception as error:

    print(
        f"WARNING: Resume loading failed: {error}"
    )

    resume_text = ""


# =========================================================
# LOAD PROJECTS
# =========================================================

try:

    projects = load_projects()

    print("Projects loaded successfully.")

    print(
        f"Loaded {len(projects.get('projects', []))} projects."
    )

except Exception as error:

    print(
        f"WARNING: Project loading failed: {error}"
    )

    projects = {
        "projects": []
    }


# =========================================================
# SYSTEM PROMPT
# =========================================================

def build_system_prompt() -> str:

    project_data = json.dumps(
        projects,
        indent=2,
        ensure_ascii=False
    )

    return f"""
You are the AI assistant representing
Abhishek Ranjan on his personal developer portfolio.

You answer questions from:

- recruiters
- hiring managers
- interviewers
- developers
- visitors

==================================================
CANDIDATE RESUME
==================================================

{resume_text}

==================================================
PROJECT INFORMATION
==================================================

{project_data}

==================================================
IMPORTANT RULES
==================================================

1. Answer ONLY using the provided resume
   and project information.

2. NEVER invent information.

3. NEVER create technologies, projects,
   companies, achievements, education,
   certifications, experience, or skills
   that are not provided.

4. If information is unavailable, say:

"I don't have enough information to answer that."

5. Be professional, natural, and concise.

6. Answer as if you are representing
   Abhishek professionally.

7. Use conversation history to understand
   follow-up questions.

8. Resolve references such as:

   "it"
   "this project"
   "that project"
   "its technologies"
   "the first one"
   "the other project"

   using conversation history.

9. Do not confuse information between projects.

10. When discussing a project, explain:

   - purpose
   - technologies
   - features
   - GitHub link if available

11. Do not claim professional experience unless
    it exists in the provided information.

12. Do not expose internal JSON data.

13. Do not mention internal implementation
    unless the user explicitly asks.

14. If asked about multiple projects,
    summarize them clearly.

15. If asked about Abhishek's skills,
    organize them logically.

16. If the question is unrelated to Abhishek
    or his portfolio, politely explain that
    you are designed to answer questions about
    Abhishek and his portfolio.

17. Never pretend to know information that
    is not present.
"""


# =========================================================
# BUILD CHAT MESSAGES
# =========================================================

def build_chat_messages(
    question: str,
    conversation: list[ChatMessage],
) -> list[dict]:

    messages = [
        {
            "role": "system",
            "content": build_system_prompt(),
        }
    ]

    # Keep only recent messages.
    recent_conversation = conversation[-10:]

    for message in recent_conversation:

        if message.role not in {
            "user",
            "assistant"
        }:
            continue

        content = message.content.strip()

        if not content:
            continue

        # Prevent extremely large messages.
        content = content[:4000]

        messages.append(
            {
                "role": message.role,
                "content": content,
            }
        )

    messages.append(
        {
            "role": "user",
            "content": question[:4000],
        }
    )

    return messages


# =========================================================
# NORMAL AI RESPONSE
# =========================================================

def ask_candidate(
    question: str,
    conversation: list[ChatMessage],
) -> str:

    messages = build_chat_messages(
        question,
        conversation,
    )

    response = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        temperature=0.2,
        max_tokens=700,
    )

    answer = response.choices[0].message.content

    if not answer:
        return (
            "I don't have enough information "
            "to answer that."
        )

    return answer.strip()


# =========================================================
# STREAMING AI RESPONSE
# =========================================================

def stream_candidate(
    question: str,
    conversation: list[ChatMessage],
) -> Iterator[str]:

    try:

        messages = build_chat_messages(
            question,
            conversation,
        )

        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            temperature=0.2,
            max_tokens=700,
            stream=True,
        )

        for chunk in response:

            if not chunk.choices:
                continue

            delta = chunk.choices[0].delta

            if delta.content:
                yield delta.content

    except Exception as error:

        print(
            f"Streaming error: {error}"
        )

        yield (
            "\n\nSorry, I couldn't complete "
            "the response. Please try again."
        )


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():

    return {
        "message": "AbhishekOS AI Backend is running",
        "status": "online",
    }


# =========================================================
# HEALTH
# =========================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "resume_loaded": bool(resume_text),
        "projects_loaded": len(
            projects.get("projects", [])
        ),
    }


# =========================================================
# WARMUP
# =========================================================

@app.get("/warmup")
def warmup():

    return {
        "status": "ready"
    }


# =========================================================
# NORMAL CHAT
# =========================================================

@app.post("/chat")
def chat(request: ChatRequest):

    question = request.question.strip()

    if not question:

        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty.",
        )

    try:

        answer = ask_candidate(
            question,
            request.conversation,
        )

        return {
            "answer": answer
        }

    except Exception as error:

        print(
            f"Chat error: {error}"
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to generate an AI response.",
        )


# =========================================================
# STREAMING CHAT
# =========================================================

@app.post("/chat/stream")
def chat_stream(request: ChatRequest):

    question = request.question.strip()

    if not question:

        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty.",
        )

    return StreamingResponse(
        stream_candidate(
            question,
            request.conversation,
        ),
        media_type="text/plain; charset=utf-8",
        headers={
            "Cache-Control": "no-cache, no-store",
            "X-Accel-Buffering": "no",
        },
    )