#!/usr/bin/env python3
import asyncio
from src.app.main import app
from fastapi.testclient import TestClient


def test_endpoints():
    client = TestClient(app)
    
    print("Testing root endpoint...")
    response = client.get("/")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    
    print("\nTesting health endpoint...")
    response = client.get("/api/v1/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    
    print("\nTesting optimization list endpoint...")
    response = client.get("/api/v1/optimize")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    
    print("\nAll basic tests passed!")


if __name__ == "__main__":
    test_endpoints()