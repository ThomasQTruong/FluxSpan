"""Authentication endpoints for registration and login."""

from typing import Annotated

import grpc
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.api.deps import get_current_user, get_grpc_channel
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
)
from app.grpc.auth_client import AuthgRPCClient
from app.schemas.token import RefreshTokenRequest, Token
from app.schemas.user import UserCreate, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register(
    user_in: UserCreate,
    channel: Annotated[grpc.aio.Channel, Depends(get_grpc_channel)],
) -> UserResponse:
    """Register a new user account via Go core engine gRPC service."""
    client = AuthgRPCClient(channel)
    try:
        response = await client.register(email=user_in.email, password=user_in.password)
        return UserResponse(
            id=response.id,
            email=response.email,
            is_active=response.is_active,
        )
    except grpc.aio.AioRpcError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=exc.details() or "Registration failed",
        ) from exc


@router.post("/login", response_model=Token)
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    channel: Annotated[grpc.aio.Channel, Depends(get_grpc_channel)],
) -> Token:
    """Authenticate user via Go core engine gRPC service and return JWT tokens."""
    client = AuthgRPCClient(channel)
    try:
        await client.login(
            email=form_data.username,
            password=form_data.password,
        )
        access_token = create_access_token(subject=form_data.username)
        refresh_token = create_refresh_token(subject=form_data.username)
        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
        )
    except grpc.aio.AioRpcError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc


@router.post("/refresh", response_model=Token)
async def refresh_access_token(body: RefreshTokenRequest) -> Token:
    """Exchange a valid refresh token for a new access token."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate refresh token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_refresh_token(body.refresh_token)
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except Exception as exc:
        raise credentials_exception from exc

    access_token = create_access_token(subject=user_id)
    return Token(access_token=access_token, token_type="bearer")


@router.get("/me", response_model=UserResponse)
async def read_current_user(
    current_user_id: Annotated[str, Depends(get_current_user)],
) -> UserResponse:
    """Retrieve details of the currently authenticated user."""
    return UserResponse(
        id="usr_0001",
        email=current_user_id,
        is_active=True,
    )
