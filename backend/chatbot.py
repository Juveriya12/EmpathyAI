import os
from langchain_groq import ChatGroq
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

def initialize_llm():
    llm = ChatGroq(
        temperature=0,
        groq_api_key=os.getenv("GROQ_API_KEY"),
        model_name="llama-3.3-70b-versatile"
    )
    return llm

def setup_qa_chain(vector_db, llm):
    retriever = vector_db.as_retriever()

    prompt_template = """You are an empathetic mental health chatbot. Answer carefully:
    {context}
    User: {question}
    Chatbot: """

    prompt = PromptTemplate(template=prompt_template, input_variables=['context', 'question'])

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs={"prompt": prompt}
    )

    return qa_chain
