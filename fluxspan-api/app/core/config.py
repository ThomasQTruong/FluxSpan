"""Configuration settings for the FluxSpan API application."""

from pathlib import Path
from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict

# Path to config.py -> core -> app -> fluxspan-api -> FluxSpan (monorepo root)
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
ENV_PATH = BASE_DIR / ".env"


class Settings(BaseSettings):
    """Configuration class for FluxSpan API settings."""

    PROJECT_NAME: str = "FluxSpan API"
    API_V1_STR: str = "/api/v1"

    # Security / JWT Settings
    # Generate a secure key in terminal using: openssl rand -hex 32
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # gRPC Downstream Target (Go Core Engine)
    GO_GRPC_HOST: str = "localhost"
    GO_GRPC_PORT: int = 50051

    @computed_field
    @property
    def go_grpc_target(self) -> str:
        """Construct target connection string for gRPC channel creation."""
        return f"{self.GO_GRPC_HOST}:{self.GO_GRPC_PORT}"

    model_config = SettingsConfigDict(
        env_file=(ENV_PATH, ".env"),
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()
