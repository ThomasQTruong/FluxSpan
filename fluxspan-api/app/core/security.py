"""Security utilities for password hashing and JWT token management."""

from datetime import UTC, datetime, timedelta
from typing import Any

import jwt
from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher

from app.core.config import settings

# Initialize Argon2id password hasher (OWASP recommended standard)
_password_hash = PasswordHash((Argon2Hasher(),))


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain-text password against a hashed password string."""
    return _password_hash.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Generate an Argon2id hash from a plain-text password."""
    return _password_hash.hash(password)


def create_access_token(
    subject: str | Any,
    expires_delta: timedelta | None = None,
    extra_claims: dict[str, Any] | None = None,
) -> str:
    """Encode a JWT access token with user identification and expiry context."""
    now = datetime.now(UTC)

    if expires_delta:
        expire = now + expires_delta
    else:
        expire = now + timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES)

    payload: dict[str, Any] = {
        "sub": str(subject),
        "iat": int(now.timestamp()),
        "exp": int(expire.timestamp()),
        "type": "access",
    }

    if extra_claims:
        payload.update(extra_claims)

    encoded_jwt: str = jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )
    return encoded_jwt


def decode_access_token(token: str) -> dict[str, Any]:
    """Decode and validate a JWT access token signature and claims.

    Raises:
        jwt.PyJWTError: If the token signature is invalid or expired.
    """
    payload: dict[str, Any] = jwt.decode(
        token,
        settings.JWT_SECRET_KEY,
        algorithms=[settings.JWT_ALGORITHM],
    )
    return payload
