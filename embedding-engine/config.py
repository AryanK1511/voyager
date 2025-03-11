from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    LOG_LEVEL: str = "DEBUG"
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    GOOGLE_APPLICATION_CREDENTIALS: str = ""
    GOOGLE_DRIVE_FOLDER_ID: str = ""
    GOOGLE_CREDENTIALS_PATH: str = ""
    GOOGLE_TOKEN_PATH: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
