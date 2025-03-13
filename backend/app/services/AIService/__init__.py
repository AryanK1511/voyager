# backend/app/services/AIService/__init__.py

from langchain_core.messages import AIMessage, HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import ChatOpenAI

from app.config import settings
from app.constants import MODELS_MAPPING
from app.database.qdrant import QdrantDatabase
from app.services.AIService.prompts import Prompts
from app.utils.ai import format_chat_history, format_documents, prepare_messages
from app.utils.logger import CustomLogger


class AIService:
    def __init__(self, model="gpt-4o-mini"):
        self.qdrant_db = QdrantDatabase()

        if MODELS_MAPPING[model] == "openai":
            self.openai_model = ChatOpenAI(
                model=model, streaming=True, api_key=settings.OPENAI_API_KEY
            )
        elif MODELS_MAPPING[model] == "google":
            self.google_model = ChatGoogleGenerativeAI(
                model=model, streaming=True, api_key=settings.GOOGLE_API_KEY
            )

    def get_documents(self, query, k=2):
        return self.qdrant_db.search(query, k)

    async def generate_openai_response(self, query, history, documents):
        formatted_history = format_chat_history(history)
        formatted_docs = format_documents(documents)

        prompt_template = Prompts.get_chat_prompt()
        formatted_prompt = prompt_template.format(
            chat_history=formatted_history, context=formatted_docs, query=query
        )

        async for chunk in self.openai_model.astream(formatted_prompt):
            yield chunk.content

    async def generate_google_response(self, query, history, documents):
        formatted_history = format_chat_history(history)
        formatted_docs = format_documents(documents)

        prompt_template = Prompts.get_chat_prompt()
        formatted_prompt = prompt_template.format(
            chat_history=formatted_history, context=formatted_docs, query=query
        )

        messages = [HumanMessage(content=formatted_prompt)]

        async for chunk in self.google_model.astream(messages):
            yield chunk.content

    async def get_response(self, model, query, history):
        documents = self.get_documents(query)
        CustomLogger.create_log("info", f"Retrieved {len(documents)} documents")

        if MODELS_MAPPING[model] == "openai":
            return self.generate_openai_response(query, history, documents)
        elif MODELS_MAPPING[model] == "google":
            return self.generate_google_response(query, history, documents)
        else:
            raise ValueError(f"Unsupported model: {model}")
