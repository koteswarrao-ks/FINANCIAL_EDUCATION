#!/usr/bin/env python3
"""
Test script to verify MCP server connection and run demo
"""
import requests
import json
import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(__file__))

def test_mcp_server():
    """Test if MCP server is running"""
    try:
        resp = requests.get("http://localhost:5001/health", timeout=2)
        if resp.status_code == 200:
            print("✓ MCP Server is running")
            return True
    except requests.exceptions.RequestException:
        print("✗ MCP Server is NOT running on port 5001")
        print("  Please start it with: cd mcp_server && python3 -m uvicorn mcp_server:app --port 5001")
        return False

def test_user_data():
    """Test fetching user data"""
    try:
        resp = requests.get("http://localhost:5001/user_profile/kid_001", timeout=2)
        if resp.status_code == 200:
            data = resp.json()
            print(f"✓ User data fetched: {data.get('basicProfile', {}).get('name', 'Unknown')}")
            return True
        else:
            print(f"✗ User not found: {resp.status_code}")
            return False
    except Exception as e:
        print(f"✗ Error fetching user data: {e}")
        return False

def run_demo():
    """Run the actual demo"""
    print("\n" + "="*60)
    print("Running Profile Agent Demo")
    print("="*60 + "\n")
    
    from agents.profile_agent import profile_agent_fn
    
    result = profile_agent_fn("kid_001")
    
    print("\n" + "="*60)
    print("RESULT:")
    print("="*60)
    print(json.dumps(result, indent=2))
    print("="*60)
    
    return result

if __name__ == "__main__":
    print("Financial Education App - Demo Test")
    print("="*60)
    
    # Test MCP server
    if not test_mcp_server():
        sys.exit(1)
    
    # Test user data
    if not test_user_data():
        sys.exit(1)
    
    # Run demo
    run_demo()





