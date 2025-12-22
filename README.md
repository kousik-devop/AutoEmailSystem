# 🚀 AutoEmailSystem

**AutoEmailSystem** is an **Agentic AI-powered campaign automation platform** that allows users to **create, preview, and send emails automatically** using AI.  
It supports **secure authentication**, **campaign management**, **AI email generation**, and **email preview before sending**, making it suitable for real-world SaaS and startup use cases.

---

## ✨ Key Features

- 🔐 **User Authentication**
  - Login & Register (JWT based)
  - Protected routes
  - Secure logout

- 📧 **AI Email Campaigns**
  - Create email campaigns with prompts
  - AI-generated email content
  - Preview email before sending
  - One-click send confirmation popup

- 📂 **Campaign Management**
  - View “My Campaigns”
  - Campaign status (draft / completed)
  - Preview previously created campaigns
  - Send campaign anytime

- 🤖 **Agentic AI Integration**
  - Python-based AI service
  - Execute or preview campaigns using AI agents
  - Modular design for future WhatsApp / Social agents

- 🎨 **Modern UI**
  - React + Tailwind CSS
  - Fully responsive design
  - Clean SaaS-style dashboard

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### AI Service
- Python
- AI Agent Runner
- Gemini / LLM Integration
- SendGrid (Email delivery)

---

## 📁 Project Structure

AutoEmailSystem/
├── client/ # React + Tailwind Frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── services/
│ │ └── routes/
│
├── server/ # Node + Express Backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ └── services/
│
├── ai-service/ # Python AI Agent Service
│ ├── app/
│ ├── core/
│ └── requirements.txt
│
├── .env.example
├── .gitignore
└── README.md

yaml
কোড কপি করুন

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/AutoEmailSystem.git
cd AutoEmailSystem
2️⃣ Backend Setup
bash
কোড কপি করুন
cd server
npm install
npm run dev
3️⃣ Frontend Setup
bash
কোড কপি করুন
cd client
npm install
npm run dev
4️⃣ AI Service Setup
bash
কোড কপি করুন
cd ai-service
pip install -r requirements.txt
uvicorn app:main --reload
🔐 Environment Variables
Create a .env file using this template:

env
কোড কপি করুন
PORT=5000
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

SENDGRID_API_KEY=your_sendgrid_key
GEMINI_API_KEY=your_gemini_api_key
⚠️ Never push .env files to GitHub

🔄 Application Flow
User registers / logs in

User creates an email campaign with a prompt

AI generates email content

User previews email

User confirms & sends email

Campaign status updates to completed

User can view campaign history anytime

🧪 API Highlights
Create Campaign
bash
কোড কপি করুন
POST /api/campaigns
Preview Campaign (AI only)
bash
কোড কপি করুন
POST /api/campaigns/:id/run
{
  "execute": false
}
Send Campaign
bash
কোড কপি করুন
POST /api/campaigns/:id/run
{
  "execute": true
}
🚀 Future Enhancements
📅 Schedule email campaigns

📊 Campaign analytics (open / click rate)

👥 Multiple recipients support

📱 WhatsApp & Social media agents

🔁 Retry failed campaigns

🌐 Multi-language support

👨‍💻 Author
Kousik Maiti
Final Year Student | Full Stack Developer | AI Enthusiast

Built as a real-world Agentic AI SaaS project

⭐ Support
If you like this project:

⭐ Star the repository

🐛 Open issues for suggestions

🤝 Contribute via pull requests
