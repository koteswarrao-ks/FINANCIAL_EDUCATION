"""
Cartoon Video Agent - Main orchestrator for generating cartoon videos from stories
"""

import asyncio
import os
import re
import time
from pathlib import Path
from typing import Optional, Callable
from dataclasses import dataclass, field
from datetime import datetime

from rich.console import Console
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TaskID
from rich.panel import Panel
from rich.markdown import Markdown

from .config import AgentConfig, default_config
from .story_parser import StoryParser, ParsedStory
from .image_generator import ImageGenerator, GeneratedImage
from .audio_generator import AudioGenerator, GeneratedAudio
from .video_composer import VideoComposer, VideoResult
from .character_generator import CharacterGenerator


@dataclass
class GenerationResult:
    """Complete result of video generation"""
    success: bool
    video_path: Optional[str] = None
    preview_gif_path: Optional[str] = None
    parsed_story: Optional[ParsedStory] = None
    images: list = field(default_factory=list)
    audios: list = field(default_factory=list)
    video_result: Optional[VideoResult] = None
    error_message: Optional[str] = None
    generation_time_seconds: float = 0.0
    project_name: str = ""


class CartoonVideoAgent:
    """
    Main agent that orchestrates the generation of cartoon videos from text stories.
    
    This agent:
    1. Parses stories into visual scenes
    2. Generates cartoon images for each scene
    3. Creates narration audio
    4. Composes everything into a final video
    
    Usage:
        agent = CartoonVideoAgent()
        result = agent.generate(
            story="Once upon a time, there was a little bunny...",
            subject="animals",
            target_age="4-6"
        )
        print(f"Video created: {result.video_path}")
    """
    
    def __init__(self, config: Optional[AgentConfig] = None):
        """
        Initialize the Cartoon Video Agent.
        
        Args:
            config: Optional configuration. Uses default_config if not provided.
        """
        self.config = config or default_config
        self.config.validate()
        
        # Initialize components
        self.story_parser = StoryParser(self.config)
        self.image_generator = ImageGenerator(self.config)
        self.audio_generator = AudioGenerator(self.config)
        self.video_composer = VideoComposer(self.config)
        # Character generator available for dialogue mode
        from .character_generator import CharacterGenerator
        self.character_generator = CharacterGenerator(self.config)
        
        # Rich console for beautiful output
        self.console = Console()
        
    def _generate_project_name(self, title: str) -> str:
        """Generate a unique project name from the story title."""
        # Clean title for use as filename
        clean_title = re.sub(r'[^\w\s-]', '', title.lower())
        clean_title = re.sub(r'[-\s]+', '_', clean_title)
        clean_title = clean_title[:30]  # Limit length
        
        # Add timestamp for uniqueness
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        return f"{clean_title}_{timestamp}"
    
    def generate(
        self,
        story: str,
        subject: str,
        target_age: str = "4-8",
        custom_title: Optional[str] = None,
        show_progress: bool = True
    ) -> GenerationResult:
        """
        Generate a cartoon video from a story.
        
        Args:
            story: The text story to convert to video
            subject: The interested subject/theme (e.g., "dinosaurs", "space", "friendship")
            target_age: Target age range for the audience
            custom_title: Optional custom title (otherwise derived from story)
            show_progress: Whether to show progress in console
            
        Returns:
            GenerationResult with all generated assets and video path
        """
        start_time = time.time()
        
        if show_progress:
            return self._generate_with_progress(story, subject, target_age, custom_title, start_time)
        else:
            return self._generate_silent(story, subject, target_age, custom_title, start_time)
    
    def _generate_with_progress(
        self,
        story: str,
        subject: str,
        target_age: str,
        custom_title: Optional[str],
        start_time: float
    ) -> GenerationResult:
        """Generate with rich progress display."""
        
        self.console.print(Panel.fit(
            "[bold magenta]🎬 Cartoon Video Agent[/bold magenta]\n"
            f"[cyan]Subject:[/cyan] {subject}\n"
            f"[cyan]Target Age:[/cyan] {target_age}",
            title="Starting Generation"
        ))
        
        try:
            # Step 1: Parse the story
            self.console.print("\n[bold blue]📖 Step 1/4: Parsing Story...[/bold blue]")
            parsed_story = self.story_parser.parse_story(story, subject, target_age)
            
            if custom_title:
                parsed_story.title = custom_title
                
            project_name = self._generate_project_name(parsed_story.title)
            
            # Display story summary
            self.console.print(Panel(
                f"[green]✓ Title:[/green] {parsed_story.title}\n"
                f"[green]✓ Characters:[/green] {len(parsed_story.characters)}\n"
                f"[green]✓ Scenes:[/green] {len(parsed_story.scenes)}\n"
                f"[green]✓ Moral:[/green] {parsed_story.moral or 'N/A'}",
                title="Story Parsed Successfully"
            ))
            
            # Step 2: Generate images
            self.console.print("\n[bold blue]🎨 Step 2/4: Generating Cartoon Images...[/bold blue]")
            
            with Progress(
                SpinnerColumn(),
                TextColumn("[progress.description]{task.description}"),
                BarColumn(),
                TextColumn("[progress.percentage]{task.percentage:>3.0f}%"),
                console=self.console
            ) as progress:
                task = progress.add_task(
                    "Generating images...", 
                    total=len(parsed_story.scenes)
                )
                
                def image_progress(current, total):
                    progress.update(task, completed=current)
                
                images = self.image_generator.generate_all_images(
                    parsed_story, project_name, image_progress
                )
            
            self.console.print(f"[green]✓ Generated {len(images)} scene images[/green]")
            
            # Characters: Generate character sprites (placeholder by default)
            self.console.print("\n[bold blue]🧩 Generating Character Sprites...[/bold blue]")
            character_sprites = self.character_generator.generate_all(parsed_story.characters, parsed_story.subject, project_name)
            self.console.print(f"[green]✓ Generated {len(character_sprites)} character sprites[/green]")
            
            # Step 3: Generate audio (character dialogues or narration)
            if self.config.audio.narration_mode == "characters":
                self.console.print("\n[bold blue]🎤 Step 3/4: Creating Character Dialogues...[/bold blue]")
                # Ensure dialogues for scenes
                parsed_story = self.story_parser.generate_dialogues_for_story(parsed_story)
            else:
                self.console.print("\n[bold blue]🎤 Step 3/4: Creating Narration Audio...[/bold blue]")
            
            with Progress(
                SpinnerColumn(),
                TextColumn("[progress.description]{task.description}"),
                BarColumn(),
                TextColumn("[progress.percentage]{task.percentage:>3.0f}%"),
                console=self.console
            ) as progress:
                task = progress.add_task(
                    "Generating audio...", 
                    total=len(parsed_story.scenes)
                )
                
                def audio_progress(current, total):
                    progress.update(task, completed=current)
                
                if self.config.audio.narration_mode == "characters":
                    parsed_story = self.story_parser.generate_dialogues_for_story(parsed_story)
                    audios = self.audio_generator.generate_all_dialogues(parsed_story, project_name, audio_progress)
                else:
                    audios = self.audio_generator.generate_all_narrations(parsed_story, project_name, audio_progress)
            
            total_duration = sum(a.duration_seconds for a in audios)
            label = "dialogue" if self.config.audio.narration_mode == "characters" else "narration"
            self.console.print(
                f"[green]✓ Generated {len(audios)} {label} clips "
                f"({total_duration:.1f}s total)[/green]"
            )
            
            # Step 4: Compose video
            self.console.print("\n[bold blue]🎬 Step 4/4: Composing Final Video...[/bold blue]")
            
            with Progress(
                SpinnerColumn(),
                TextColumn("[progress.description]{task.description}"),
                console=self.console
            ) as progress:
                task = progress.add_task("Rendering video...", total=None)
                
                def video_progress(current, total, message):
                    progress.update(task, description=message)
                
                if self.config.audio.narration_mode == "characters":
                    video_result = self.video_composer.compose_video(
                        images, audios, character_sprites, project_name, 
                        title=parsed_story.title,
                        progress_callback=video_progress,
                        narrator_sprite_path=self.config.video.narrator_sprite_path
                    )
                else:
                    video_result = self.video_composer.compose_video(
                        images, audios, {}, project_name, 
                        title=parsed_story.title,
                        progress_callback=video_progress,
                        narrator_sprite_path=self.config.video.narrator_sprite_path
                    )
            
            # Create preview GIF
            preview_gif = self.video_composer.create_preview_gif(images, project_name)
            
            # Calculate total time
            generation_time = time.time() - start_time
            
            # Success message
            self.console.print(Panel.fit(
                f"[bold green]🎉 Video Generated Successfully![/bold green]\n\n"
                f"📹 [cyan]Video:[/cyan] {video_result.video_path}\n"
                f"🖼️  [cyan]Preview GIF:[/cyan] {preview_gif}\n"
                f"⏱️  [cyan]Duration:[/cyan] {video_result.duration_seconds:.1f}s\n"
                f"🎬 [cyan]Scenes:[/cyan] {video_result.scenes_count}\n"
                f"⚡ [cyan]Generation Time:[/cyan] {generation_time:.1f}s",
                title="✨ Complete!"
            ))
            
            return GenerationResult(
                success=True,
                video_path=video_result.video_path,
                preview_gif_path=preview_gif,
                parsed_story=parsed_story,
                images=images,
                audios=audios,
                video_result=video_result,
                generation_time_seconds=generation_time,
                project_name=project_name
            )
            
        except Exception as e:
            generation_time = time.time() - start_time
            self.console.print(f"[bold red]❌ Error: {str(e)}[/bold red]")
            
            return GenerationResult(
                success=False,
                error_message=str(e),
                generation_time_seconds=generation_time
            )
    
    def _generate_silent(
        self,
        story: str,
        subject: str,
        target_age: str,
        custom_title: Optional[str],
        start_time: float
    ) -> GenerationResult:
        """Generate without progress display."""
        try:
            # Parse story
            parsed_story = self.story_parser.parse_story(story, subject, target_age)
            if custom_title:
                parsed_story.title = custom_title
            project_name = self._generate_project_name(parsed_story.title)
            
            # Generate images
            images = self.image_generator.generate_all_images(parsed_story, project_name)
            
            # Generate character sprites
            character_sprites = self.character_generator.generate_all(parsed_story.characters, parsed_story.subject, project_name)
            
            # Generate audio (dialogues or narration)
            if self.config.audio.narration_mode == "characters":
                parsed_story = self.story_parser.generate_dialogues_for_story(parsed_story)
                audios = self.audio_generator.generate_all_dialogues(parsed_story, project_name)
            else:
                audios = self.audio_generator.generate_all_narrations(parsed_story, project_name)
            
            # Compose video
            video_result = self.video_composer.compose_video(
                images, audios, character_sprites, project_name, 
                title=parsed_story.title
            )
            
            # Create preview
            preview_gif = self.video_composer.create_preview_gif(images, project_name)
            
            generation_time = time.time() - start_time
            
            return GenerationResult(
                success=True,
                video_path=video_result.video_path,
                preview_gif_path=preview_gif,
                parsed_story=parsed_story,
                images=images,
                audios=audios,
                video_result=video_result,
                generation_time_seconds=generation_time,
                project_name=project_name
            )
            
        except Exception as e:
            return GenerationResult(
                success=False,
                error_message=str(e),
                generation_time_seconds=time.time() - start_time
            )
    
    async def generate_async(
        self,
        story: str,
        subject: str,
        target_age: str = "4-8",
        custom_title: Optional[str] = None
    ) -> GenerationResult:
        """
        Async version of generate for integration with async applications.
        """
        return await asyncio.to_thread(
            self.generate,
            story=story,
            subject=subject,
            target_age=target_age,
            custom_title=custom_title,
            show_progress=False
        )
    
    def get_example_stories(self) -> dict:
        """Get example stories to test the agent."""
        return {
            "bunny_adventure": {
                "story": """
                    Once upon a time, in a sunny meadow, there lived a little bunny named Fluffy.
                    Fluffy had the softest white fur and the biggest, sparkliest eyes.
                    
                    One morning, Fluffy decided to explore the forest beyond the meadow.
                    "I wonder what's out there!" Fluffy said with excitement.
                    
                    In the forest, Fluffy met a wise old owl named Oliver.
                    "Hello little bunny," said Oliver. "Are you lost?"
                    
                    "No, I'm on an adventure!" replied Fluffy bravely.
                    Oliver smiled and said, "Adventures are wonderful, but always remember your way home."
                    
                    Fluffy continued through the forest and found a beautiful garden of carrots!
                    "Wow! This is the best discovery ever!" Fluffy cheered.
                    
                    As the sun began to set, Fluffy remembered Oliver's words.
                    Following the path back, Fluffy returned home safely with a big smile.
                    
                    From that day on, Fluffy knew that adventures are fun,
                    but home is always the best place to be.
                """,
                "subject": "animals and nature",
                "target_age": "3-6"
            },
            "space_explorer": {
                "story": """
                    Luna was a curious little astronaut who dreamed of visiting the stars.
                    She built a rocket ship from cardboard boxes in her backyard.
                    
                    "3... 2... 1... Blast off!" Luna shouted as she pretended to fly.
                    In her imagination, she zoomed past the moon and planets.
                    
                    She landed on a friendly purple planet where she met alien friends.
                    The aliens were round and bouncy, and they loved to laugh!
                    
                    "Welcome to Planet Joy!" they said. "We're so happy you're here!"
                    Luna played games with her new friends all afternoon.
                    
                    When it was time to go home, the aliens gave Luna a glowing star.
                    "Keep this to remember us," they said with a hug.
                    
                    Luna flew back home just in time for dinner.
                    She knew that imagination could take her anywhere in the universe!
                """,
                "subject": "space exploration",
                "target_age": "4-8"
            },
            "kind_dragon": {
                "story": """
                    In a kingdom far away, there lived a small dragon named Ember.
                    Unlike other dragons, Ember didn't want to breathe fire or scare people.
                    
                    Ember just wanted to make friends and help others.
                    But everyone in the village was afraid of dragons.
                    
                    One rainy day, a little girl named Rose was stuck in the storm.
                    Ember saw her shivering and knew what to do.
                    
                    Ember flew over and used its wings as an umbrella.
                    "Don't be scared," Ember said gently. "I just want to help."
                    
                    Rose smiled and said, "Thank you, kind dragon!"
                    They walked together to Rose's home, talking and laughing.
                    
                    From that day on, the whole village learned that Ember was friendly.
                    Ember became everyone's favorite helper, proving that kindness matters most.
                """,
                "subject": "friendship and kindness",
                "target_age": "4-7"
            }
        }

