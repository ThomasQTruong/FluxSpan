"""FastAPI application entrypoint for FluxSpan API (BFF)."""

from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from app.api.v1 import api_router
from app.core.config import settings
from app.grpc.client import grpc_client_manager


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncGenerator[None, None]:
    """Manage application startup and shutdown events."""
    # --- STARTUP LOGIC ---
    # Open the persistent async gRPC channel to Go core engine
    await grpc_client_manager.connect()

    yield  # Application receives requests while suspended here

    # --- SHUTDOWN LOGIC ---
    # Gracefully close gRPC channel when FastAPI stops
    await grpc_client_manager.close()


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="0.1.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

# Set up CORS middleware for React frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/", include_in_schema=False)
async def root() -> RedirectResponse:
    """Redirect root path to interactive OpenAPI documentation."""
    return RedirectResponse(url="/docs")


@app.get("/health", tags=["Health"])
async def health_check() -> dict[str, str]:
    """Simple health check endpoint."""
    return {"status": "ok"}


@app.get("/ready", tags=["Health"])
async def readiness_check() -> dict[str, str]:
    """Readiness check verifying gRPC channel connection to Go core engine."""
    if grpc_client_manager.channel is None:
        return {"status": "not ready", "grpc": "disconnected"}
    
    # Check gRPC channel connectivity state
    state = grpc_client_manager.channel.get_state(try_to_connect=False)
    # 0 = IDLE, 1 = CONNECTING, 2 = READY, 3 = TRANSIENT_FAILURE, 4 = SHUTDOWN
    state_str = {
        0: "idle",
        1: "connecting",
        2: "ready",
        3: "transient_failure",
        4: "shutdown",
    }.get(state, "unknown")

    if state in (2, 0, 1):  # READY, IDLE, or CONNECTING are considered alive
        return {"status": "ready", "grpc": state_str}
    
    return {"status": "degraded", "grpc": state_str}
