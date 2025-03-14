from config import settings
from langchain_google_community import GoogleDriveLoader
from utils.logging import console, err_console


class GoogleDrive:
    def __init__(self):
        if not settings.GOOGLE_DRIVE_FOLDER_ID:
            err_console.print(
                "[bold red]Missing GOOGLE_DRIVE_FOLDER_ID in environment variables[/bold red]"
            )
            raise ValueError("Missing GOOGLE_DRIVE_FOLDER_ID in environment variables")

        if not settings.GOOGLE_CREDENTIALS_PATH:
            err_console.print(
                "[bold red]Missing GOOGLE_CREDENTIALS_PATH in environment variables[/bold red]"
            )
            raise ValueError("Missing GOOGLE_CREDENTIALS_PATH in environment variables")

        if not settings.GOOGLE_TOKEN_PATH:
            err_console.print(
                "[bold red]Missing GOOGLE_TOKEN_PATH in environment variables[/bold red]"
            )
            raise ValueError("Missing GOOGLE_TOKEN_PATH in environment variables")

        self.loader = GoogleDriveLoader(
            folder_id=settings.GOOGLE_DRIVE_FOLDER_ID,
            credentials_path=settings.GOOGLE_CREDENTIALS_PATH,
            token_path=settings.GOOGLE_TOKEN_PATH,
            scopes=["https://www.googleapis.com/auth/drive.readonly"],
            recursive=True,
        )
        console.print(
            f"🔹 [blue]GoogleDrive initialized with folder ID: {settings.GOOGLE_DRIVE_FOLDER_ID}[/blue]"
        )

    def get_documents(self):
        documents = self.loader.load()
        return documents
