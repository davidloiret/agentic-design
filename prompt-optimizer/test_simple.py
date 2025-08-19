#!/usr/bin/env python3
from fastapi import FastAPI
from fastapi.testclient import TestClient


app = FastAPI(title="Simple Test", version="0.1.0")


@app.get("/")
async def root():
    return {"message": "Simple test service", "status": "running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


def test_simple():
    client = TestClient(app)
    
    print("Testing simple service...")
    response = client.get("/")
    print(f"Root - Status: {response.status_code}, Response: {response.json()}")
    
    response = client.get("/health") 
    print(f"Health - Status: {response.status_code}, Response: {response.json()}")
    
    print("Simple tests passed!")


if __name__ == "__main__":
    test_simple()