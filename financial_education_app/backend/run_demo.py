import sys
import os

# Use agno_mock Runner (agno 2.3.2 doesn't have Runner in the same way)
# The mock provides a simple Runner interface that works with our agents
sys.path.insert(0, os.path.dirname(__file__))
from agno_mock import Runner

from agents.orchestration_agent import orchestration_agent

if __name__ == "__main__":
    print("Starting Financial Education Demo...")
    print("=" * 50)
    
    runner = Runner(agents=[orchestration_agent])
    result = runner.run({"child_id": "kid_001"})
    
    print("\nPersonalized Profile Output:")
    print("=" * 50)
    import json
    print(json.dumps(result, indent=2))
