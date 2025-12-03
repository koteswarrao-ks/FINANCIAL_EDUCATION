#!/usr/bin/env python3
"""
Example usage of the Cartoon Video Agent

This script demonstrates how to use the agent programmatically
to generate cartoon videos from stories.
"""

import os
import sys
from pathlib import Path

# Ensure we can import from src
sys.path.insert(0, str(Path(__file__).parent))

from src import CartoonVideoAgent
from src.config import AgentConfig


def example_basic_usage():
    """Generate motion-animated cartoon video with Buddy the Panda and Sneha."""
    print("=" * 60)
    print("🎬 Buddy the Panda & The Magic Budget Plan")
    print("   Characters: Buddy (cute panda), Sneha (young Indian girl)")
    print("=" * 60)
    
    # Initialize the agent
    agent = CartoonVideoAgent()
    
    # Full story with character descriptions for animation
    # Characters:
    # - Buddy the Panda: A cute, friendly, smiling panda bear with soft fur
    # - Sneha: A young Indian girl with long black hair and bright eyes
    story = """
Buddy the Panda & The Magic Budget Plan

SCENE 1: THE PROBLEM
Sneha, a young Indian girl with long black hair and bright curious eyes, loved buying sketchbooks, glitter pens, and her favourite chocolate bars from the local shop. But every month, her pocket money disappeared too quickly! She looked sadly at her empty piggy bank.

SCENE 2: BUDDY APPEARS  
One sunny afternoon, a magical thing happened! Buddy the Panda, a cute smiling panda bear with soft black and white fur, appeared in Sneha's room with a big friendly smile. "Hello Sneha! I see you need help with your money. Let's fix this together!" said Buddy cheerfully.

SCENE 3: THE MAGIC JARS
Buddy showed Sneha his Magic Budget Plan with three colourful glass jars that sparkled in the sunlight:
"This RED jar is your Spend Jar - for things you want now!"
"This BLUE jar is your Save Jar - for bigger dreams!"  
"This YELLOW jar is your Share Jar - to help others!"
Sneha's eyes grew wide with excitement as she looked at the beautiful jars.

SCENE 4: LEARNING TO BUDGET
Sneha began putting part of her pocket money into each jar every week. She wrote down every rupee she spent in a little notebook - no more guessing! Buddy watched proudly as Sneha noticed how small impulse buys added up. "See? Every rupee counts!" smiled Buddy.

SCENE 5: THE SAVE JAR GROWS
Weeks passed, and something wonderful happened. Sneha's blue Save Jar grew heavier and heavier! She could hear the coins jingling inside. Buddy did a happy dance. "You're doing amazing, Sneha!" he cheered.

SCENE 6: DREAMS COME TRUE
Finally, Sneha proudly reached her goal - she bought the beautiful watercolour painting set she had always dreamed of! The colours were so bright and beautiful. She even used her yellow Share Jar to donate yummy biscuits to the nearby animal shelter. The puppies wagged their tails happily!

SCENE 7: THE LESSON
Sneha hugged Buddy tight. "Thank you, Buddy! I learned that budgeting isn't about saying 'no' - it's about planning 'yes' for the things that really matter!" 
Buddy smiled warmly. "And remember, smart money choices, one jar at a time!"
They waved goodbye as Sneha continued her journey of making wise choices with her money.

THE END
    """
    
    # Generate the video with narrator voiceover
    result = agent.generate(
        story=story,
        subject="Buddy the Panda (cute smiling panda bear) and Sneha (young Indian girl) - financial education",
        target_age="6-10",
        custom_title="Buddy the Panda & The Magic Budget Plan"
    )
    
    if result.success:
        print(f"\n✅ Video created successfully!")
        print(f"   Video: {result.video_path}")
        print(f"   Preview: {result.preview_gif_path}")
        print(f"   Generation time: {result.generation_time_seconds:.1f}s")
    else:
        print(f"\n❌ Failed: {result.error_message}")
    
    return result


def example_with_custom_config():
    """Example with custom configuration settings."""
    print("\n" + "=" * 60)
    print("Example 2: Custom Configuration")
    print("=" * 60)
    
    from src.config import ImageConfig, AudioConfig, VideoConfig
    
    # Create custom configuration
    config = AgentConfig(
        image=ImageConfig(
            quality="hd",  # Higher quality images
            style="vivid"  # More vibrant colors
        ),
        audio=AudioConfig(
            voice="shimmer",  # Bright, energetic voice
            speed=0.85,  # Slightly slower for younger children
            model="tts-1-hd"  # Higher quality audio
        ),
        video=VideoConfig(
            fps=30,
            resolution=(1920, 1080),
            transition_duration=1.5,  # Longer transitions
            min_scene_duration=6.0  # Each scene at least 6 seconds
        ),
        output_dir="output/custom_videos"
    )
    
    agent = CartoonVideoAgent(config)
    
    story = """
    In a magical garden lived a tiny fairy named Sparkle.
    Sparkle had beautiful wings that shimmered like rainbows.
    
    One morning, Sparkle found that all the flowers were sad.
    "Why are you sad?" Sparkle asked the flowers gently.
    
    "We haven't had any sunshine for days," said a little daisy.
    
    Sparkle flew up high into the sky, above the gray clouds.
    There, Sparkle found the sun hiding behind a big fluffy cloud.
    
    "Dear Sun, please come out! The flowers miss you!" said Sparkle.
    
    The sun smiled warmly and said, "I didn't know they missed me!"
    The sun came out, and all the flowers bloomed happily.
    
    The flowers thanked Sparkle for being such a good friend.
    """
    
    result = agent.generate(
        story=story,
        subject="fairies and magic",
        target_age="3-6"
    )
    
    return result


