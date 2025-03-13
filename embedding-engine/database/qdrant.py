from config import settings
from langchain_openai import OpenAIEmbeddings  # noqa
from langchain_qdrant import QdrantVectorStore  # noqa
from qdrant_client import QdrantClient  # noqa
from qdrant_client.http.models import Distance, VectorParams  # noqa
from utils.logging import console, err_console  # noqa


class QdrantDatabase:
    def __init__(self):
        if settings.PYTHON_ENV.lower() == "prod":
            console.print("🔹 [blue]Connecting to Qdrant Cloud (PROD)...[/blue]")
            self.client = QdrantClient(
                url=settings.QDRANT_URL, api_key=settings.QDRANT_API_KEY
            )
        else:
            console.print(
                "🔹 [blue]Connecting to local Qdrant Docker container (DEV)...[/blue]"
            )
            self.client = QdrantClient(url="http://localhost:6333")

        console.print("🔹 [blue]Creating collection if it doesn't exist...[/blue]")
        try:
            self.client.create_collection(
                collection_name=settings.QDRANT_COLLECTION_NAME,
                vectors_config=VectorParams(size=1536, distance=Distance.COSINE),
            )
        except Exception as e:
            if "already exists" not in str(e):
                err_console.print(f"[red]Error creating collection: {e}[/red]")
            else:
                console.print("🔹 [blue]Skipping collection creation[/blue]")

        console.print("🔹 [blue]Initializing OpenAI embedding model...[/blue]")
        embeddings = OpenAIEmbeddings(
            model="text-embedding-3-small", api_key=settings.OPENAI_API_KEY
        )

        console.print("🔹 [blue]Initializing Qdrant vector store...[/blue]")

        console.print("🔹 [blue]Creating vector store...[/blue]")
        self.vector_store = QdrantVectorStore(
            client=self.client,
            collection_name=settings.QDRANT_COLLECTION_NAME,
            embedding=embeddings,
        )

    def add_documents(self, docs):
        self.vector_store.add_documents(docs)

    def search(self, query, k=2):
        results = self.vector_store.similarity_search_with_score(query, k=k)
        processed_results = []

        for doc, score in results:
            doc.metadata["score"] = round(score, 4)
            processed_results.append(doc)

        return processed_results
