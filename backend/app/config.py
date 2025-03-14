# backend/app/config.py

from pydantic_settings import BaseSettings

from app.constants import PROJECT_NAME


class Settings(BaseSettings):
    PROJECT_NAME: str = PROJECT_NAME
    PYTHON_ENV: str = "dev"
    LOG_LEVEL: str = "INFO"
    GOOGLE_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    QDRANT_API_KEY: str = ""
    QDRANT_COLLECTION_NAME: str = ""
    QDRANT_URL: str = ""
    LANGSMITH_TRACING: bool = False
    LANGSMITH_ENDPOINT: str = ""
    LANGSMITH_API_KEY: str = ""
    LANGSMITH_PROJECT: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
