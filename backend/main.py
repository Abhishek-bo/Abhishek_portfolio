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
    raise RuntimeError(
        "GROQ_API_KEY is not set in the .env file."
    )

client = Groq(
    api_key=GROQ_API_KEY
)

MODEL = "openai/gpt-oss-120b"


# =========================================================
# FASTAPI
# =========================================================

app = FastAPI(
    title="AbhishekOS AI Backend",
    version="1.1.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# RESUME MODELS
# =========================================================

class Experience(BaseModel):
    company: str | None = None
    role: str | None = None
    duration: str | None = None
    description: str | None = None

    skills_used: list[str] = Field(
        default_factory=list
    )


class Resume(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None

    total_experience_years: float | None = None

    skills: list[str] = Field(
        default_factory=list
    )

    experiences: list[Experience] = Field(
        default_factory=list
    )

    education: list[str] = Field(
        default_factory=list
    )

    projects: list[str] = Field(
        default_factory=list
    )

    certifications: list[str] = Field(
        default_factory=list
    )


# =========================================================
# CHAT MODELS
# =========================================================

class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    question: str

    conversation: list[ChatMessage] = Field(
        default_factory=list
    )


resume_schema = Resume.model_json_schema()


# =========================================================
# READ PDF
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
# PARSE RESUME
# =========================================================

def parse_resume(resume_text: str) -> Resume:

    system_prompt = f"""
You are an expert resume parser.

Extract information from the resume based on
its meaning, not only exact section headings.

Return ONLY valid JSON matching this schema:

{json.dumps(resume_schema, indent=2)}

Important rules:

1. Do not invent information.

2. If a value is not available, return null.

3. If a list has no information, return an empty list.

4. Include internships inside experiences.

5. Extract relevant skills from the entire resume.

6. Preserve the meaning of the original resume.

7. Do not add information that is not present.
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": f"""
Parse the following resume:

{resume_text}
"""
            }
        ],
        response_format={
            "type": "json_object"
        }
    )

    raw_output = response.choices[0].message.content

    if not raw_output:
        raise ValueError(
            "Groq returned an empty resume response."
        )

    data = json.loads(raw_output)

    return Resume(**data)


# =========================================================
# LOAD RESUME
# =========================================================

def load_resume() -> Resume:

    print("Loading resume...")

    resume_text = read_pdf(
        RESUME_PATH
    )

    if not resume_text:
        raise ValueError(
            "Resume PDF contains no readable text."
        )

    print("Parsing resume with Groq...")

    resume = parse_resume(
        resume_text
    )

    print("Resume loaded successfully.")

    return resume


# =========================================================
# LOAD KNOWLEDGE
# =========================================================

try:

    resume = load_resume()

    projects = load_projects()

    print("Projects loaded successfully.")

    print(
        f"Loaded {len(projects.get('projects', []))} projects."
    )

except Exception as error:

    print(
        f"WARNING: Startup data loading failed: {error}"
    )

    resume = Resume()

    projects = {
        "projects": []
    }


# =========================================================
# SYSTEM PROMPT
# =========================================================

def build_system_prompt(
    resume: Resume,
    projects: dict
) -> str:

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
CANDIDATE INFORMATION
==================================================

{resume.model_dump_json(indent=2)}

==================================================
PROJECT INFORMATION
==================================================

{project_data}

==================================================
IMPORTANT RULES
==================================================

1. Answer ONLY using the provided candidate
   information and project information.

2. NEVER invent information.

3. NEVER create technologies, projects, companies,
   achievements, education, certifications,
   experience, or skills that are not provided.

4. If information is unavailable, say:

"I don't have enough information to answer that."

5. Be professional, natural, and concise.

6. Answer as if you are representing Abhishek
   professionally.

7. Use conversation history to understand
   follow-up questions.

8. Resolve references such as:

   "it"
   "this project"
   "that project"
   "its technologies"
   "the first one"
   "what about the other project"

   using the conversation history.

9. Do not confuse information between projects.

10. When discussing a project, you may explain:

   - purpose
   - technologies
   - features
   - GitHub link if available

11. Do not claim professional experience unless
    it exists in the candidate information.

12. Do not expose internal JSON data.

13. Do not mention that you are reading JSON,
    unless the user explicitly asks how the
    assistant obtains information.

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
    resume: Resume,
    projects: dict
) -> list[dict]:

    system_prompt = build_system_prompt(
        resume,
        projects
    )

    messages: list[dict] = [
        {
            "role": "system",
            "content": system_prompt
        }
    ]

    # Keep only the most recent conversation
    # to avoid unnecessarily large requests.
    recent_conversation = conversation[-12:]

    for message in recent_conversation:

        if message.role not in {"user", "assistant"}:
            continue

        if not message.content.strip():
            continue

        messages.append(
            {
                "role": message.role,
                "content": message.content
            }
        )

    messages.append(
        {
            "role": "user",
            "content": question
        }
    )

    return messages


# =========================================================
# NORMAL AI RESPONSE
# =========================================================

def ask_candidate(
    question: str,
    conversation: list[ChatMessage],
    resume: Resume,
    projects: dict
) -> str:

    messages = build_chat_messages(
        question,
        conversation,
        resume,
        projects
    )

    response = client.chat.completions.create(
        model=MODEL,
        messages=messages
    )

    answer = response.choices[0].message.content

    if not answer:
        return (
            "I don't have enough information "
            "to answer that."
        )

    return answer


# =========================================================
# STREAMING AI RESPONSE
# =========================================================

def stream_candidate(
    question: str,
    conversation: list[ChatMessage],
    resume: Resume,
    projects: dict
) -> Iterator[str]:

    messages = build_chat_messages(
        question,
        conversation,
        resume,
        projects
    )

    response = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        stream=True
    )

    for chunk in response:

        if not chunk.choices:
            continue

        delta = chunk.choices[0].delta

        if delta.content:
            yield delta.content


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():

    return {
        "message": "AbhishekOS AI Backend is running",
        "status": "online"
    }


# =========================================================
# HEALTH
# =========================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "resume_loaded": bool(resume.name),
        "projects_loaded": len(
            projects.get("projects", [])
        )
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
            detail="Question cannot be empty."
        )

    try:

        answer = ask_candidate(
            question,
            request.conversation,
            resume,
            projects
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
            detail="Unable to generate an AI response."
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
            detail="Question cannot be empty."
        )

    try:

        return StreamingResponse(
            stream_candidate(
                question,
                request.conversation,
                resume,
                projects
            ),
            media_type="text/plain; charset=utf-8",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            }
        )

    except Exception as error:

        print(
            f"Streaming chat error: {error}"
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to generate an AI response."
        )