"""
Custom exception handlers for authentication and authorization errors.
"""

from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import logging

logger = logging.getLogger(__name__)


class AuthenticationError(Exception):
    """Custom authentication error."""
    def __init__(self, message: str = "Authentication failed"):
        self.message = message
        super().__init__(self.message)


class AuthorizationError(Exception):
    """Custom authorization error."""
    def __init__(self, message: str = "Access denied"):
        self.message = message
        super().__init__(self.message)


async def authentication_exception_handler(request: Request, exc: AuthenticationError):
    """Handle authentication exceptions."""
    logger.warning(f"Authentication error: {exc.message} - Path: {request.url.path}")
    return JSONResponse(
        status_code=401,
        content={
            "error": "Authentication required",
            "message": exc.message,
            "status_code": 401,
            "type": "authentication_error"
        }
    )


async def authorization_exception_handler(request: Request, exc: AuthorizationError):
    """Handle authorization exceptions."""
    logger.warning(f"Authorization error: {exc.message} - Path: {request.url.path}")
    return JSONResponse(
        status_code=403,
        content={
            "error": "Access denied",
            "message": exc.message,
            "status_code": 403,
            "type": "authorization_error"
        }
    )


async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTP exceptions with proper logging."""
    logger.warning(f"HTTP {exc.status_code} error: {exc.detail} - Path: {request.url.path}")

    # Don't log sensitive authentication errors
    if exc.status_code in [401, 403] and "token" in str(exc.detail).lower():
        logger.info(f"Authentication/Authorization attempt - Path: {request.url.path}")

    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": "HTTP error",
            "message": exc.detail,
            "status_code": exc.status_code,
            "type": "http_error"
        }
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle validation errors."""
    logger.warning(f"Validation error: {exc.errors()} - Path: {request.url.path}")
    return JSONResponse(
        status_code=422,
        content={
            "error": "Validation error",
            "message": "Invalid request data",
            "details": exc.errors(),
            "status_code": 422,
            "type": "validation_error"
        }
    )


async def general_exception_handler(request: Request, exc: Exception):
    """Handle general unexpected exceptions."""
    logger.error(f"Unexpected error: {str(exc)} - Path: {request.url.path}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": "An unexpected error occurred",
            "status_code": 500,
            "type": "server_error"
        }
    )