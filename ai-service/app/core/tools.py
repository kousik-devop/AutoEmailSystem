from app.services.email_service import EmailService
from app.utils.formatter import generate_subject, generate_html
from app.services.telegram_service import TelegramService


def send_telegram_tool(chat_id: str, message: str) -> dict:
    return TelegramService.send_message(
        chat_id=chat_id,
        text=message
    )


def send_email_tool(
    to_email: str,
    email_text: str,
    brand: dict | None = None
) -> dict:
    subject = generate_subject(email_text)
    html = generate_html(email_text, brand)

    return EmailService.send_email(
        to_email=to_email,
        subject=subject,
        html_content=html,
    )
