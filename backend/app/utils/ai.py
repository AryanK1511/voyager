# backend/app/utils/ai.py

from langchain_core.messages import AIMessage, HumanMessage


def format_chat_history(history):
    """
    Format the chat history into a string.
    """
    formatted_history = "\n".join(
        [f"{msg['role'].capitalize()}: {msg['content']}" for msg in history]
    )
    return formatted_history


def format_documents(documents):
    """
    Format the documents into a string.
    """
    formatted_docs = "\n".join([doc.page_content for doc in documents])
    return formatted_docs


def prepare_messages(history):
    """
    Prepare the messages for the LLM.
    """
    messages = []
    for msg in history:
        if msg["role"].lower() == "user":
            messages.append(HumanMessage(content=msg["content"]))
        elif msg["role"].lower() == "bot":
            messages.append(AIMessage(content=msg["content"]))
    return messages
