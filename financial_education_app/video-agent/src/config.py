"""
Configuration settings for the Cartoon Video Agent
"""

import os
from dataclasses import dataclass, field
from typing import Optional
from dotenv import load_dotenv

load_dotenv()


@dataclass
class AzureConfig:
    """Configuration for Azure OpenAI"""
    enabled: bool = True
    endpoint: str = "https://oai.stg.azure.backbase.eu"
    api_key: str = field(default_factory=lambda: os.getenv("AZURE_OPENAI_API_KEY", ""))
    api_version: str = "2024-12-01-preview"
    # Deployment names
    chat_deployment: str = "gpt-5"  # For story parsing
    dalle_deployment: str = "dall-e-3"  # For image generation
    tts_deployment: str = "tts"  # For text-to-speech


@dataclass
class ImageConfig:
    """Configuration for image generation"""
    # Providers: "pollinations" (free), "azure", "openai", "replicate", "horde", "placeholder"
    provider: str = "pollinations"  # Default to free Pollinations.ai
    model: str = "dall-e-3"
    size: str = "1024x1024"
    quality: str = "standard"
    style: str = "vivid"  # "vivid" or "natural" for DALL-E 3
    cartoon_style: str = "colorful cartoon illustration, child-friendly, vibrant colors, soft edges, cute characters"

@dataclass
class CharacterImageConfig:
    """Configuration for per-character sprite generation"""
    provider: str = "placeholder"  # "azure" | "openai" | "replicate" | "placeholder"
    size: str = "768x768"
    style_hint: str = "full-body, cute cartoon character, vibrant colors, soft outlines, sticker, simple background, centered, facing camera"
    transparent_background: bool = True  # if provider cannot do transparency, we will remove white
    remove_white_threshold: int = 240    # RGB threshold for white-to-transparent fallback


@dataclass
class AudioConfig:
    """Configuration for audio/narration generation"""
    provider: str = "azure"  # "azure", "openai" or "elevenlabs"
    voice: str = "nova"  # OpenAI voices: alloy, echo, fable, onyx, nova, shimmer
    model: str = "tts-1"  # "tts-1" or "tts-1-hd"
    speed: float = 0.9  # Slightly slower for kids
    # Narration mode: "narrator" (single voice) or "characters" (multi-voice dialogue)
    narration_mode: str = "characters"
    # Optional default voices per character name (exact match, case-insensitive keys recommended)
    character_voices: dict = field(default_factory=lambda: {
        # Example defaults; will auto-assign if not present
        "narrator": "nova",
        "male_default": "onyx",
        "female_default": "nova",
        "neutral_default": "shimmer",
    })


@dataclass
class VideoConfig:
    """Configuration for video composition"""
    fps: int = 24
    resolution: tuple = (1920, 1080)
    transition_duration: float = 1.0  # seconds
    min_scene_duration: float = 5.0  # minimum seconds per scene
    background_music_volume: float = 0.1
    narration_volume: float = 1.0
    output_format: str = "mp4"
    codec: str = "libx264"
    narrator_sprite_path: str = "assets/narrator.png"
    show_narrator_sprite: bool = True
    custom_background_path: str = "assets/background.png"
    show_story_text: bool = True  # Display story text as subtitles


@dataclass
class AgentConfig:
    """Main configuration for the Cartoon Video Agent"""
    # API Keys (loaded from environment)
    openai_api_key: str = field(default_factory=lambda: os.getenv("OPENAI_API_KEY", ""))
    replicate_api_key: str = field(default_factory=lambda: os.getenv("REPLICATE_API_TOKEN", ""))
    elevenlabs_api_key: str = field(default_factory=lambda: os.getenv("ELEVENLABS_API_KEY", ""))
    
    # Azure configuration
    azure: AzureConfig = field(default_factory=AzureConfig)
    
    # Sub-configurations
    image: ImageConfig = field(default_factory=ImageConfig)
    character_image: CharacterImageConfig = field(default_factory=CharacterImageConfig)
    audio: AudioConfig = field(default_factory=AudioConfig)
    video: VideoConfig = field(default_factory=VideoConfig)
    # Pipeline mode: "continuous" (single full-story clip) or "scenes"
    pipeline_mode: str = "continuous"
    
    # Output settings
    output_dir: str = "output"
    temp_dir: str = ".temp"
    
    # Processing settings
    max_scenes: int = 10
    max_concurrent_generations: int = 3
    
    def validate(self) -> bool:
        """Validate that required API keys are present"""
        # If using Azure anywhere, require its key
        if self.azure.enabled and not self.azure.api_key:
            raise ValueError("AZURE_OPENAI_API_KEY environment variable is required")
        # If not using Azure and not using OpenAI providers, don't require OPENAI_API_KEY
        uses_openai_images = self.image.provider == "openai" or self.character_image.provider == "openai"
        uses_openai_audio = self.audio.provider == "openai"
        if (uses_openai_images or uses_openai_audio) and not self.openai_api_key:
            raise ValueError("OPENAI_API_KEY environment variable is required")
        return True


# Default configuration instance
default_config = AgentConfig()
