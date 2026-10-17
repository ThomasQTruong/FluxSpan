"""Integration tests for market asset favorites and alerts endpoints."""

import pytest
from httpx import ASGITransport, AsyncClient

from app.grpc.auth_client import AuthgRPCClient
from app.grpc.generated import auth_pb2
from app.main import app


@pytest.mark.anyio
async def test_market_favorites_and_alerts(monkeypatch: pytest.MonkeyPatch) -> None:
    """Test adding favorite market asset and creating price fluctuation alert."""
    async def mock_validate_token(  # pylint: disable=unused-argument
        self,
        token: str,
    ) -> auth_pb2.ValidateTokenResponse:
        return auth_pb2.ValidateTokenResponse(
            is_valid=True,
            user_id="integration@example.com",
        )

    monkeypatch.setattr(AuthgRPCClient, "validate_token", mock_validate_token)

    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac, app.router.lifespan_context(app):
        headers = {"Authorization": "Bearer mock_token"}

        # Add favorite asset (e.g. crypto or stock)
        response = await ac.post(
            "/api/v1/market/favorites",
            json={"symbol": "btc-usd"},
            headers=headers,
        )
        assert response.status_code == 201
        data = response.json()
        assert data["status"] == "success"
        assert data["symbol"] == "BTC-USD"

        # Create market alert
        response = await ac.post(
            "/api/v1/market/alerts",
            json={
                "symbol": "eth-usd",
                "threshold_percentage": 5.5,
                "time_span_minutes": 45,
            },
            headers=headers,
        )
        assert response.status_code == 201
        alert_data = response.json()
        assert alert_data["symbol"] == "ETH-USD"
        assert alert_data["threshold_percentage"] == 5.5
        assert alert_data["time_span_minutes"] == 45
        assert alert_data["is_active"] is True
        assert "id" in alert_data
