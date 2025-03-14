# backend/app/api/v1/endpoints/chat.py

from fastapi import APIRouter, Response
from fastapi import Request as ServerRequest
from fastapi.responses import StreamingResponse

from app.services.AIService import AIService
from app.utils.logger import CustomLogger
from app.utils.response import error_response

router = APIRouter()


@router.post("/chat")
async def get_response(req: ServerRequest, res: Response):
    try:
        data = await req.json()
        query = data.get("query")
        history = data.get("history", [])
        model = data.get("model", "gpt-4o-mini")

        if not query:
            return error_response("Query is required", 400, res)

        CustomLogger.create_log("info", f"Running chat endpoint with model: {model}")

        ai_service = AIService(model=model)

        async def stream_response():
            response_generator = await ai_service.get_response(model, query, history)
            async for chunk in response_generator:
                yield f"data: {chunk}\n\n"

        return StreamingResponse(stream_response(), media_type="text/event-stream")

    except ValueError as e:
        CustomLogger.create_log("error", f"Error generating response: {str(e)}")
        return error_response(str(e), 400, res)
    except Exception as e:
        CustomLogger.create_log("error", f"Unexpected error: {str(e)}")
        raise e
