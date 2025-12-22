import os
import requests

class TelegramService:
    @staticmethod
    def send_message(chat_id: str, text: str) -> dict:
        token = os.getenv("TELEGRAM_BOT_TOKEN")

        if not token:
            return {"success": False, "error": "Telegram token missing"}

        url = f"https://api.telegram.org/bot{token}/sendMessage"

        response = requests.post(url, json={
            "chat_id": chat_id,
            "text": text,
            "parse_mode": "HTML"
        })

        if response.ok:
            return {"success": True}
        else:
            return {
                "success": False,
                "error": response.text
            }
