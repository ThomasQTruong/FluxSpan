"""Unit tests for security utilities (password hashing and JWT management)."""

from datetime import timedelta

import jwt
import pytest

from app.core.security import (
    create_access_token,
    decode_access_token,
    get_password_hash,
    verify_password,
)


def test_password_hashing_success():  # pylint: disable=missing-function-docstring
    raw_password = "MySecurePassword123!"
    hashed_password = get_password_hash(raw_password)

    # Argon2id produces a string starting with $argon2id$
    assert hashed_password.startswith("$argon2id$")
    assert verify_password(raw_password, hashed_password) is True


def test_password_verification_failure():  # pylint: disable=missing-function-docstring
    raw_password = "MySecurePassword123!"
    hashed_password = get_password_hash(raw_password)

    assert verify_password("WrongPassword!", hashed_password) is False


def test_create_and_decode_access_token():  # pylint: disable=missing-function-docstring
    subject = "usr_01HXYZ"
    claims = {"role": "admin"}

    token = create_access_token(subject=subject, extra_claims=claims)
    payload = decode_access_token(token)

    assert payload["sub"] == subject
    assert payload["role"] == "admin"
    assert payload["type"] == "access"
    assert "exp" in payload
    assert "iat" in payload


def test_decode_expired_token():  # pylint: disable=missing-function-docstring
    # Force immediate expiration
    expired_token = create_access_token(
        subject="usr_expired",
        expires_delta=timedelta(seconds=-1),
    )

    with pytest.raises(jwt.ExpiredSignatureError):
        decode_access_token(expired_token)


def test_decode_invalid_signature():  # pylint: disable=missing-function-docstring
    token = create_access_token(subject="usr_tampered")
    tampered_token = token[:-5] + "XXXXX"

    with pytest.raises(jwt.PyJWTError):
        decode_access_token(tampered_token)
