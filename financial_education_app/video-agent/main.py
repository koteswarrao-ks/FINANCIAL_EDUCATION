#!/usr/bin/env python3
"""
Cartoon Video Agent - Generate cartoon videos from text stories for kids

Usage:
    python main.py --story "Your story here" --subject "theme"
    python main.py --example bunny_adventure
    python main.py --interactive
"""

import argparse
import os
import sys
from pathlib import Path

# Add src to path
sys.path.insert(0, str(Path(__file__).parent))

from src import CartoonVideoAgent
from src.config import AgentConfig, AzureConfig


def main():
    parser = argparse.ArgumentParser(
        description="Generate cartoon videos from text stories for kids",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Generate from a story
  python main.py --story "Once upon a time..." --subject "animals"
  
  # Use an example story
  python main.py --example bunny_adventure
  
  # Interactive mode
  python main.py --interactive
  
  # Custom configuration
  python main.py --example space_explorer --voice shimmer --quality hd
  
  # Use Azure OpenAI
  python main.py --example bunny_adventure --azure
        """
    )
    
    # Input options
    input_group = parser.add_mutually_exclusive_group()
    input_group.add_argument(
        "--story", "-s",
        type=str,
        help="The text story to convert to video"
    )
    input_group.add_argument(
        "--story-file", "-f",
        type=str,
        help="Path to a text file containing the story"
    )
    input_group.add_argument(
        "--example", "-e",
        type=str,
        choices=["bunny_adventure", "space_explorer", "kind_dragon"],
        help="Use a built-in example story"
    )
    input_group.add_argument(
        "--interactive", "-i",
        action="store_true",
        help="Interactive mode - enter story in the console"
    )
    
    # Story parameters
    parser.add_argument(
        "--subject", "-t",
        type=str,
        default="adventure",
        help="The interested subject/theme (e.g., 'animals', 'space', 'friendship')"
    )
    parser.add_argument(
        "--age", "-a",
        type=str,
        default="4-8",
        help="Target age range (e.g., '3-6', '4-8')"
    )
    parser.add_argument(
        "--title",
        type=str,
        help="Custom title for the video"
    )
    
    # Generation options
    parser.add_argument(
        "--voice", "-v",
        type=str,
        default="nova",
        choices=["alloy", "echo", "fable", "onyx", "nova", "shimmer"],
        help="Voice for narration (OpenAI TTS voices)"
    )
    parser.add_argument(
        "--quality",
        type=str,
        default="standard",
        choices=["standard", "hd"],
        help="Image quality (hd is slower but better)"
    )
    parser.add_argument(
        "--image-provider",
        type=str,
        choices=["azure", "openai", "replicate", "horde", "placeholder"],
        help="Provider for scene image generation"
    )
    parser.add_argument(
        "--character-provider",
        type=str,
        choices=["azure", "openai", "replicate", "horde", "placeholder"],
        help="Provider for character sprite generation"
    )
    parser.add_argument(
        "--audio-provider",
        type=str,
        choices=["azure", "openai", "elevenlabs", "gtts"],
        help="Provider for narration audio"
    )
    parser.add_argument(
        "--mode",
        type=str,
        choices=["continuous", "scenes"],
        default="continuous",
        help="Video pipeline mode: single full-story clip or scene-by-scene"
    )
    parser.add_argument(
        "--output-dir", "-o",
        type=str,
        default="output",
        help="Output directory for generated files"
    )
    parser.add_argument(
        "--quiet", "-q",
        action="store_true",
        help="Suppress progress output"
    )
    
    # Azure OpenAI options
    parser.add_argument(
        "--azure",
        action="store_true",
        help="Use Azure OpenAI instead of standard OpenAI"
    )
    parser.add_argument(
        "--azure-endpoint",
        type=str,
        default="https://oai.stg.azure.backbase.eu",
        help="Azure OpenAI endpoint URL"
    )
    parser.add_argument(
        "--azure-key",
        type=str,
        help="Azure OpenAI API key (or set AZURE_OPENAI_API_KEY env var)"
    )
    parser.add_argument(
        "--azure-chat-deployment",
        type=str,
        default="gpt-5",
        help="Azure deployment name for chat completion"
    )
    parser.add_argument(
        "--azure-dalle-deployment",
        type=str,
        default="dall-e-3",
        help="Azure deployment name for DALL-E"
    )
    parser.add_argument(
        "--azure-tts-deployment",
        type=str,
        default="tts",
        help="Azure deployment name for TTS"
    )
    
    args = parser.parse_args()
    
    # Initialize config with any custom settings
    azure_key = args.azure_key or os.getenv("AZURE_OPENAI_API_KEY", "")
    
    azure_config = AzureConfig(
        enabled=args.azure or bool(azure_key),
        endpoint=args.azure_endpoint,
        api_key=azure_key,
        chat_deployment=args.azure_chat_deployment,
        dalle_deployment=args.azure_dalle_deployment,
        tts_deployment=args.azure_tts_deployment
    )
    
    config = AgentConfig(azure=azure_config)
    config.audio.voice = args.voice
    config.image.quality = args.quality
    config.output_dir = args.output_dir
    
    # Set provider based on Azure availability
    if azure_config.enabled:
        config.image.provider = "azure"
        config.audio.provider = "azure"
    # Override providers from CLI if provided
    if args.image_provider:
        config.image.provider = args.image_provider
    if args.character_provider:
        config.character_image.provider = args.character_provider
    if args.audio_provider:
        config.audio.provider = args.audio_provider
    # Mode wiring
    config.pipeline_mode = args.mode
    if args.mode == "continuous":
        config.audio.narration_mode = "narrator"
    # If neither Azure nor OpenAI keys are present, default audio to gTTS (free)
    if not azure_config.enabled and not os.getenv("OPENAI_API_KEY"):
        config.audio.provider = "gtts"
    
    # Initialize agent
    agent = CartoonVideoAgent(config)
    
    # Get story text
    story = None
    subject = args.subject
    target_age = args.age
    
    if args.story:
        story = args.story
        
    elif args.story_file:
        with open(args.story_file, 'r') as f:
            story = f.read()
            
    elif args.example:
        examples = agent.get_example_stories()
        example_data = examples[args.example]
        story = example_data["story"]
        subject = example_data["subject"]
        target_age = example_data["target_age"]
        print(f"Using example story: {args.example}")
        print(f"Subject: {subject}")
        print(f"Target Age: {target_age}")
        
    elif args.interactive:
        print("\n🎬 Cartoon Video Agent - Interactive Mode")
        print("=" * 50)
        print("\nEnter your story (press Enter twice to finish):\n")
        
        lines = []
        empty_count = 0
        while True:
            line = input()
            if line == "":
                empty_count += 1
                if empty_count >= 2:
                    break
            else:
                empty_count = 0
                lines.append(line)
        
        story = "\n".join(lines)
        
        if not story.strip():
            print("Error: No story provided")
            sys.exit(1)
            
        subject = input("\nEnter the subject/theme (e.g., 'animals', 'space'): ").strip() or "adventure"
        target_age = input("Enter target age range (e.g., '4-8'): ").strip() or "4-8"
    
    else:
        parser.print_help()
        print("\nError: Please provide a story using --story, --story-file, --example, or --interactive")
        sys.exit(1)
    
    if not story or not story.strip():
        print("Error: Story cannot be empty")
        sys.exit(1)
    
    # Generate video
    result = agent.generate(
        story=story,
        subject=subject,
        target_age=target_age,
        custom_title=args.title,
        show_progress=not args.quiet
    )
    
    if result.success:
        print(f"\n✅ Success! Video saved to: {result.video_path}")
        return 0
    else:
        print(f"\n❌ Failed: {result.error_message}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
