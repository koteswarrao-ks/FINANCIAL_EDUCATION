# LangChain to Agno Migration Guide

## Overview

Migrating from LangChain to Agno framework for agents and tools.

## Changes Made

### 1. Tools Module
- **Created**: `agents/agno_tools.py` - Agno-based tools
- **Replaced**: `agents/tools.py` (LangChain tools)
- **Approach**: Each tool has an implementation function (`_impl`) and an Agno tool wrapper

### 2. Profile Agent
- **Status**: ✅ Migrated to Agno
- **Changes**:
  - Uses Agno tools instead of LangChain tools
  - Uses direct Azure OpenAI client (no LangChain)
  - Removed all LangChain imports

### 3. Remaining Agents (To Do)
- Story Agent
- Quiz Agent  
- Gamification Agent
- Learning Progress module

## Tool Usage Pattern

```python
from agents.agno_tools import get_user_profile

# Call Agno tool via entrypoint
data = get_user_profile.entrypoint(child_id="kid_001")
```

## Next Steps

1. Refactor Story Agent
2. Refactor Quiz Agent
3. Refactor Gamification Agent
4. Update Learning Progress module
5. Remove LangChain from requirements.txt
6. Test all agents

