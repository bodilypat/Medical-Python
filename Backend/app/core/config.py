#app/core/config.py

from pydantic import BaseSettings, AnyUrl
from typing import List 

class Settings(BaseSettings):
    PROJECT_NAME: str = "Medical Management System"
    PROJECT_VERSION: str = "1.0.0"

    # Database settings
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "yourpassword"
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_PORT: str = "5432"
    POSTGRES_DB: str = "medicaldb"
    SQLALCHEMY_DATABASE_URI: str = None  # Will be build dynamically

    # JWT settings
    JWT_SECRET_KEY: str = "suppersecrekey"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    #CORS settings
    BACKEND_CORS_ORIGINS: List[AnyUrl] = ["http://localhost:3000"]

    # Redis settings
    REDIS_HOST: str = "redis://localhost:6379/0"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

        def build_database_uri(self):
            return f"postgres://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        
    # Initialize
    settings = Settings()
    settings.SQLALCHEMY_DATABASE_URI = settings.build_database_uri()

    
        








