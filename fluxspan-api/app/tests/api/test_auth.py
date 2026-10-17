"""Integration tests for authentication endpoints."""

import grpc
import pytest
from httpx import ASGITransport, AsyncClient

from app.grpc.auth_client import AuthgRPCClient
from app.grpc.generated import auth_pb2
from app.main import app


@pytest.mark.anyio
async def test_register_and_login(monkeypatch: pytest.MonkeyPatch) -> None:
    """Test user registration and OAuth2 login flow with mocked gRPC client."""
    async def mock_register(self, email: str, password: str) -> auth_pb2.UserResponse:  # pylint: disable=unused-argument
        return auth_pb2.UserResponse(id="usr_0001", email=email, is_active=True)

    async def mock_login(self, email: str, password: str) -> auth_pb2.TokenResponse:  # pylint: disable=unused-argument
        return auth_pb2.TokenResponse(
            access_token="mock_grpc_access",
            refresh_token="mock_grpc_refresh",
            token_type="bearer",
        )

    monkeypatch.setattr(AuthgRPCClient, "register", mock_register)
    monkeypatch.setattr(AuthgRPCClient, "login", mock_login)

    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac, app.router.lifespan_context(app):
        # Register user
        response = await ac.post(
            "/api/v1/auth/register",
            json={"email": "integration@example.com", "password": "SecurePassword123!"},
        )
        assert response.status_code == 201
        data = response.json()
        assert data["email"] == "integration@example.com"
        assert "id" in data

        # Login user (OAuth2PasswordRequestForm expects form-urlencoded data)
        response = await ac.post(
            "/api/v1/auth/login",
            data={
                "username": "integration@example.com",
                "password": "SecurePassword123!",
            },
        )
        assert response.status_code == 200
        token_data = response.json()
        assert "access_token" in token_data
        assert "refresh_token" in token_data
        assert token_data["token_type"] == "bearer"

        refresh_token = token_data["refresh_token"]

        # Test token refresh
        response = await ac.post(
            "/api/v1/auth/refresh",
            json={"refresh_token": refresh_token},
        )
        assert response.status_code == 200
        refresh_data = response.json()
        assert "access_token" in refresh_data
        assert refresh_data["token_type"] == "bearer"

        # Test GET /me with access token
        access_token = token_data["access_token"]
        response = await ac.get(
            "/api/v1/auth/me",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        assert response.status_code == 200
        me_data = response.json()
        assert me_data["email"] == "integration@example.com"
        assert "id" in me_data


@pytest.mark.anyio
async def test_login_invalid_credentials(monkeypatch: pytest.MonkeyPatch) -> None:
    """Test login failure with incorrect password via mocked gRPC error."""
    async def mock_login_error(  # pylint: disable=unused-argument
        self,
        email: str,
        password: str,
    ) -> auth_pb2.TokenResponse:
        raise grpc.aio.AioRpcError(
            code=grpc.StatusCode.UNAUTHENTICATED,
            initial_metadata=tuple(),
            trailing_metadata=tuple(),
            details="Incorrect email or password",
        )

    monkeypatch.setattr(AuthgRPCClient, "login", mock_login_error)

    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac, app.router.lifespan_context(app):
        response = await ac.post(
            "/api/v1/auth/login",
            data={"username": "nonexistent@example.com", "password": "WrongPassword!"},
        )
        assert response.status_code == 401
