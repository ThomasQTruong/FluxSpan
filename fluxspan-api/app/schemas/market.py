"""Pydantic schemas for market asset management and price fluctuation alerts."""

from pydantic import BaseModel, Field


class AssetFavoriteCreate(BaseModel):
    """Schema for favoriting a market asset symbol (stock, crypto, etc.)."""

    symbol: str = Field(
        ...,
        min_length=1,
        max_length=15,
        json_schema_extra={"example": "BTC-USD"},
    )


class MarketAlertCreate(BaseModel):
    """Schema for creating a market asset price fluctuation alert over a time span."""

    symbol: str = Field(
        ...,
        min_length=1,
        max_length=15,
        json_schema_extra={"example": "BTC-USD"},
    )
    threshold_percentage: float = Field(
        ...,
        gt=0.0,
        json_schema_extra={"example": 5.0},
    )
    time_span_minutes: int = Field(
        ...,
        gt=0,
        json_schema_extra={"example": 60},
    )


class MarketAlertResponse(BaseModel):
    """Schema representing a configured market asset alert."""

    id: str
    user_id: str
    symbol: str
    threshold_percentage: float
    time_span_minutes: int
    is_active: bool = True

    model_config = {"from_attributes": True}
