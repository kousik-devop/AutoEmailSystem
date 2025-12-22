from fastapi import APIRouter
from typing import Optional, Dict, Any
from pydantic import BaseModel
from app.core.runner import AgentRunner

router = APIRouter(prefix="/agent")

class AgentRequest(BaseModel):
    agent_type: str
    prompt: str
    execute: bool = False
    meta: Optional[Dict[str, Any]] = None

@router.post("/run")
def run_agent_route(data: AgentRequest):
    result = AgentRunner.run(
        agent_type=data.agent_type,
        prompt=data.prompt,
        execute=data.execute,
        meta=data.meta
    )
    return {
        "success": True,
        "result": result
    }
