# AI Rules & Project Context

## Project Overview

**FluxSpan** is a stock alert application designed to notify users when a favorited stock fluctuates within a specific time span.

### Tech Stack

- **Infrastructure:** Docker Compose
- **Database:** PostgreSQL (TimescaleDB)
- **Web API (BFF):** Python (FastAPI)
- **Frontend:** HTML, CSS, Tailwind CSS, React
- **Internal Middleware:** gRPC / ProtoBUF
- **Data Worker:** Go (integrating with the Alpaca API for market data)

---

## Core Rules

- **No Unrequested Changes:** Do only what is explicitly asked. Only edit the lines/blocks I specify. Do not add, remove, or modify logic, comments, or whitespace outside my prompt. No new libraries or patterns unless I authorize them.
- **Minimalism:** No conversational filler. Provide only code unless asking a required clarifying question.
- **Refactoring:** Maintain existing functionality. Do not optimize or "clean" code unless explicitly asked.
- **Architecture:** Prefer small modules/classes over bloated files.
- **Formatting:** Respect project-specific conventions (e.g. PEP 8 for Python, camelCase for JS/Java, etc.).
- **Interaction:** If a request is ambiguous, ask ONE clarifying question before acting.
- **Safety:** Do not delete files or do project-wide changes without my approval. For large refactors, provide a plan first and wait for approval.
