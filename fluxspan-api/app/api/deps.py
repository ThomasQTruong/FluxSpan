"""API dependencies for security and gRPC channel injection."""

from typing import Annotated

import grpc
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.core.config import settings
from app.grpc.auth_client import AuthgRPCClient
from app.grpc.client import get_grpc_channel

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    channel: Annotated[grpc.aio.Channel, Depends(get_grpc_channel)],
) -> str:
    """Validate access token via Go core engine gRPC service and return user ID."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    client = AuthgRPCClient(channel)
    try:
        response = await client.validate_token(token=token)
        if not response.is_valid or not response.user_id:
            raise credentials_exception
        return response.user_id
    except grpc.aio.AioRpcError as exc:
        raise credentials_exception from exc
