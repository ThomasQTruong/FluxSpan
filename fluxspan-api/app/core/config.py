"""Configuration settings for the FluxSpan API application."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configuration class for FluxSpan API settings."""

    PROJECT_NAME: str = "FluxSpan API"
    API_V1_STR: str = "/api/v1"

    # Security / JWT Settings
    # Generate a secure key in terminal using: openssl rand -hex 32
    SECRET_KEY: str = "CHANGE_THIS_TEMPORARY_SECRET_KEY_FOR_DEV_ONLY_12345"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Database Connection String (TimescaleDB / PostgreSQL)
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/fluxspan"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()
