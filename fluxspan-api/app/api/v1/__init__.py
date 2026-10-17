"""API v1 router configuration."""

from fastapi import APIRouter

from app.api.v1.endpoints import auth, market

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(market.router)
