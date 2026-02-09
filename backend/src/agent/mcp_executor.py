"""
MCP tool executor - invokes MCP tools with proper context and error handling.
"""

from typing import Dict, Any, Optional
from uuid import UUID
import logging

logger = logging.getLogger(__name__)


class MCPExecutor:
    """Executes MCP tools without direct database access."""

    def __init__(self, session):
        """
        Initialize executor with database session.

        Args:
            session: SQLModel Session for tool execution
        """
        self.session = session

    async def execute_tool(
        self,
        tool_name: str,
        user_id: str,
        parameters: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Execute an MCP tool with user context and parameters.

        Args:
            tool_name: Name of the tool to execute (add_task, list_tasks, etc.)
            user_id: User ID for isolation
            parameters: Tool parameters

        Returns:
            Tool execution result: {status: "success"|"error", data: ..., error: ...}
        """
        logger.info(f"[mcp_executor] executing tool={tool_name} user_id={user_id}")

        try:
            # Import MCP tools
            from src.mcp.tools import (
                add_task_tool,
                list_tasks_tool,
                complete_task_tool,
                update_task_tool,
                delete_task_tool,
            )

            # Map tool name to handler
            tool_map = {
                "add_task": add_task_tool,
                "list_tasks": list_tasks_tool,
                "complete_task": complete_task_tool,
                "update_task": update_task_tool,
                "delete_task": delete_task_tool,
            }

            handler = tool_map.get(tool_name)
            if not handler:
                logger.error(f"[mcp_executor] unknown_tool tool={tool_name}")
                return {
                    "status": "error",
                    "error": {
                        "code": "UNKNOWN_TOOL",
                        "message": f"Tool '{tool_name}' not found",
                        "details": {"tool_name": tool_name}
                    }
                }

            # Prepare tool arguments
            tool_args = self._prepare_tool_args(tool_name, user_id, parameters)

            # Execute tool
            result = await handler(self.session, **tool_args)

            logger.info(f"[mcp_executor] tool_executed tool={tool_name} status={result.get('status')}")
            return result

        except Exception as e:
            logger.error(f"[mcp_executor] execution_failed tool={tool_name} error={str(e)}")
            return {
                "status": "error",
                "error": {
                    "code": "EXECUTION_ERROR",
                    "message": "Failed to execute tool",
                    "details": {"error": str(e)}
                }
            }

    def _prepare_tool_args(
        self,
        tool_name: str,
        user_id: str,
        parameters: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Prepare arguments for tool execution based on tool requirements.

        Args:
            tool_name: Name of the tool
            user_id: User ID
            parameters: Raw parameters from intent detection

        Returns:
            Cleaned parameters ready for tool execution
        """
        # All tools need user_id
        tool_args = {"user_id": user_id}

        if tool_name == "add_task":
            tool_args["title"] = parameters.get("title", "")
            tool_args["description"] = parameters.get("description")

        elif tool_name == "list_tasks":
            tool_args["status"] = parameters.get("status", "all")

        elif tool_name == "complete_task":
            tool_args["task_id"] = self._resolve_task_id(parameters)

        elif tool_name == "update_task":
            tool_args["task_id"] = self._resolve_task_id(parameters)
            if "new_title" in parameters:
                tool_args["title"] = parameters["new_title"]
            if "new_description" in parameters:
                tool_args["description"] = parameters["new_description"]

        elif tool_name == "delete_task":
            tool_args["task_id"] = self._resolve_task_id(parameters)

        return tool_args

    def _resolve_task_id(self, parameters: Dict[str, Any]) -> str:
        """
        Resolve task identifier to UUID.

        For Phase III MVP, we expect task_id to be provided directly.
        In future, this can be enhanced to resolve by index or title fragment.

        Args:
            parameters: Parameters containing task identifier

        Returns:
            Task UUID as string

        Raises:
            ValueError: If task identifier cannot be resolved
        """
        # Direct task_id
        if "task_id" in parameters:
            return str(parameters["task_id"])

        # Task index (future enhancement: query user's tasks and get by index)
        if "task_index" in parameters:
            # For now, return the index as a placeholder
            # TODO: Implement index-to-UUID resolution
            logger.warning(
                f"[mcp_executor] task_index_not_implemented index={parameters['task_index']}"
            )
            raise ValueError(
                "Task index resolution not yet implemented. Please use task ID."
            )

        # Task identifier (title fragment)
        if "task_identifier" in parameters:
            # Future enhancement: fuzzy match against user's tasks
            logger.warning(
                f"[mcp_executor] task_identifier_not_implemented identifier={parameters['task_identifier']}"
            )
            raise ValueError(
                "Task title matching not yet implemented. Please use task ID."
            )

        raise ValueError("No task identifier found in parameters")

    async def resolve_task_by_index(self, user_id: str, task_index: int) -> Optional[str]:
        """
        Future enhancement: Resolve task ID by index in user's task list.

        Args:
            user_id: User ID
            task_index: 1-based index

        Returns:
            Task UUID or None if not found
        """
        # TODO: Implement
        # 1. Get user's tasks (sorted by created_at)
        # 2. Return task at index (1-based)
        logger.warning("[mcp_executor] resolve_by_index not implemented")
        return None

    async def resolve_task_by_title(self, user_id: str, title_fragment: str) -> Optional[str]:
        """
        Future enhancement: Resolve task ID by title fragment (fuzzy match).

        Args:
            user_id: User ID
            title_fragment: Partial title to match

        Returns:
            Task UUID or None if not found
        """
        # TODO: Implement
        # 1. Get user's tasks
        # 2. Fuzzy match against title_fragment
        # 3. Return best match (or ask for clarification if multiple matches)
        logger.warning("[mcp_executor] resolve_by_title not implemented")
        return None
