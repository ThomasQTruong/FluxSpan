"""gRPC client connection management for Go core engine communication."""

import logging
from collections.abc import AsyncGenerator

import grpc.aio

from app.core.config import settings

logger = logging.getLogger(__name__)


class GRPCClientManager:
    """Manages the async gRPC channel lifecycle."""

    def __init__(self) -> None:
        self.channel: grpc.aio.Channel | None = None

    async def connect(self) -> None:
        """Open the long-lived async gRPC channel to Go backend."""
        if self.channel is None:
            logger.info(
                "Opening gRPC channel to Go core engine at %s", settings.go_grpc_target
            )
            self.channel = grpc.aio.insecure_channel(settings.go_grpc_target)

    async def close(self) -> None:
        """Gracefully close the gRPC channel on server shutdown."""
        if self.channel is not None:
            logger.info("Closing gRPC channel to Go core engine...")
            await self.channel.close()
            self.channel = None


# Global manager instance
grpc_client_manager = GRPCClientManager()


async def get_grpc_channel() -> AsyncGenerator[grpc.aio.Channel, None]:
    """Dependency provider for route handlers to access the active gRPC channel."""
    if grpc_client_manager.channel is None:
        raise RuntimeError(
            "gRPC channel is not initialized. Ensure app lifespan is active."
        )
    yield grpc_client_manager.channel
