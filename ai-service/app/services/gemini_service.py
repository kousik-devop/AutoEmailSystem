import os
from dotenv import load_dotenv
from google import genai
from google.genai.errors import ClientError

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_text(prompt: str) -> str:
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        return response.text

    except ClientError as e:
        if "RESOURCE_EXHAUSTED" in str(e):
            return (
                "Hey ❤️\n\n"
                "Just wanted to remind you how special you are to me. "
                "You mean a lot, and I’m really grateful to have you in my life.\n\n"
                "Always thinking of you 💕"
            )
        raise