import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

load_dotenv()

sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))

message = Mail(
    from_email=os.getenv("FROM_EMAIL"),
    to_emails="cse22115@cemk.ac.in",
    subject="SendGrid Test Email",
    html_content="<p>If you see this, SendGrid works ✅</p>"
)

response = sg.send(message)

print("Status Code:", response.status_code)
