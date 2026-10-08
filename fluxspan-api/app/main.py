"""FastAPI application entrypoint for FluxSpan API (BFF)."""

from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
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

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/", include_in_schema=False)
async def root() -> RedirectResponse:
    """Redirect root path to interactive OpenAPI documentation."""
    return RedirectResponse(url="/docs")


@app.get("/health", tags=["Health"])
async def health_check() -> dict[str, str]:
    """Simple health check endpoint."""
    return {"status": "ok"}
