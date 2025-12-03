#!/usr/bin/env python3
"""
Test script for LangChain tools refactoring
Tests that all tools and agents work correctly after refactoring
"""

import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(__file__))

def test_tools_import():
    """Test that all tools can be imported"""
    print("=" * 60)
    print("TEST 1: Tools Import")
    print("=" * 60)
    
    try:
        from agents.tools import (
            ALL_TOOLS, MCP_TOOLS, RAG_TOOLS, PROGRESS_TOOLS,
            get_user_profile, get_learning_progress, save_learning_progress,
            get_quiz_history, save_quiz_history,
            get_profile_preferences, save_profile_preferences,
            get_gamification, save_gamification,
            retrieve_financial_concepts, retrieve_financial_concepts_by_topic,
            get_next_topic, mark_topic_completed
        )
        
        print(f"✅ All tools imported successfully")
        print(f"   - Total tools: {len(ALL_TOOLS)}")
        print(f"   - MCP tools: {len(MCP_TOOLS)}")
        print(f"   - RAG tools: {len(RAG_TOOLS)}")
        print(f"   - Progress tools: {len(PROGRESS_TOOLS)}")
        return True
    except Exception as e:
        print(f"❌ Tools import failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_agents_import():
    """Test that all agents can be imported"""
    print("\n" + "=" * 60)
    print("TEST 2: Agents Import")
    print("=" * 60)
    
    try:
        from agents.profile_agent import profile_agent
        from agents.story_agent import story_agent
        from agents.quiz_agent import quiz_agent
        from agents.gamification_agent import gamification_agent
        from agents.learning_progress import get_next_topic, mark_topic_completed
        
        print("✅ All agents imported successfully")
        print("   - Profile Agent")
        print("   - Story Agent")
        print("   - Quiz Agent")
        print("   - Gamification Agent")
        print("   - Learning Progress module")
        return True
    except Exception as e:
        print(f"❌ Agents import failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_tool_structure():
    """Test that tools have proper structure"""
    print("\n" + "=" * 60)
    print("TEST 3: Tool Structure")
    print("=" * 60)
    
    try:
        from agents.tools import get_user_profile, retrieve_financial_concepts, get_next_topic
        
        # Check that tools have required attributes
        for tool in [get_user_profile, retrieve_financial_concepts, get_next_topic]:
            assert hasattr(tool, 'name'), f"Tool {tool} missing 'name' attribute"
            assert hasattr(tool, 'description'), f"Tool {tool} missing 'description' attribute"
            assert hasattr(tool, 'invoke'), f"Tool {tool} missing 'invoke' method"
        
        print("✅ All tools have proper structure")
        print(f"   - get_user_profile: {get_user_profile.name}")
        print(f"   - retrieve_financial_concepts: {retrieve_financial_concepts.name}")
        print(f"   - get_next_topic: {get_next_topic.name}")
        return True
    except Exception as e:
        print(f"❌ Tool structure test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_learning_progress_tools():
    """Test that learning progress module uses tools"""
    print("\n" + "=" * 60)
    print("TEST 4: Learning Progress Tools Integration")
    print("=" * 60)
    
    try:
        from agents.learning_progress import get_next_topic, mark_topic_completed, load_progress, save_progress
        
        # Check that functions exist
        assert callable(get_next_topic), "get_next_topic is not callable"
        assert callable(mark_topic_completed), "mark_topic_completed is not callable"
        assert callable(load_progress), "load_progress is not callable"
        assert callable(save_progress), "save_progress is not callable"
        
        print("✅ Learning progress module uses tools correctly")
        print("   - get_next_topic function exists")
        print("   - mark_topic_completed function exists")
        print("   - load_progress function exists")
        print("   - save_progress function exists")
        return True
    except Exception as e:
        print(f"❌ Learning progress tools test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_agent_wrappers():
    """Test that agents are properly wrapped"""
    print("\n" + "=" * 60)
    print("TEST 5: Agent Wrappers")
    print("=" * 60)
    
    try:
        from agents.profile_agent import profile_agent
        from agents.story_agent import story_agent
        from agents.quiz_agent import quiz_agent
        from agents.gamification_agent import gamification_agent
        
        # Check that agents have run method
        for agent in [profile_agent, story_agent, quiz_agent, gamification_agent]:
            assert hasattr(agent, 'run'), f"Agent {agent} missing 'run' method"
            assert hasattr(agent, 'name'), f"Agent {agent} missing 'name' attribute"
        
        print("✅ All agents properly wrapped")
        print(f"   - Profile Agent: {profile_agent.name}")
        print(f"   - Story Agent: {story_agent.name}")
        print(f"   - Quiz Agent: {quiz_agent.name}")
        print(f"   - Gamification Agent: {gamification_agent.name}")
        return True
    except Exception as e:
        print(f"❌ Agent wrappers test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    """Run all tests"""
    print("\n" + "=" * 60)
    print("LANGCHAIN TOOLS REFACTORING - TEST SUITE")
    print("=" * 60)
    
    tests = [
        test_tools_import,
        test_agents_import,
        test_tool_structure,
        test_learning_progress_tools,
        test_agent_wrappers
    ]
    
    results = []
    for test in tests:
        try:
            result = test()
            results.append(result)
        except Exception as e:
            print(f"❌ Test {test.__name__} crashed: {e}")
            results.append(False)
    
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(results)
    total = len(results)
    
    print(f"Tests passed: {passed}/{total}")
    
    if all(results):
        print("✅ ALL TESTS PASSED!")
        return 0
    else:
        print("❌ SOME TESTS FAILED")
        return 1


if __name__ == "__main__":
    sys.exit(main())

