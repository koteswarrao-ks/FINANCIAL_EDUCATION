#!/usr/bin/env python3
"""
Test script to run Profile Agent and Story Agent together
"""
import sys
import os
import json

# Add current directory to path
sys.path.insert(0, os.path.dirname(__file__))

from agents.profile_agent import profile_agent
from agents.story_agent import story_agent

def test_profile_and_story(child_id: str = "kid_001"):
    """Test profile agent and then story agent with the profile output"""
    
    print("=" * 70)
    print("TESTING PROFILE AGENT")
    print("=" * 70)
    
    # Step 1: Run Profile Agent
    try:
        profile_result = profile_agent.run({"child_id": child_id})
        print("\n✅ Profile Agent Output:")
        print(json.dumps(profile_result, indent=2))
    except Exception as e:
        print(f"\n❌ Profile Agent Error: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        return
    
    print("\n" + "=" * 70)
    print("TESTING STORY AGENT (using Profile output)")
    print("=" * 70)
    
    # Step 2: Run Story Agent with Profile output
    try:
        story_result = story_agent.run({"profile": profile_result})
        print("\n✅ Story Agent Output:")
        print(json.dumps(story_result, indent=2))
    except Exception as e:
        print(f"\n❌ Story Agent Error: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        return
    
    print("\n" + "=" * 70)
    print("✅ SUCCESS: Both agents completed successfully!")
    print("=" * 70)
    
    return {
        "profile": profile_result,
        "story": story_result
    }

if __name__ == "__main__":
    child_id = sys.argv[1] if len(sys.argv) > 1 else "kid_001"
    print(f"Testing with child_id: {child_id}\n")
    test_profile_and_story(child_id)



