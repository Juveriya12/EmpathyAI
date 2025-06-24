# Chatbot Project (React + FastAPI)

## Project Overview

This is an AI-powered chatbot built using **React (TypeScript) + Tailwind CSS + Lucide React Icons** for the frontend, and **FastAPI** for the backend. It utilizes **LangChain, Groq, and FAISS, and Hugging Face models** for natural language processing and vectorized data storage.

### Features

- **Frontend:** React + TypeScript for a smooth user experience.
- **Backend:** FastAPI for handling API requests and AI model processing.
- **AI Processing:** Hugging Face models, LangChain for AI workflows, and Groq for optimized AI inference.
- **Vector Database:** FAISS for fast and efficient similarity searches.
- **Hosting:** The frontend is deployed on Vercel.

**Note:** This project is built **only for educational purposes** related to Data Science and AI.

---

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

1. **Python (>= 3.10)**

   - Download and install Python from [python.org](https://www.python.org/downloads/).
   - Ensure Python is added to the system PATH during installation.
   - Verify installation by running:
     ```sh
     python --version
     ```

2. **Node.js & npm**

   - Download and install Node.js (which includes npm) from [nodejs.org](https://nodejs.org/).
   - Verify installation by running:
     ```sh
     node -v
     npm -v
     ```

3. **Visual Studio Code (VS Code)** _(Optional but Recommended)_
   - Download and install VS Code from [code.visualstudio.com](https://code.visualstudio.com/).

---

## Installation & Setup

### 1. Clone the Repository

```sh
# Open terminal or command prompt
mkdir chatbot-project && cd chatbot-project

# Clone the repository
git clone https://github.com/Tanmay2001Choudhary/Mental-Health-companion.git .
```

### 2. Setup Backend

```sh
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create necessary directories
mkdir models

# Run the backend server
uvicorn main:app --reload
```

- **Backend** runs at: `http://localhost:8000`

### 3. Setup Frontend

```sh
cd ../frontend

# Install dependencies
npm install

# Run the frontend application
npm run dev
```

- **Frontend** runs at: `http://localhost:3000`

---

## Running the Application

- Open a browser and go to `http://localhost:3000` to interact with the chatbot.
- The backend API can be accessed at `http://localhost:8000/docs` (Swagger UI).

---

## Contributing

This project is for learning purposes. If you find improvements or want to contribute, feel free to open an issue or submit a pull request.

Happy coding! 🚀
