"""Authentication endpoints for registration and login."""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.api.deps import get_current_user
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
    get_password_hash,
    verify_password,
)
from app.schemas.token import RefreshTokenRequest, Token
from app.schemas.user import UserCreate, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

# In-memory mock user store for demonstration/testing until gRPC Go backend is wired up
# (In production, this state lives in PostgreSQL/TimescaleDB via Go core engine)
_USER_DB: dict[str, dict[str, str]] = {}


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register(user_in: UserCreate) -> UserResponse:
    """Register a new user account."""
    if user_in.email in _USER_DB:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    hashed_password = get_password_hash(user_in.password)
    user_id = f"usr_{len(_USER_DB) + 1:04d}"

    _USER_DB[user_in.email] = {
        "id": user_id,
        "email": user_in.email,
        "hashed_password": hashed_password,
    }

    return UserResponse(id=user_id, email=user_in.email, is_active=True)


@router.post("/login", response_model=Token)
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    """Authenticate user and return JWT access token."""
    user = _USER_DB.get(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(subject=user["id"])
    refresh_token = create_refresh_token(subject=user["id"])
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
    )


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
    # Find user by ID in mock database
    for user_data in _USER_DB.values():
        if user_data["id"] == current_user_id:
            return UserResponse(
                id=user_data["id"],
                email=user_data["email"],
                is_active=True,
            )

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found",
    )
