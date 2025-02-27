from fastapi import APIRouter, Response
from fastapi import Request as ServerRequest

from app.utils.logger import CustomLogger
from app.utils.response import error_response, success_response

router = APIRouter()


@router.post("/chat")
async def get_response(req: ServerRequest, res: Response):
    try:
        # data = await req.json()

        CustomLogger.create_log("info", "Running chat endpoint")
        data = {
            "response": "Hello, how can I help you?",
        }
        return success_response("Success", 200, res, data)
    except ValueError as e:
        CustomLogger.create_log("error", f"Error generating commands: {str(e)}")
        return error_response(str(e), 400, res)
    except Exception as e:
        CustomLogger.create_log("error", f"Error creating user: {str(e)}")
        raise e
