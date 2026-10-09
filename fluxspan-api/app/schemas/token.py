"""Pydantic schemas for JWT tokens."""

from pydantic import BaseModel


class Token(BaseModel):
    """Schema for JWT access token response."""

    access_token: str
    refresh_token: str | None = None
    token_type: str = "bearer"


class RefreshTokenRequest(BaseModel):
    """Schema for requesting a new access token via refresh token."""

    refresh_token: str


class TokenPayload(BaseModel):
    """Schema for decoded JWT token payload claims."""

    sub: str | None = None
    type: str | None = None
    exp: int | None = None
