"""API endpoints for market asset favorites and fluctuation alerts."""

from typing import Annotated

from fastapi import APIRouter, Depends, status

from app.api.deps import get_current_user
from app.schemas.market import (
    AssetFavoriteCreate,
    MarketAlertCreate,
    MarketAlertResponse,
)

router = APIRouter(prefix="/market", tags=["Market & Alerts"])

# In-memory mock store for demonstration/testing
# until Go core engine gRPC methods are added
_FAVORITE_DB: list[dict[str, str]] = []
_ALERT_DB: list[dict[str, str | float | int | bool]] = []


@router.post("/favorites", status_code=status.HTTP_201_CREATED)
async def add_favorite_asset(
    favorite_in: AssetFavoriteCreate,
    current_user_id: Annotated[str, Depends(get_current_user)],
) -> dict[str, str]:
    """Add a market asset symbol to user favorites."""
    item = {"user_id": current_user_id, "symbol": favorite_in.symbol.upper()}
    if item not in _FAVORITE_DB:
        _FAVORITE_DB.append(item)
    return {"status": "success", "symbol": favorite_in.symbol.upper()}


@router.post(
    "/alerts",
    response_model=MarketAlertResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_market_alert(
    alert_in: MarketAlertCreate,
    current_user_id: Annotated[str, Depends(get_current_user)],
) -> MarketAlertResponse:
    """Create a market asset fluctuation time span alert."""
    alert_id = f"alt_{len(_ALERT_DB) + 1:04d}"
    alert_data = {
        "id": alert_id,
        "user_id": current_user_id,
        "symbol": alert_in.symbol.upper(),
        "threshold_percentage": alert_in.threshold_percentage,
        "time_span_minutes": alert_in.time_span_minutes,
        "is_active": True,
    }
    _ALERT_DB.append(alert_data)
    return MarketAlertResponse(**alert_data)
