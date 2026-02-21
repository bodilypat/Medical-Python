#app/core/middleware.py

from fastapi import FastAPI, Request
import logging 
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger("__name__")

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        logger.info(f"Incoming request: {request.method} {request.url}")
        response = await call_next(request)
        logger.info(f"Response status: {response.status_code}{request.url}")
        return response
    
def add_middleware(app: FastAPI):
    app.add_middleware(LoggingMiddleware)
    