from config import settings
from langchain_google_community import GoogleDriveLoader


class GoogleDrive:
    def __init__(self):
        self.loader = GoogleDriveLoader(
            folder_id=settings.GOOGLE_DRIVE_FOLDER_ID,
            credentials_path=settings.GOOGLE_CREDENTIALS_PATH,
            token_path=settings.GOOGLE_TOKEN_PATH,
            scopes=["https://www.googleapis.com/auth/drive.readonly"],
            recursive=True,
        )

    def get_documents(self):
        return self.loader.load()
