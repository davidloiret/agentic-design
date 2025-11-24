"""
Authentication middleware for prompt optimizer API.

This module provides email-based access control to restrict API usage
to authorized users only.
"""

import os
from typing import List, Optional
from fastapi import HTTPException, Security, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from datetime import datetime, timedelta


class EmailAuthMiddleware:
    """Email-based authentication middleware for API access control."""

    def __init__(self):
        # List of authorized emails
        self.allowed_emails = {
            "loiret.d@gmail.com"
        }

        # JWT secret for token validation
        self.jwt_secret = os.getenv("JWT_SECRET", "your-secret-key-change-in-production")
        self.jwt_algorithm = "HS256"
        self.jwt_expiration_hours = 24

        # HTTP Bearer token scheme
        self.security = HTTPBearer(auto_error=False)

    def create_access_token(self, email: str) -> str:
        """Create a JWT access token for the given email."""
        if email not in self.allowed_emails:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Email not authorized"
            )

        expire = datetime.utcnow() + timedelta(hours=self.jwt_expiration_hours)
        payload = {
            "sub": email,
            "exp": expire,
            "iat": datetime.utcnow(),
            "type": "access"
        }

        return jwt.encode(payload, self.jwt_secret, algorithm=self.jwt_algorithm)

    def verify_token(self, token: str) -> str:
        """Verify JWT token and return the email."""
        try:
            payload = jwt.decode(token, self.jwt_secret, algorithms=[self.jwt_algorithm])
            email = payload.get("sub")

            if email is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token payload"
                )

            if email not in self.allowed_emails:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Email not authorized"
                )

            return email

        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired"
            )
        except jwt.JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )

    def get_current_user(self, credentials: Optional[HTTPAuthorizationCredentials] = None) -> str:
        """Get the current authenticated user email."""
        if credentials is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="No authentication token provided",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return self.verify_token(credentials.credentials)

    def get_current_user_optional(self, credentials: Optional[HTTPAuthorizationCredentials] = None) -> Optional[str]:
        """Get the current user email, but don't raise exception if not authenticated."""
        if credentials is None:
            return None

        try:
            return self.verify_token(credentials.credentials)
        except HTTPException:
            return None

    def is_authorized(self, email: str) -> bool:
        """Check if an email is in the allowed list."""
        return email in self.allowed_emails

    def add_allowed_email(self, email: str) -> bool:
        """Add an email to the allowed list."""
        if email and "@" in email and "." in email:
            self.allowed_emails.add(email.lower().strip())
            return True
        return False

    def remove_allowed_email(self, email: str) -> bool:
        """Remove an email from the allowed list."""
        if email in self.allowed_emails:
            self.allowed_emails.remove(email)
            return True
        return False

    def get_allowed_emails(self) -> List[str]:
        """Get the list of allowed emails."""
        return list(self.allowed_emails)


# Global authentication instance
auth_middleware = EmailAuthMiddleware()


# Decorator for protecting routes
def require_auth(f):
    """Decorator to require authentication for a route."""
    def wrapper(*args, **kwargs):
        # This will be handled by FastAPI dependency injection
        return f(*args, **kwargs)
    return wrapper


# FastAPI dependency for current user
async def get_current_user_email(credentials: Optional[HTTPAuthorizationCredentials] = Security(auth_middleware.security)) -> str:
    """FastAPI dependency to get current user email."""
    return auth_middleware.get_current_user(credentials)


# Optional auth dependency
async def get_current_user_email_optional(credentials: Optional[HTTPAuthorizationCredentials] = Security(auth_middleware.security)) -> Optional[str]:
    """FastAPI dependency to get current user email (optional)."""
    return auth_middleware.get_current_user_optional(credentials)