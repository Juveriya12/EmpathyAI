import os
import faiss
import pickle
from langchain_community.vectorstores import FAISS # type: ignore
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from datasets import load_dataset
from langchain.schema import Document

DB_PATH = "models/faiss_index"

def load_and_process_dataset():
    dataset = load_dataset("fadodr/mental_health_therapy")

    documents = []
    for example in dataset["train"]:  
        instruction = example["instruction"]
        user_input = example["input"]
        response = example["output"]

        text = f"Instruction: {instruction}\nUser: {user_input}\nTherapist: {response}"
        doc = Document(page_content=text, metadata={"source": "dataset"})
        documents.append(doc)

    return documents

def get_vector_db():
    print("📌 Initializing embeddings...")
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2", model_kwargs={'device': 'cpu'})

    if not os.path.exists(DB_PATH):
        print("DB_PATH Not Found")
        os.makedirs(DB_PATH)

        dataset_documents = load_and_process_dataset()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        split_documents = text_splitter.split_documents(dataset_documents)

        print("Creating FAISS index from documents...")
        vector_db = FAISS.from_documents(split_documents, embeddings)

        faiss.write_index(vector_db.index, os.path.join(DB_PATH, "faiss.index"))

        # Save metadata
        with open(os.path.join(DB_PATH, "faiss_store.pkl"), "wb") as f:
            pickle.dump(vector_db, f)

        print("FAISS index created!")
    else:
        print("Loading existing FAISS index...")

        index = faiss.read_index(os.path.join(DB_PATH, "faiss.index"))

        with open(os.path.join(DB_PATH, "faiss_store.pkl"), "rb") as f:
            vector_db = pickle.load(f)
            vector_db.index = index

        print("FAISS index Loaded!")

    return vector_db
