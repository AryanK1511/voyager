# backend/app/services/AIService/prompts.py

from langchain_core.prompts import ChatPromptTemplate


class Prompts:
    @staticmethod
    def get_chat_prompt():
        return ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    """You are an intelligent assistant that answers user queries based on provided context.""",
                ),
                (
                    "human",
                    """Here is the conversation history:
                    {chat_history}

                    The following context has been retrieved from relevant documents:
                    {context}

                    Based on this information, please answer my query:
                    {query}""",
                ),
            ]
        )
