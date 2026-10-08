"""API dependencies for security and gRPC channel injection."""

# pylint: disable=unused-import

from collections.abc import AsyncGenerator  # noqa: F401
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.core.config import settings
from app.core.security import decode_access_token
from app.grpc.client import get_grpc_channel  # noqa: F401
from app.schemas.token import TokenPayload

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
) -> str:
    """Validate access token and return subject (user ID)."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload_dict = decode_access_token(token)
        payload = TokenPayload(**payload_dict)
        if payload.sub is None or payload.type != "access":
            raise credentials_exception
    except (jwt.PyJWTError, ValueError) as exc:
        raise credentials_exception from exc
    return payload.sub
