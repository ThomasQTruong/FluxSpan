"""Pydantic schemas for JWT tokens."""

from pydantic import BaseModel


class Token(BaseModel):
    """Schema for JWT access token response."""

    access_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    """Schema for decoded JWT token payload claims."""

    sub: str | None = None
    type: str | None = None
    exp: int | None = None
