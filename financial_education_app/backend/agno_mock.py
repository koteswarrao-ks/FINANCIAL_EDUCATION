"""
Simple mock implementation of agno for demo purposes.
"""
import inspect
from typing import get_origin

class Agent:
    """Mock Agent class"""
    def __init__(self, func, name=None):
        self.func = func
        self.name = name or "Agent"
        # Inspect function signature to determine how to call it
        sig = inspect.signature(func)
        params = list(sig.parameters.values())
        if params:
            self.first_param_name = params[0].name
            self.first_param_annotation = params[0].annotation
        else:
            self.first_param_name = None
            self.first_param_annotation = None
    
    def run(self, input_data):
        """Run the agent function"""
        if self.first_param_name is None:
            return self.func()
        
        # If parameter name is "input", pass full dict
        if self.first_param_name == "input":
            return self.func(input_data)
        
        # Check if annotation is Dict type
        if self.first_param_annotation != inspect.Parameter.empty:
            origin = get_origin(self.first_param_annotation)
            if origin is dict or self.first_param_annotation is dict:
                # Function expects a dict, pass the full input_data
                return self.func(input_data)
        
        # Default: if input is dict and param is "child_id", extract it
        if isinstance(input_data, dict):
            if self.first_param_name == "child_id":
                return self.func(input_data.get("child_id"))
            # Otherwise try to get by parameter name, or pass full dict
            return self.func(input_data.get(self.first_param_name, input_data))
        
        return self.func(input_data)

class Runner:
    """Mock Runner class"""
    def __init__(self, agents=None):
        self.agents = agents or []
    
    def run(self, input_data):
        """Run all agents in sequence"""
        result = {}
        for agent in self.agents:
            agent_result = agent.run(input_data)
            result[agent.name] = agent_result
        return result



