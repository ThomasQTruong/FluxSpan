"""gRPC client wrapper for AuthService communication with Go core engine."""

# pylint: disable=no-member

import logging

import grpc

from app.grpc.generated import auth_pb2, auth_pb2_grpc

logger = logging.getLogger(__name__)


class AuthgRPCClient:
    """Client wrapper for calling Go AuthService gRPC methods."""

    def __init__(self, channel: grpc.aio.Channel) -> None:
        self.stub = auth_pb2_grpc.AuthServiceStub(channel)

    async def register(self, email: str, password: str) -> auth_pb2.UserResponse:
        """Call Go backend to register a new user."""
        request = auth_pb2.RegisterRequest(email=email, password=password)
        try:
            response: auth_pb2.UserResponse = await self.stub.Register(request)
            return response
        except grpc.aio.AioRpcError as exc:
            logger.error("gRPC Register failed: %s", exc.details())
            raise

    async def login(self, email: str, password: str) -> auth_pb2.TokenResponse:
        """Call Go backend to authenticate user and get tokens."""
        request = auth_pb2.LoginRequest(email=email, password=password)
        try:
            response: auth_pb2.TokenResponse = await self.stub.Login(request)
            return response
        except grpc.aio.AioRpcError as exc:
            logger.error("gRPC Login failed: %s", exc.details())
            raise

    async def validate_token(self, token: str) -> auth_pb2.ValidateTokenResponse:
        """Call Go backend to validate a token."""
        request = auth_pb2.ValidateTokenRequest(token=token)
        try:
            response: auth_pb2.ValidateTokenResponse = await self.stub.ValidateToken(
                request
            )
            return response
        except grpc.aio.AioRpcError as exc:
            logger.error("gRPC ValidateToken failed: %s", exc.details())
            raise
