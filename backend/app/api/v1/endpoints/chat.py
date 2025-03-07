from dotenv import load_dotenv
from fastapi import APIRouter, Response
from fastapi import Request as ServerRequest
from fastapi.responses import StreamingResponse
from langchain.schema import AIMessage, HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

from app.utils.logger import CustomLogger
from app.utils.response import error_response

router = APIRouter()


@router.post("/chat")
async def get_response(req: ServerRequest, res: Response):
    try:
        data = await req.json()
        query = data.get("query")
        history = data.get("history", [])

        if not query:
            return error_response("Query is required", 400, res)

        CustomLogger.create_log("info", "Running chat endpoint")

        messages = []
        for msg in history:
            if msg["role"] == "user":
                messages.append(HumanMessage(content=msg["content"]))
            elif msg["role"] == "bot":
                messages.append(AIMessage(content=msg["content"]))

        # Add the current query to the messages
        messages.append(HumanMessage(content=query))

        llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", streaming=True)

        async def stream_response():
            async for chunk in llm.astream(messages):
                yield f"data: {chunk.content}\n\n"

        return StreamingResponse(stream_response(), media_type="text/event-stream")

    except ValueError as e:
        CustomLogger.create_log("error", f"Error generating commands: {str(e)}")
        return error_response(str(e), 400, res)
    except Exception as e:
        CustomLogger.create_log("error", f"Error creating user: {str(e)}")
        raise e
