# 🎬 Cartoon Video Agent

Generate beautiful cartoon videos from text stories for kids! This AI-powered agent transforms any children's story into an animated video with professional-quality images and narration.

![Demo](assets/demo.gif)

## ✨ Features

- 📖 **Story Parsing**: Intelligent scene breakdown using GPT-4
- 🎨 **Cartoon Generation**: Beautiful illustrations via DALL-E 3 or Stable Diffusion
- 🎤 **Narration**: Natural voice synthesis for storytelling
- 🎬 **Video Composition**: Smooth transitions, Ken Burns effects, title/end cards
- 🎯 **Age-Appropriate**: Customizable for different age groups
- 🎨 **Theme Integration**: Incorporate any subject (space, animals, friendship, etc.)

## 🚀 Quick Start

### 1. Installation

```bash
# Clone or navigate to the project
cd cartoon-video-agent

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Set Up API Keys

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=sk-your-key-here
```

### 3. Generate Your First Video

```bash
# Using a built-in example
python main.py --example bunny_adventure

# Or with your own story
python main.py --story "Once upon a time, there was a brave little mouse..." --subject "courage"

# Interactive mode
python main.py --interactive
```

## 📝 Usage

### Command Line

```bash
# Basic usage
python main.py --story "Your story here" --subject "animals"

# From a text file
python main.py --story-file my_story.txt --subject "adventure"

# With custom options
python main.py --example space_explorer --voice shimmer --quality hd --age "5-10"

# See all options
python main.py --help
```

### Python API

```python
from src import CartoonVideoAgent

# Initialize the agent
agent = CartoonVideoAgent()

# Generate a video
result = agent.generate(
    story="""
        Once upon a time, there was a curious little cat named Whiskers.
        Whiskers loved to explore the garden and make new friends.
        One sunny day, Whiskers met a friendly butterfly...
    """,
    subject="animals and friendship",
    target_age="3-6"
)

if result.success:
    print(f"Video created: {result.video_path}")
    print(f"Preview GIF: {result.preview_gif_path}")
else:
    print(f"Error: {result.error_message}")
```

### Async API

```python
import asyncio
from src import CartoonVideoAgent

async def generate_video():
    agent = CartoonVideoAgent()
    result = await agent.generate_async(
        story="Your amazing story...",
        subject="magic",
        target_age="4-8"
    )
    return result

# Run it
result = asyncio.run(generate_video())
```

## 🎯 Example Stories

The agent comes with built-in example stories:

| Example | Theme | Age Range |
|---------|-------|-----------|
| `bunny_adventure` | Animals & Nature | 3-6 |
| `space_explorer` | Space Exploration | 4-8 |
| `kind_dragon` | Friendship & Kindness | 4-7 |

```bash
python main.py --example bunny_adventure
```

## ⚙️ Configuration

### Voice Options (OpenAI TTS)

| Voice | Description |
|-------|-------------|
| `nova` | Warm, friendly (default) |
| `shimmer` | Bright, energetic |
| `alloy` | Soft, gentle |
| `fable` | British, expressive |
| `onyx` | Deep, engaging |
| `echo` | Neutral, clear |

### Image Quality

| Quality | Description |
|---------|-------------|
| `standard` | Good quality, faster (default) |
| `hd` | Higher detail, slower |

### Custom Configuration

```python
from src import CartoonVideoAgent
from src.config import AgentConfig, ImageConfig, AudioConfig, VideoConfig

config = AgentConfig(
    image=ImageConfig(
        quality="hd",
        style="vivid"
    ),
    audio=AudioConfig(
        voice="shimmer",
        speed=0.85  # Slower for younger kids
    ),
    video=VideoConfig(
        fps=30,
        resolution=(1920, 1080),
        transition_duration=1.5
    ),
    output_dir="my_videos"
)

agent = CartoonVideoAgent(config)
```

## 📁 Output Structure

```
output/
└── your_story_20240115_143022/
    ├── images/
    │   ├── scene_01.png
    │   ├── scene_02.png
    │   └── ...
    ├── audio/
    │   ├── narration_01.mp3
    │   ├── narration_02.mp3
    │   └── full_narration.mp3
    ├── your_story_cartoon.mp4
    └── your_story_preview.gif
```

## 🔧 Requirements

- Python 3.9+
- OpenAI API key (required)
- FFmpeg (for video processing)
- ~2GB disk space for dependencies

### Install FFmpeg

```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt-get install ffmpeg

# Windows
choco install ffmpeg
```

## 💡 Tips for Best Results

1. **Write clear scenes**: Break your story into distinct visual moments
2. **Describe characters**: Include character descriptions for consistency
3. **Keep it age-appropriate**: Match complexity to your target age
4. **Use vivid imagery**: Describe colors, emotions, and settings
5. **Include dialogue**: Direct speech makes for engaging narration

## 🎨 Writing Great Kids' Stories

```
✅ Good Story Structure:
- Introduction with character
- A small challenge or adventure
- Meeting new friends
- Resolution and lesson learned

✅ Good Scene Description:
"Luna the purple unicorn galloped through the rainbow forest,
her mane sparkling in the sunlight."

❌ Avoid:
- Complex plots
- Scary or dark themes
- Too many characters
- Abstract concepts
```

## 🐛 Troubleshooting

### "API key not found"
Make sure you've created a `.env` file with your `OPENAI_API_KEY`.

### "FFmpeg not found"
Install FFmpeg using the commands above for your OS.

### "ImageMagick not found"
Title cards will use simple gradients. Install ImageMagick for text overlays:
```bash
brew install imagemagick  # macOS
```

### Rate Limits
The agent automatically handles rate limits with delays. For faster generation, upgrade your OpenAI plan.

## 📄 License

MIT License - Feel free to use and modify!

## 🙏 Credits

Built with:
- [OpenAI GPT-4](https://openai.com) - Story analysis
- [OpenAI DALL-E 3](https://openai.com) - Image generation
- [OpenAI TTS](https://openai.com) - Voice synthesis
- [MoviePy](https://zulko.github.io/moviepy/) - Video composition
- [Rich](https://rich.readthedocs.io/) - Beautiful CLI output

---

Made with ❤️ for kids everywhere 🌟

