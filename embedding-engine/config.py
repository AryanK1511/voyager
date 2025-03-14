from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PYTHON_ENV: str = "dev"
    LOG_LEVEL: str = "INFO"
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    GOOGLE_APPLICATION_CREDENTIALS: str = ""
    GOOGLE_DRIVE_FOLDER_ID: str = ""
    GOOGLE_CREDENTIALS_PATH: str = ""
    GOOGLE_TOKEN_PATH: str = ""
    QDRANT_URL: str = ""
    QDRANT_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    QDRANT_COLLECTION_NAME: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
