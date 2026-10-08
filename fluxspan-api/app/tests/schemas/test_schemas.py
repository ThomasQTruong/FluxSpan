"""Unit tests for Pydantic v2 schemas."""

import pytest
from pydantic import ValidationError

from app.schemas import Token, UserCreate, UserResponse


def test_token_schema():  # pylint: disable=missing-function-docstring
    token = Token(access_token="test-jwt-token")
    assert token.access_token == "test-jwt-token"
    assert token.token_type == "bearer"


def test_user_create_validation():  # pylint: disable=missing-function-docstring
    user_data = {"email": "test@example.com", "password": "SecurePassword123!"}
    user = UserCreate(**user_data)
    assert user.email == "test@example.com"
    assert user.password == "SecurePassword123!"

    with pytest.raises(ValidationError):
        UserCreate(email="not-an-email", password="123")


def test_user_response_schema():  # pylint: disable=missing-function-docstring
    user = UserResponse(id="usr_123", email="test@example.com", is_active=True)
    assert user.id == "usr_123"
    assert user.email == "test@example.com"
    assert user.is_active is True
