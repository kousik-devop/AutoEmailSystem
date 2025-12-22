import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


class EmailService:
    @staticmethod
    def send_email(to_email: str, subject: str, html_content: str) -> dict:
        api_key = os.getenv("SENDGRID_API_KEY")
        from_email = os.getenv("FROM_EMAIL")

        if not api_key or not from_email:
            return {
                "success": False,
                "message": "Email service disabled"
            }

        try:
            message = Mail(
                from_email=from_email,
                to_emails=to_email,
                subject=subject,
                html_content=html_content,
            )

            sg = SendGridAPIClient(api_key)
            response = sg.send(message)

            return {
                "success": True,
                "status_code": response.status_code
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
