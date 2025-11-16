🧠 Ask Gabriel – Personal AI Chat Assistant

Ask Gabriel is a personal AI chat assistant built with React, Node.js, and Cohere’s Command-A model.
It acts as a conversational guide to my background, skills, and portfolio projects — allowing visitors, recruiters, or collaborators to learn about me interactively.

🚀 Features

Conversational AI powered by Cohere v2 API (command-a-03-2025 model)

Natural, first-person responses — speaks as Gabriel Elart

Clean, responsive chat UI built with React

Secure backend using Express + dotenv (keeps API keys safe)

Modular structure, ready for integration into a personal portfolio website

🧩 Tech Stack
Layer	Tools
Frontend	React, CSS (custom styling), Fetch API
Backend	Node.js, Express.js
AI Provider	Cohere AI (Command-A-03-2025)
Environment Management	dotenv
Deployment-ready	Render / Vercel / Railway
🛠️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/GabeTheOne/gabe-chat-bot.git
cd gabe-chat-bot

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file in the root directory:
COHERE_API_KEY=your_cohere_api_key_here
PORT=4000

4️⃣ Start the backend server
node server.js


Server will run on http://localhost:4000

5️⃣ Start the React frontend
npm start


Frontend will run on http://localhost:3000 (or next available port).

💬 How It Works

User sends a message in the React chat UI.

The frontend calls the /api/chat route on the Node server.

The server sends the message (plus Gabriel’s profile data) to Cohere’s model.

The AI generates a natural, in-character response that sounds like Gabriel.

The frontend displays the reply in a sleek, chat-style interface.

⚙️ Project Structure
gabe-chat-bot/
│
├── src/
│   ├── App.js              # Main React chat UI
│   ├── App.css             # Styling
│   ├── gabrielProfile.js   # Personal structured data for AI context
│   └── ...
│
├── server.js               # Express backend (handles Cohere API)
├── .env                    # Environment variables (not committed)
├── package.json
└── README.md

🌐 Future Plans

Integrate into my personal portfolio website (gabriel-elart.dev)

Add context-aware chat modes (Recruiter / Developer / Casual)

Include typing animation and chat history memory

Host backend via Render and frontend via Vercel

👨‍💻 Author

Gabriel Elart
Frontend-focused Software Engineer based in New York
📍 GitHub