def example_built_in_stories():
    """Example using built-in stories."""
    print("\n" + "=" * 60)
    print("Example 3: Built-in Stories")
    print("=" * 60)
    
    agent = CartoonVideoAgent()
    
    # Get available example stories
    examples = agent.get_example_stories()
    
    print("\nAvailable built-in stories:")
    for name, data in examples.items():
        print(f"  • {name}: {data['subject']} (ages {data['target_age']})")
    
    # Use one of the built-in stories
    example_name = "bunny_adventure"
    example_data = examples[example_name]
    
    print(f"\nGenerating video for: {example_name}")
    
    result = agent.generate(
        story=example_data["story"],
        subject=example_data["subject"],
        target_age=example_data["target_age"]
    )
    
    return result


def example_silent_generation():
    """Example without progress output (for integration into other apps)."""
    print("\n" + "=" * 60)
    print("Example 4: Silent Generation")
    print("=" * 60)
    
    agent = CartoonVideoAgent()
    
    story = """
    A little penguin named Pip lived in the snowy Antarctic.
    Pip was different - Pip loved warm colors and sunny dreams.
    
    One day, Pip painted a beautiful sunset on the ice.
    All the other penguins came to see the amazing artwork.
    
    "Wow, Pip! This is beautiful!" they all cheered.
    Pip learned that being different is what makes us special.
    """
    
    # Generate without progress bars (useful for web apps, APIs, etc.)
    result = agent.generate(
        story=story,
        subject="penguins and art",
        target_age="4-8",
        show_progress=False  # Silent mode
    )
    
    if result.success:
        print(f"✅ Video generated: {result.video_path}")
    else:
        print(f"❌ Error: {result.error_message}")
    
    return result


async def example_async_generation():
    """Example using async API for integration with async applications."""
    print("\n" + "=" * 60)
    print("Example 5: Async Generation")
    print("=" * 60)
    
    agent = CartoonVideoAgent()
    
    story = """
   Buddy the Panda & The Magic Budget Plan
Sneha loved buying sketchbooks, glitter pens, and her favourite chocolate bars. But every month, her pocket money disappeared too quickly. One afternoon, Buddy the Panda appeared with a big smile and said, “Let’s fix this together!”
He taught her a simple Magic Budget Plan with three colourful jars:
Spend Jar for things she wants now
Save Jar for bigger goals
Share Jar to help others
Sneha began putting part of her pocket money into each jar. She wrote down every rupee she spent—no more guessing! Soon she noticed how small impulse buys added up.
Weeks passed, and her Save Jar grew heavier. Sneha proudly reached her goal: buying the watercolour set she had always dreamed of! She even used her Share Jar to donate biscuits to a nearby animal shelter.
Sneha realised budgeting wasn’t about saying “no,” but about planning “yes” for the things that matter. With Buddy cheering her on, she continued making smart money choices—one jar at a time.
    """
    
    # Async generation
    result = await agent.generate_async(
        story=story,
        subject="superheroes",
        target_age="5-8"
    )
    
    return result


if __name__ == "__main__":
    print("\n🎬 Cartoon Video Agent - Examples\n")
    
    # Check for API key
    if not os.getenv("OPENAI_API_KEY"):
        print("⚠️  Warning: OPENAI_API_KEY not set!")
        print("   Please set your API key:")
        print("   export OPENAI_API_KEY=sk-your-key-here")
        print("\n   Or create a .env file with your key.")
        print("\n   Running in demo mode (will fail on actual generation)...\n")
    
    # Run examples
    try:
        # Basic usage
        result1 = example_basic_usage()
        
        # You can uncomment these to try other examples:
        # result2 = example_with_custom_config()
        # result3 = example_built_in_stories()
        # result4 = example_silent_generation()
        
        # For async example:
        # import asyncio
        # result5 = asyncio.run(example_async_generation())
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\nMake sure you have:")
        print("  1. Set your OPENAI_API_KEY")
        print("  2. Installed all requirements: pip install -r requirements.txt")
        print("  3. Installed ffmpeg: brew install ffmpeg (macOS)")

