from typing import Dict, Any
from fastapi import HTTPException

from app.services.gemini_service import generate_text
from app.core.tools import send_email_tool
from app.core.tools import send_telegram_tool


class AgentRunner:
    """
    Central brain of the AI service.
    This class decides:
    - Which agent to run
    - What content to generate
    - Whether to execute (send) or only preview
    """

    @staticmethod
    def run(
        agent_type: str,
        prompt: str,
        execute: bool = False,
        meta: Dict[str, Any] | None = None
    ) -> Dict[str, Any]:
        """
        :param agent_type: email | social | whatsapp
        :param prompt: user/business prompt
        :param execute: whether to send/post or only generate
        :param meta: extra data (email, phone, platform)
        """

        meta = meta or {}

        # -------------------------------
        # EMAIL AGENT
        # -------------------------------
        if agent_type == "email":
            email_text = generate_text(
                f"""
                Write a professional marketing email.

                Rules:
                - Clear value proposition
                - Short readable paragraphs
                - Friendly call to action
                - No emojis
                - End with a professional sign-off

                Prompt:
                {prompt}
                """
            ).strip()

            response = {
                "type": "email",
                "preview": email_text,
                "executed": False,
            }

            if execute:
                to_email = meta.get("to_email")
                brand = meta.get("brand", {})

                if not to_email:
                    raise HTTPException(
                        status_code=400,
                        detail="to_email is required to send email"
                )

                send_result = send_email_tool(
                    to_email=to_email,
                    email_text=email_text,
                    brand=brand
                )

                response["executed"] = True
                response["send_status"] = send_result

            return response
        

        # -------------------------------
# TELEGRAM AGENT
# -------------------------------
        if agent_type == "telegram":
            message = generate_text(
                f"""
                Write a friendly Telegram message.

                Rules:
                - Conversational
                - Emojis allowed (but not too many)
                - Short and warm

                Prompt:
                {prompt}
                """
            ).strip()

            response = {
                "type": "telegram",
                "message": message,
                "executed": False
            }

            if execute:
                chat_id = meta.get("chat_id")

                if not chat_id:
                    raise ValueError("chat_id is required for Telegram")

                send_result = send_telegram_tool(
                    chat_id=chat_id,
                    message=message
                )

                response["executed"] = True
                response["send_status"] = send_result

            return response

        # -------------------------------
        # SOCIAL MEDIA AGENT
        # -------------------------------
        if agent_type == "social":
            caption = generate_text(
                f"""
                Write a catchy social media post.

                Rules:
                - Engaging opening line
                - Clear CTA
                - Suitable for LinkedIn / Instagram
                - Max 4–5 lines

                Prompt:
                {prompt}
                """
            ).strip()

            return {
                "type": "social",
                "caption": caption,
                "executed": False,
            }

        # -------------------------------
        # WHATSAPP AGENT
        # -------------------------------
        if agent_type == "whatsapp":
            message = generate_text(
                f"""
                Write a short WhatsApp marketing message.

                Rules:
                - Friendly and concise
                - No long paragraphs
                - One clear CTA
                - Conversational tone

                Prompt:
                {prompt}
                """
            ).strip()

            return {
                "type": "whatsapp",
                "message": message,
                "executed": False,
            }

        # -------------------------------
        # UNKNOWN AGENT
        # -------------------------------
        raise ValueError(f"Unsupported agent type: {agent_type}")
