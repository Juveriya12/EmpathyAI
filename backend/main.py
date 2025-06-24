import os
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from chatbot import initialize_llm, setup_qa_chain
from vector_db import get_vector_db
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load LLM and Vector DB
llm = initialize_llm()
vector_db = get_vector_db()
qa_chain = setup_qa_chain(vector_db, llm)

class QueryRequest(BaseModel):
    query: str

@app.post("/chat")
async def chat(request: QueryRequest):
    response = qa_chain.run(request.query)
    return {"response": response if response else "I didn't understand that."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
