# backend/app/database/qdrant.py

from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams

from app.config import settings
from app.utils.logger import CustomLogger


class QdrantDatabase:
    def __init__(self):
        if settings.PYTHON_ENV.lower() == "prod":
            CustomLogger.create_log("info", "Connecting to Qdrant Cloud (PROD)")
            self.client = QdrantClient(
                url=settings.QDRANT_URL, api_key=settings.QDRANT_API_KEY
            )
        else:
            self.client = QdrantClient(url="http://localhost:6333")
        try:
            self.client.create_collection(
                collection_name=settings.QDRANT_COLLECTION_NAME,
                vectors_config=VectorParams(size=1536, distance=Distance.COSINE),
            )
        except Exception as e:
            if "already exists" not in str(e):
                CustomLogger.create_log("error", f"Error creating collection: {e}")
            else:
                CustomLogger.create_log("info", "Skipping collection creation")

        embeddings = OpenAIEmbeddings(
            model="text-embedding-3-small", api_key=settings.OPENAI_API_KEY
        )

        self.vector_store = QdrantVectorStore(
            client=self.client,
            collection_name=settings.QDRANT_COLLECTION_NAME,
            embedding=embeddings,
        )

    def search(self, query, k=2):
        CustomLogger.create_log("info", f"Searching for {query}")
        results = self.vector_store.similarity_search_with_score(query, k=k)
        processed_results = []

        for doc, score in results:
            doc.metadata["score"] = round(score, 4)
            processed_results.append(doc)

        return processed_results
