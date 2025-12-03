"""
Story Parser - Breaks down stories into scenes with visual descriptions
"""

import json
import httpx
from dataclasses import dataclass, field
from typing import List, Optional

from .config import AgentConfig
from .ai_model import PerplexityClient


@dataclass
class Character:
    """Represents a character in the story"""
    name: str
    description: str
    visual_traits: str  # Consistent visual description for image generation


@dataclass
class Scene:
    """Represents a single scene in the story"""
    scene_number: int
    narration: str  # Text to be narrated
    visual_description: str  # Description for image generation
    characters_present: List[str]  # Names of characters in this scene
    setting: str  # Location/background description
    mood: str  # Emotional tone (happy, exciting, calm, etc.)
    duration_hint: float = 5.0  # Suggested duration in seconds
    # Optional per-character dialogue lines (speaker + text)
    dialogues: Optional[List["DialogueLine"]] = None


@dataclass 
class ParsedStory:
    """Complete parsed story structure"""
    title: str
    subject: str
    target_age: str
    characters: List[Character]
    scenes: List[Scene]
    moral: Optional[str] = None


@dataclass
class DialogueLine:
    """Represents a single line of dialogue spoken by a character"""
    speaker: str
    text: str


class StoryParser:
    """
    Parses text stories into structured scenes suitable for video generation.
    Uses GPT-4 to intelligently break down stories and create visual descriptions.
    """
    
    SCENE_PARSING_PROMPT = """You are an expert children's story analyst and visual storyteller. 
Your task is to break down a story into distinct visual scenes that can be illustrated for a cartoon video.

For each scene, you must provide:
1. A clear narration (the text that will be spoken)
2. A detailed visual description for generating a cartoon image
3. Character descriptions that maintain consistency
4. Setting and mood information

IMPORTANT GUIDELINES:
- Create 4-8 scenes maximum for a short story
- Each scene should represent a distinct visual moment
- Visual descriptions should be detailed but child-appropriate
- Maintain consistent character appearances across all scenes
- Use vivid, colorful, and engaging descriptions suitable for children
- The visual style should be: {cartoon_style}
- The interested subject/theme is: {subject}

Respond in the following JSON format:
{{
    "title": "Story Title",
    "target_age": "age range like 4-8",
    "characters": [
        {{
            "name": "Character Name",
            "description": "Brief character description",
            "visual_traits": "Detailed visual appearance for consistent image generation"
        }}
    ],
    "scenes": [
        {{
            "scene_number": 1,
            "narration": "The text to be narrated for this scene",
            "visual_description": "Detailed description for generating the cartoon image",
            "characters_present": ["Character Name"],
            "setting": "Where the scene takes place",
            "mood": "emotional tone",
            "duration_hint": 5.0
        }}
    ],
    "moral": "The lesson or moral of the story (if applicable)"
}}"""

    def __init__(self, config: AgentConfig):
        self.config = config
        
    def _call_azure_chat(self, messages: list) -> str:
        """Call Azure OpenAI chat completion API"""
        url = f"{self.config.azure.endpoint}/openai/deployments/{self.config.azure.chat_deployment}/chat/completions?api-version={self.config.azure.api_version}"
        
        headers = {
            "Content-Type": "application/json",
            "Api-Key": self.config.azure.api_key
        }
        
        # Minimal, compatible payload for Azure gpt-5
        payload = {
            "messages": messages,
            "max_completion_tokens": 800,
            "stream": False
        }
        
        response = httpx.post(url, headers=headers, json=payload, timeout=120.0)
        
        # Get detailed error if failed
        if response.status_code != 200:
            print(f"Azure API Error: {response.status_code}")
            print(f"Response: {response.text}")
            response.raise_for_status()
        
        result = response.json()
        return result["choices"][0]["message"]["content"]
    
    def _call_perplexity_chat(self, messages: list) -> str:
        """Call Perplexity chat completion API"""
        client = PerplexityClient()
        # Request concise JSON response
        system_boost = {
            "role": "system",
            "content": "Respond ONLY with a single JSON object. No prose, no markdown."
        }
        msgs = [system_boost] + messages
        result = client.chat_completion(
            messages=msgs,
            model="mistral-7b-instruct",
            max_tokens=900,
            temperature=0.3,
        )
        # Handle both non-streaming dict and (defensive) streaming generator
        if isinstance(result, dict):
            return result["choices"][0]["message"]["content"]
        try:
            # Collect streamed lines
            chunks = []
            for line in result:
                if not line:
                    continue
                chunks.append(line if isinstance(line, str) else line.decode("utf-8", errors="ignore"))
            data = "\n".join(chunks)
            start = data.find("{")
            end = data.rfind("}")
            if start != -1 and end != -1 and end > start:
                parsed = json.loads(data[start:end+1])
                return parsed["choices"][0]["message"]["content"]
        except Exception:
            pass
        raise RuntimeError("Perplexity returned an unexpected response format.")
    
    def _call_openai_chat(self, messages: list) -> str:
        """Call standard OpenAI chat completion API"""
        from openai import OpenAI
        client = OpenAI(api_key=self.config.openai_api_key)
        
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            response_format={"type": "json_object"},
            temperature=0.7,
            max_tokens=4000
        )
        
        return response.choices[0].message.content
        
    def parse_story(self, story_text: str, subject: str, target_age: str = "4-8") -> ParsedStory:
        """
        Parse a story into structured scenes.
        
        Args:
            story_text: The full text of the story
            subject: The interested subject/theme (e.g., "dinosaurs", "space", "animals")
            target_age: Target age range for the audience
            
        Returns:
            ParsedStory object with all scenes and characters
        """
        # Continuous mode: single scene, no LLM required
        if getattr(self.config, "pipeline_mode", "continuous") == "continuous":
            scene = Scene(
                scene_number=1,
                narration=story_text.strip(),
                visual_description=story_text.strip()[:180],
                characters_present=["Penny", "Grandpa"] if "grandpa" in story_text.lower() else ["Penny"],
                setting="illustrated full-scene background",
                mood="happy",
                duration_hint=max(12.0, min(180.0, len(story_text.split()) / 2.5))  # ~2.5 wps
            )
            characters = [
                Character(
                    name="Penny",
                    description="A curious and determined girl who wants a Mega-Glitter Space Helmet",
                    visual_traits="young girl with ponytail, cheerful expression, colorful hoodie, jeans, star stickers"
                )
            ]
            if "grandpa" in story_text.lower():
                characters.append(Character(
                    name="Grandpa",
                    description="Warm and wise grandpa who teaches about saving and interest",
                    visual_traits="kind elderly man with glasses, cardigan sweater, gentle smile"
                ))
            return ParsedStory(
                title=(story_text.strip().splitlines()[0][:60] or "Untitled Story"),
                subject=subject,
                target_age=target_age,
                characters=characters,
                scenes=[scene],
                moral=None
            )

        system_prompt = self.SCENE_PARSING_PROMPT.format(
            cartoon_style=self.config.image.cartoon_style,
            subject=subject
        )
        
        user_prompt = f"""Please analyze and break down the following children's story into scenes.
        
Target Age: {target_age}
Interested Subject/Theme: {subject}

STORY:
{story_text}

Remember to:
- Create distinct visual scenes that flow naturally
- Make the visual descriptions vivid and cartoon-appropriate
- Keep character appearances consistent
- Incorporate the subject theme where natural
- Make it engaging and educational for children aged {target_age}"""

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
        
        # Prefer Perplexity; fallback to Azure if enabled; otherwise local heuristic
        try:
            content = self._call_perplexity_chat(messages)
        except Exception:
            try:
                if self.config.azure.enabled:
                    content = self._call_azure_chat(messages)
                else:
                    raise
            except Exception:
                return self._local_fallback_parse(story_text, subject, target_age)
        
        result = json.loads(content)
        # Defensive parsing: sometimes providers prepend prose; attempt to coerce JSON
        if not isinstance(result, dict):
            try:
                start = content.find("{")
                end = content.rfind("}")
                if start != -1 and end != -1 and end > start:
                    result = json.loads(content[start:end+1])
            except Exception:
                raise
        
        # Convert to dataclass objects
        characters = [
            Character(
                name=char["name"],
                description=char["description"],
                visual_traits=char["visual_traits"]
            )
            for char in result.get("characters", [])
        ]
        
        scenes = [
            Scene(
                scene_number=scene["scene_number"],
                narration=scene["narration"],
                visual_description=scene["visual_description"],
                characters_present=scene.get("characters_present", []),
                setting=scene.get("setting", ""),
                mood=scene.get("mood", "happy"),
                duration_hint=scene.get("duration_hint", 5.0)
            )
            for scene in result.get("scenes", [])
        ]
        
        # Limit scenes if needed
        if len(scenes) > self.config.max_scenes:
            scenes = scenes[:self.config.max_scenes]

        # If no characters were returned, infer defaults from story text
        if not characters:
            inferred: List[Character] = []
            # Always add Penny
            inferred.append(Character(
                name="Penny",
                description="A curious and determined girl who wants a Mega-Glitter Space Helmet",
                visual_traits="young girl with ponytail, cheerful expression, colorful hoodie, jeans, star stickers"
            ))
            # Add Grandpa if mentioned
            if "grandpa" in story_text.lower():
                inferred.append(Character(
                    name="Grandpa",
                    description="Warm and wise grandpa who teaches about saving and interest",
                    visual_traits="kind elderly man with glasses, cardigan sweater, gentle smile"
                ))
            characters = inferred
            # Populate characters_present per scene based on mentions
            for i, sc in enumerate(scenes):
                present = set()
                text_l = sc.narration.lower()
                if "penny" in text_l:
                    present.add("Penny")
                if "grandpa" in text_l:
                    present.add("Grandpa")
                # Ensure at least Penny is present
                if not present:
                    present.add("Penny")
                scenes[i].characters_present = list(present)

        return ParsedStory(
            title=result.get("title", "Untitled Story"),
            subject=subject,
            target_age=target_age,
            characters=characters,
            scenes=scenes,
            moral=result.get("moral")
        )
    
    def enhance_visual_description(self, scene: Scene, characters: List[Character], subject: str) -> str:
        """
        Enhance a scene's visual description with character details and style specifications.
        This creates the final prompt for image generation.
        """
        # Find characters in this scene
        scene_characters = [
            char for char in characters 
            if char.name in scene.characters_present
        ]
        
        # Build character descriptions
        char_descriptions = ", ".join([
            f"{char.name} ({char.visual_traits})"
            for char in scene_characters
        ]) if scene_characters else "no specific characters"
        
        enhanced_prompt = f"""Children's cartoon illustration, {self.config.image.cartoon_style}

Scene: {scene.visual_description}

Setting: {scene.setting}
Mood: {scene.mood}
Characters: {char_descriptions}
Theme: {subject}

Style: Pixar/Disney-inspired, vibrant colors, soft lighting, child-friendly, wholesome, 
detailed background, expressive characters, professional children's book illustration quality."""

        return enhanced_prompt
    
    def get_scene_summary(self, parsed_story: ParsedStory) -> str:
        """Generate a human-readable summary of the parsed story."""
        summary = f"""
📖 Story: {parsed_story.title}
🎯 Subject: {parsed_story.subject}
👶 Target Age: {parsed_story.target_age}

👥 Characters ({len(parsed_story.characters)}):
"""
        for char in parsed_story.characters:
            summary += f"   • {char.name}: {char.description}\n"
        
        summary += f"\n🎬 Scenes ({len(parsed_story.scenes)}):\n"
        for scene in parsed_story.scenes:
            summary += f"   {scene.scene_number}. [{scene.mood}] {scene.setting}\n"
            summary += f"      \"{scene.narration[:50]}...\"\n"
        
        if parsed_story.moral:
            summary += f"\n💡 Moral: {parsed_story.moral}"
        
        return summary

    def _local_fallback_parse(self, story_text: str, subject: str, target_age: str) -> ParsedStory:
        paragraphs = [p.strip() for p in story_text.split("\n\n") if p.strip()]
        scenes: List[Scene] = []
        for idx, p in enumerate(paragraphs, start=1):
            scenes.append(Scene(
                scene_number=idx,
                narration=p,
                visual_description=(p[:180] + ("..." if len(p) > 180 else "")),
                characters_present=[],
                setting="illustrated scene",
                mood="happy",
                duration_hint=5.0
            ))
        if not scenes:
            scenes = [Scene(
                scene_number=1,
                narration=story_text.strip()[:300],
                visual_description=story_text.strip()[:180],
                characters_present=[],
                setting="illustrated scene",
                mood="happy",
                duration_hint=5.0
            )]
        title = (story_text.strip().split("\n", 1)[0] or "Story").strip()[:60]
        return ParsedStory(
            title=title or "Untitled Story",
            subject=subject,
            target_age=target_age,
            characters=[],
            scenes=scenes[: self.config.max_scenes],
            moral=None
        )

    def generate_dialogues_for_scene(self, scene: Scene, all_characters: List[Character]) -> List[DialogueLine]:
        """
        Convert a scene's narration into a short, child-friendly dialogue between present characters.
        """
        # Build a system prompt guiding brief, alternating dialogue
        system_prompt = (
            "You are an expert children's dialogue writer. "
            "Rewrite the provided narration as a brief, age-appropriate dialogue between the listed characters. "
            "Keep each line short (max 12 words), warm, and easy to understand. "
            "Use only the characters present in the scene. Return strict JSON with array 'dialogues' of {speaker, text}."
        )
        present = [c for c in all_characters if c.name in scene.characters_present]
        character_list = ", ".join([f"{c.name}: {c.description}" for c in present]) or "Narrator"
        user_prompt = f"""
Characters in this scene:
{character_list}

Narration:
{scene.narration}

Return JSON:
{{
  "dialogues": [
    {{"speaker": "Name", "text": "Line"}}
  ]
}}
"""
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
        # Prefer Perplexity for dialogue; fallback local
        try:
            content = self._call_perplexity_chat(messages)
        except Exception:
            # Local simple fallback: split narration into 2 alternating speakers
            speakers = [c.name for c in present] or ["Narrator", "Friend"]
            # Split into sentences by punctuation, keep all sentences
            tmp = scene.narration.replace("!", ".").replace("?", ".")
            parts = [p.strip() for p in tmp.split(".") if p.strip()]
            lines = []
            for i, part in enumerate(parts, start=0):
                lines.append({"speaker": speakers[i % len(speakers)], "text": part})
            content = json.dumps({"dialogues": lines or [{"speaker": "Narrator", "text": scene.narration[:80]}]})
        try:
            payload = json.loads(content)
            lines = payload.get("dialogues", [])
            dialogues = [
                DialogueLine(speaker=l.get("speaker", "Narrator"), text=l.get("text", "").strip())
                for l in lines if l.get("text")
            ]
            # fallback minimal dialogue if empty
            if not dialogues:
                dialogues = [DialogueLine(speaker=present[0].name if present else "Narrator", text=scene.narration)]
            return dialogues
        except Exception:
            # fallback to single speaker
            return [DialogueLine(speaker=present[0].name if present else "Narrator", text=scene.narration)]

    def generate_dialogues_for_story(self, parsed_story: ParsedStory) -> ParsedStory:
        """
        Populate dialogues for each scene in the story (in-place) and return the story.
        """
        for i, sc in enumerate(parsed_story.scenes):
            if not sc.dialogues:
                parsed_story.scenes[i].dialogues = self.generate_dialogues_for_scene(sc, parsed_story.characters)
        return parsed_story
