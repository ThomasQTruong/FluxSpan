"""Pydantic schemas for user data representation and requests."""

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    """Base schema for user attributes."""

    email: EmailStr


class UserCreate(UserBase):
    """Schema for user registration requests."""

    password: str


class UserResponse(UserBase):
    """Schema for returning user details."""

    id: str
    is_active: bool = True

    model_config = {"from_attributes": True}
