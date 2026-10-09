"""Integration tests for authentication endpoints."""

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.mark.anyio
async def test_register_and_login() -> None:
    """Test user registration and OAuth2 login flow."""
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
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
async def test_login_invalid_credentials() -> None:
    """Test login failure with incorrect password."""
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        response = await ac.post(
            "/api/v1/auth/login",
            data={"username": "nonexistent@example.com", "password": "WrongPassword!"},
        )
        assert response.status_code == 401
