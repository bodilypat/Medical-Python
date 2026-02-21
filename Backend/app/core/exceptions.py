#app/core/exceptions.py 

from fastapi import HTTPException, status

class CredentialsException(HTTPException):
    def __init__(self, detail: str = "Invalid credentials"):
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, detail=detail)

class NotFoundException(HTTPException):
    def __init__(self, entity: str = "Resource"):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=f"{entity} not found")

class ForbiddenException(HTTPException):
    def __init__(self, detail: str = "Operation not permitted"):
        super().__init__(status_code=status.HTTP_403_FORBIDDEN, detail=detail)

        