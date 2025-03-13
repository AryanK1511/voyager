from database.qdrant import QdrantDatabase
from downstream.google_drive import GoogleDrive
from langchain_text_splitters.character import RecursiveCharacterTextSplitter
from utils.logging import console, err_console


class EmbeddingService:
    def __init__(self):
        self.qdrant_db = QdrantDatabase()
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )

    def embed_google_drive_data(self):
        console.print("🔹 [blue]Embedding Google Drive data...[/blue]")
        self.google_drive = GoogleDrive()
        documents = self.google_drive.get_documents()
        console.print(
            f"🔹 [blue]Loaded {len(documents)} documents from Google Drive[/blue]"
        )
        chunks = self.text_splitter.split_documents(documents)
        console.print(
            f"🔹 [blue]Split {len(documents)} documents into {len(chunks)} chunks[/blue]"
        )
        self.qdrant_db.add_documents(chunks)
        console.print(f"🔹 [blue]Added {len(chunks)} chunks to Qdrant[/blue]")

    def search(self, query, k=5):
        console.print(f"🔹 [blue]Searching for: '{query}'[/blue]")
        try:
            results = self.qdrant_db.search(query, k=k)
            console.print(f"🔹 [blue]Found {len(results)} results[/blue]")
            return results
        except Exception as e:
            err_console.print(f"🔹 [red]Search failed: {str(e)}[/red]")
            raise
