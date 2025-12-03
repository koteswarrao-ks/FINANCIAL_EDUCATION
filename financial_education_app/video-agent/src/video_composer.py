"""
Video Composer - Combines images and audio into the final cartoon video
"""

import os
from pathlib import Path
from typing import List, Optional, Tuple
from dataclasses import dataclass

# MoviePy 2.x imports
from moviepy import (
    ImageClip, AudioFileClip, CompositeVideoClip, 
    concatenate_videoclips, CompositeAudioClip,
    ColorClip, TextClip
)
from moviepy.video.fx import FadeIn, FadeOut, Resize
from PIL import Image, ImageDraw, ImageFont
import numpy as np

from .config import AgentConfig
from .image_generator import GeneratedImage
from .audio_generator import GeneratedAudio
from .character_generator import CharacterSprite


@dataclass
class VideoResult:
    """Result of video composition"""
    video_path: str
    duration_seconds: float
    resolution: Tuple[int, int]
    scenes_count: int


class VideoComposer:
    """
    Composes the final cartoon video from generated images and audio.
    Creates smooth transitions, syncs audio with visuals, and adds effects.
    """
    
    def __init__(self, config: AgentConfig):
        self.config = config
        self.output_dir = Path(config.output_dir)
        self.temp_dir = Path(config.temp_dir)
        
    def _ensure_dirs(self, project_name: str):
        """Ensure output directories exist"""
        (self.output_dir / project_name).mkdir(parents=True, exist_ok=True)
        self.temp_dir.mkdir(parents=True, exist_ok=True)
    
    def create_scene_clip(
        self,
        image_path: str,
        duration: float,
        apply_motion: bool = True
    ) -> ImageClip:
        """
        Create a video clip from a single image with subtle motion effects.
        
        Args:
            image_path: Path to the scene image
            duration: Duration of the clip in seconds
            apply_motion: Whether to apply Ken Burns effect (subtle zoom/pan)
            
        Returns:
            MoviePy ImageClip with effects applied
        """
        # Check if custom background should be used instead
        custom_bg = self.config.video.custom_background_path
        if custom_bg and os.path.exists(custom_bg):
            image_path = custom_bg
        
        clip = ImageClip(image_path).with_duration(duration)
        
        if apply_motion:
            # Apply subtle Ken Burns effect (slow zoom in)
            clip = self._apply_ken_burns_effect(clip, duration)
        
        return clip
    
    def _apply_ken_burns_effect(
        self, 
        clip: ImageClip, 
        duration: float,
        zoom_factor: float = 1.1
    ) -> ImageClip:
        """
        Apply Ken Burns effect (subtle zoom/pan) to make static images more dynamic.
        """
        w, h = clip.size
        
        def zoom_effect(get_frame, t):
            """Apply gradual zoom over time"""
            progress = t / duration
            current_zoom = 1 + (zoom_factor - 1) * progress
            
            frame = get_frame(t)
            
            # Calculate new dimensions
            new_w = int(w * current_zoom)
            new_h = int(h * current_zoom)
            
            # Resize frame
            img = Image.fromarray(frame)
            img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            
            # Center crop back to original size
            left = (new_w - w) // 2
            top = (new_h - h) // 2
            img = img.crop((left, top, left + w, top + h))
            
            return np.array(img)
        
        return clip.transform(zoom_effect)
    
    def _apply_story_based_motion(
        self,
        clip: ImageClip,
        duration: float,
        narration_text: str
    ) -> ImageClip:
        """
        Apply motion effects based on story content keywords.
        Analyzes the narration to determine appropriate animation.
        """
        text_lower = narration_text.lower() if narration_text else ""
        w, h = clip.size
        
        # Detect action keywords and apply corresponding motion
        motion_type = "zoom_in"  # default
        
        # Movement keywords
        if any(word in text_lower for word in ["walked", "went", "moved", "traveled", "journey"]):
            motion_type = "pan_right"
        elif any(word in text_lower for word in ["came", "arrived", "returned", "back"]):
            motion_type = "pan_left"
        elif any(word in text_lower for word in ["jumped", "excited", "happy", "joy", "celebrated"]):
            motion_type = "bounce"
        elif any(word in text_lower for word in ["grew", "bigger", "more", "increased", "heavier"]):
            motion_type = "zoom_in"
        elif any(word in text_lower for word in ["small", "tiny", "less", "disappeared"]):
            motion_type = "zoom_out"
        elif any(word in text_lower for word in ["looked", "saw", "noticed", "found"]):
            motion_type = "focus_center"
        elif any(word in text_lower for word in ["sad", "worried", "scared", "nervous"]):
            motion_type = "gentle_shake"
        
        def motion_effect(get_frame, t):
            """Apply motion based on type"""
            progress = t / duration
            frame = get_frame(t)
            img = Image.fromarray(frame)
            
            if motion_type == "pan_right":
                # Pan from left to right
                shift = int(w * 0.1 * progress)
                img = img.resize((int(w * 1.15), int(h * 1.15)), Image.Resampling.LANCZOS)
                left = shift
                top = int(h * 0.075)
                img = img.crop((left, top, left + w, top + h))
                
            elif motion_type == "pan_left":
                # Pan from right to left
                shift = int(w * 0.1 * (1 - progress))
                img = img.resize((int(w * 1.15), int(h * 1.15)), Image.Resampling.LANCZOS)
                left = int(w * 0.15) - shift
                top = int(h * 0.075)
                img = img.crop((left, top, left + w, top + h))
                
            elif motion_type == "bounce":
                # Subtle bounce effect
                import math
                bounce = abs(math.sin(progress * math.pi * 3)) * 0.02
                zoom = 1 + bounce
                new_w, new_h = int(w * zoom), int(h * zoom)
                img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                left = (new_w - w) // 2
                top = (new_h - h) // 2
                img = img.crop((left, top, left + w, top + h))
                
            elif motion_type == "zoom_in":
                # Slow zoom in
                zoom = 1 + 0.15 * progress
                new_w, new_h = int(w * zoom), int(h * zoom)
                img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                left = (new_w - w) // 2
                top = (new_h - h) // 2
                img = img.crop((left, top, left + w, top + h))
                
            elif motion_type == "zoom_out":
                # Slow zoom out
                zoom = 1.15 - 0.15 * progress
                new_w, new_h = int(w * zoom), int(h * zoom)
                img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                left = (new_w - w) // 2
                top = (new_h - h) // 2
                img = img.crop((left, top, left + w, top + h))
                
            elif motion_type == "focus_center":
                # Zoom towards center
                zoom = 1 + 0.1 * progress
                new_w, new_h = int(w * zoom), int(h * zoom)
                img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                left = (new_w - w) // 2
                top = (new_h - h) // 2
                img = img.crop((left, top, left + w, top + h))
                
            elif motion_type == "gentle_shake":
                # Subtle shake for emotional scenes
                import math
                shake_x = int(math.sin(progress * math.pi * 6) * 3)
                shake_y = int(math.cos(progress * math.pi * 4) * 2)
                img = img.resize((w + 20, h + 20), Image.Resampling.LANCZOS)
                left = 10 + shake_x
                top = 10 + shake_y
                img = img.crop((left, top, left + w, top + h))
            
            return np.array(img)
        
        return clip.transform(motion_effect)
    
    def compose_video(
        self,
        images: List[GeneratedImage],
        audios: List[GeneratedAudio],
        character_sprites: dict,
        project_name: str,
        title: str = "Story",
        add_title_card: bool = True,
        add_end_card: bool = True,
        progress_callback=None,
        narrator_sprite_path: str = None
    ) -> VideoResult:
        """
        Compose the final video from images and audio.
        
        Args:
            images: List of generated scene images
            audios: List of generated narration audio files
            project_name: Name for the output file
            title: Story title for title card
            add_title_card: Whether to add a title card at the start
            add_end_card: Whether to add an end card
            progress_callback: Optional callback(current, total, message)
            
        Returns:
            VideoResult with path and metadata
        """
        self._ensure_dirs(project_name)
        
        # Sort by scene number
        images_sorted = sorted(images, key=lambda x: x.scene_number)
        audios_sorted = sorted(audios, key=lambda x: x.scene_number)
        
        clips = []
        total_steps = len(images_sorted)  # No title/end cards
        current_step = 0
        
        # Skip title card in continuous mode
        # if add_title_card:
        #     title_clip = self._create_title_card(title, duration=4.0)
        #     clips.append(title_clip)
        #     current_step += 1
        #     if progress_callback:
        #         progress_callback(current_step, total_steps, "Created title card")
        
        # Create scene clips
        for i, (image, audio) in enumerate(zip(images_sorted, audios_sorted)):
            # Use audio duration plus a small buffer
            duration = max(
                audio.duration_seconds + 1.0,
                self.config.video.min_scene_duration
            )
            
            # Create base scene clip
            base_scene = self.create_scene_clip(
                image.image_path,
                duration,
                apply_motion=False  # We'll apply story-based motion instead
            )
            
            # Apply story-based motion animation
            narration_text = getattr(audio, 'narration_text', '') or ''
            base_scene = self._apply_story_based_motion(base_scene, duration, narration_text)
            
            # Add audio to this scene
            scene_audio = AudioFileClip(audio.audio_path)
            scene_clip = base_scene.with_audio(scene_audio)
            
            # Add text overlay if enabled (ONLY story text, no speech bubbles)
            if self.config.video.show_story_text and hasattr(audio, 'narration_text'):
                text_overlays = self._create_dynamic_subtitles(
                    text=audio.narration_text,
                    duration=duration
                )
                if text_overlays:
                    scene_clip = CompositeVideoClip([scene_clip, *text_overlays]).with_duration(duration)

            # Skip dialogue bubbles - only show story text subtitles
            if False and getattr(audio, "dialogue_clips", None):
                overlays = []
                for dlg in audio.dialogue_clips:
                    side = self._side_for_speaker(dlg.speaker)
                    bubble = self._create_speech_bubble(
                        text=dlg.text,
                        speaker=dlg.speaker,
                        start=dlg.start_time,
                        end=dlg.end_time,
                        side=side,
                        project_name=project_name
                    )
                    if bubble is not None:
                        overlays.append(bubble)
                # Also overlay character sprites present (speakers in scene)
                speaker_names = list({dc.speaker for dc in audio.dialogue_clips})
                positions = self._character_positions(len(speaker_names))
                for name, (px, py) in zip(speaker_names, positions):
                    sprite = character_sprites.get(name)
                    if not sprite:
                        continue
                    try:
                        with Image.open(sprite.image_path) as im_probe:
                            sw, sh = im_probe.size
                        if sw <= 1 or sh <= 1:
                            continue
                        with Image.open(sprite.image_path) as im_sprite:
                            im_sprite = im_sprite.convert("RGB")
                            target_height = int(self.config.video.resolution[1] * 0.55)
                            ratio = im_sprite.width / max(1, im_sprite.height)
                            new_h = max(10, target_height)
                            new_w = int(new_h * ratio)
                            im_resized = im_sprite.resize((new_w, new_h), Image.Resampling.LANCZOS)
                            oclip = ImageClip(np.array(im_resized)).with_duration(duration)
                            fx = int(self.config.video.resolution[0] * px)
                            fy = int(self.config.video.resolution[1] * py) - new_h
                            oclip = oclip.with_position((fx, fy))
                            overlays.append(oclip)
                    except Exception:
                        continue
                if overlays:
                    scene_clip = CompositeVideoClip([scene_clip, *overlays]).with_duration(duration)
            else:
                # Continuous mode: overlay narrator sprite if provided
                if narrator_sprite_path and self.config.video.show_narrator_sprite:
                    try:
                        with Image.open(narrator_sprite_path) as im_probe:
                            sw, sh = im_probe.size
                        with Image.open(narrator_sprite_path) as im_sprite:
                            im_sprite = im_sprite.convert("RGB")
                            target_height = int(self.config.video.resolution[1] * 0.6)
                            ratio = im_sprite.width / max(1, im_sprite.height)
                            new_h = max(10, target_height)
                            new_w = int(new_h * ratio)
                            im_resized = im_sprite.resize((new_w, new_h), Image.Resampling.LANCZOS)
                            oclip = ImageClip(np.array(im_resized)).with_duration(duration)
                            # Place left side bottom
                            fx = int(self.config.video.resolution[0] * 0.05)
                            fy = int(self.config.video.resolution[1] * 0.95) - new_h
                            oclip = oclip.with_position((fx, fy))
                            scene_clip = CompositeVideoClip([scene_clip, oclip]).with_duration(duration)
                    except Exception:
                        pass
            
            clips.append(scene_clip)
            
            current_step += 1
            if progress_callback:
                progress_callback(
                    current_step, total_steps, 
                    f"Processed scene {i + 1}/{len(images_sorted)}"
                )
        
        # Skip end card in continuous mode
        # if add_end_card:
        #     end_clip = self._create_end_card(duration=3.0)
        #     clips.append(end_clip)
        #     current_step += 1
        #     if progress_callback:
        #         progress_callback(current_step, total_steps, "Created end card")
        
        # Concatenate all clips (no fades to avoid mask/shape issues on some systems)
        final_video = concatenate_videoclips(clips, method="compose") if len(clips) > 1 else clips[0]
        
        # Write the final video
        output_path = str(
            self.output_dir / project_name / f"{project_name}_cartoon.{self.config.video.output_format}"
        )
        
        if progress_callback:
            progress_callback(current_step, total_steps, "Rendering final video...")
        
        final_video.write_videofile(
            output_path,
            fps=self.config.video.fps,
            codec=self.config.video.codec,
            audio_codec="aac",
            temp_audiofile=str(self.temp_dir / "temp_audio.m4a"),
            remove_temp=True,
            logger=None  # Suppress verbose output
        )
        
        video_duration = final_video.duration
        
        # Clean up
        final_video.close()
        for clip in clips:
            clip.close()
        
        return VideoResult(
            video_path=output_path,
            duration_seconds=video_duration,
            resolution=self.config.video.resolution,
            scenes_count=len(images_sorted)
        )
    
    def _create_title_card(
        self, 
        title: str, 
        duration: float = 4.0
    ) -> ImageClip:
        """Create an animated title card."""
        width, height = self.config.video.resolution
        
        # Create gradient background
        background = self._create_gradient_background(
            width, height,
            color1=(255, 182, 193),  # Light pink
            color2=(135, 206, 250)   # Light blue
        )
        
        background_clip = ImageClip(background).with_duration(duration)
        
        try:
            # Try to create text overlay
            txt_clip = TextClip(
                text=title,
                font_size=80,
                color='white',
                font='Arial-Bold',
                stroke_color='gray',
                stroke_width=2
            ).with_position('center').with_duration(duration)
            
            # Fade in the text
            txt_clip = txt_clip.with_effects([FadeIn(1.0)])
            
            title_card = CompositeVideoClip([background_clip, txt_clip])
        except Exception:
            # Fallback if text rendering fails (ImageMagick not installed)
            title_card = background_clip
        
        return title_card.with_effects([FadeOut(0.5)])
    
    def _create_end_card(self, duration: float = 3.0) -> ImageClip:
        """Create an end card with 'The End' text."""
        width, height = self.config.video.resolution
        
        # Create gradient background
        background = self._create_gradient_background(
            width, height,
            color1=(255, 218, 185),  # Peach
            color2=(255, 182, 193)   # Pink
        )
        
        background_clip = ImageClip(background).with_duration(duration)
        
        try:
            txt_clip = TextClip(
                text="The End",
                font_size=100,
                color='white',
                font='Arial-Bold',
                stroke_color='gray',
                stroke_width=2
            ).with_position('center').with_duration(duration)
            
            txt_clip = txt_clip.with_effects([FadeIn(0.5)])
            
            end_card = CompositeVideoClip([background_clip, txt_clip])
        except Exception:
            end_card = background_clip
        
        return end_card.with_effects([FadeIn(0.5)])
    
    def _create_gradient_background(
        self,
        width: int,
        height: int,
        color1: Tuple[int, int, int],
        color2: Tuple[int, int, int]
    ) -> np.ndarray:
        """Create a gradient background image."""
        # Create vertical gradient
        gradient = np.zeros((height, width, 3), dtype=np.uint8)
        
        for y in range(height):
            ratio = y / height
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
            gradient[y, :] = [r, g, b]
        
        return gradient
    
    def _create_text_overlay(
        self,
        text: str,
        duration: float,
        start_time: float = 0.0
    ):
        """
        Create a text overlay showing the story text at the bottom of the screen.
        
        Args:
            text: The text to display
            duration: How long to display the text
            start_time: When to start displaying the text
            
        Returns:
            TextClip with position and timing
        """
        try:
            width, height = self.config.video.resolution
            # Create text clip with word wrapping
            txt_clip = TextClip(
                text=text,
                font_size=40,
                color='white',
                font='Arial',
                stroke_color='black',
                stroke_width=2,
                method='caption',
                size=(int(width * 0.9), None)  # 90% of screen width
            ).with_position(('center', int(height * 0.75))).with_duration(duration)
            
            # Set start time
            if start_time > 0:
                txt_clip = txt_clip.with_start(start_time)
            
            return txt_clip
        except Exception as e:
            # If text rendering fails, return None
            return None
    
    def _create_dynamic_subtitles(
        self,
        text: str,
        duration: float
    ):
        """
        Create dynamic subtitles that change based on timing.
        Splits text into sentences and displays them progressively.
        
        Args:
            text: The full story text
            duration: Total duration of the audio
            
        Returns:
            List of TextClip objects with proper timing
        """
        import re
        
        try:
            # Split text into sentences
            sentences = re.split(r'(?<=[.!?])\s+', text.strip())
            sentences = [s.strip() for s in sentences if s.strip()]
            
            if not sentences:
                return []
            
            # Calculate time per sentence
            time_per_sentence = duration / len(sentences)
            
            text_clips = []
            width, height = self.config.video.resolution
            
            for i, sentence in enumerate(sentences):
                start_time = i * time_per_sentence
                end_time = (i + 1) * time_per_sentence
                clip_duration = end_time - start_time
                
                # Create text clip for this sentence
                txt_clip = TextClip(
                    text=sentence,
                    font_size=42,
                    color='white',
                    font='Arial-Bold',
                    stroke_color='black',
                    stroke_width=3,
                    method='caption',
                    size=(int(width * 0.85), None)
                ).with_position(('center', int(height * 0.78))).with_duration(clip_duration).with_start(start_time)
                
                text_clips.append(txt_clip)
            
            return text_clips
        except Exception as e:
            # If dynamic subtitles fail, return empty list
            return []

    def _side_for_speaker(self, name: str) -> str:
        """Deterministically choose left/right placement per speaker."""
        return "left" if (abs(hash((name or '').lower())) % 2 == 0) else "right"

    def _character_positions(self, count: int):
        """
        Return normalized (x,y) anchor positions for 1..3 characters.
        y is bottom alignment factor (0..1).
        """
        if count <= 1:
            return [(0.35, 0.95)]
        if count == 2:
            return [(0.20, 0.95), (0.65, 0.95)]
        return [(0.12, 0.95), (0.45, 0.95), (0.78, 0.95)]

    def _create_avatar_image(self, name: str, project_name: str) -> str:
        """Create a simple circular avatar with speaker initials."""
        initials = "".join([w[0].upper() for w in (name or "A").split()][:2]) or "A"
        width, height = 180, 180
        # Pick color from name hash
        colors = [(255, 182, 193), (135, 206, 250), (255, 218, 185), (144, 238, 144)]
        bg = colors[abs(hash((name or '').lower())) % len(colors)]
        img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        draw.ellipse([(0, 0), (width-1, height-1)], fill=bg)
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 80)
        except Exception:
            font = ImageFont.load_default()
        tw, th = draw.textbbox((0,0), initials, font=font)[2:]
        draw.text(((width - tw)//2, (height - th)//2), initials, font=font, fill=(255, 255, 255, 255))
        avatar_dir = self.output_dir / project_name / "avatars"
        avatar_dir.mkdir(parents=True, exist_ok=True)
        out_path = str(avatar_dir / f"{(name or 'speaker').lower().replace(' ', '_')}.png")
        img.save(out_path, "PNG")
        return out_path

    def _create_speech_bubble(
        self,
        text: str,
        speaker: str,
        start: float,
        end: float,
        side: str,
        project_name: str
    ):
        """
        Create a timed speech bubble with a small avatar, positioned left/right.
        """
        try:
            duration = max(0.01, end - start)
            width, height = self.config.video.resolution
            pad = 20
            # Fixed-size safe bubble to avoid zero-dimension edge cases
            bubble_w = int(width * 0.6)
            bubble_h = 160
            try:
                font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 34)
                font_bold = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 34)
            except Exception:
                font = ImageFont.load_default()
                font_bold = font
            # Build bubble
            img = Image.new("RGB", (bubble_w, bubble_h), (0, 0, 0))
            draw = ImageDraw.Draw(img)
            # Title
            speaker_prefix = f"{speaker}: "
            draw.text((pad, pad), speaker_prefix, fill=(255,255,255), font=font_bold)
            # Wrap text by characters into two lines max
            body = (text or "")[:120]
            # simple wrap at ~40 chars
            lines = [body[i:i+40] for i in range(0, len(body), 40)][:2]
            y = pad + 40
            for ln in lines:
                draw.text((pad, y), ln, fill=(255,255,255), font=font)
                y += 36
            bubble_clip = ImageClip(np.array(img)).with_duration(duration).with_opacity(0.65)
            # Positioning
            margin = 40
            x = margin if side == "left" else width - bubble_w - margin
            y_pos = height - bubble_h - 140
            bubble_clip = bubble_clip.with_position((x, y_pos))
            # Avatar
            avatar_path = self._create_avatar_image(speaker, project_name)
            avatar_clip = ImageClip(avatar_path).with_duration(duration)
            avatar_clip = avatar_clip.with_effects([Resize(width=100)])
            ax = x if side == "left" else x + bubble_w - 100
            ay = y_pos - 112
            avatar_clip = avatar_clip.with_position((ax, ay))
            return CompositeVideoClip([bubble_clip, avatar_clip]).with_start(start).with_duration(duration)
        except Exception:
            tiny = ImageClip(np.zeros((2,2,3), dtype=np.uint8)).with_duration(0.05).with_start(start)
            return tiny
    
    def create_preview_gif(
        self,
        images: List[GeneratedImage],
        project_name: str,
        duration_per_frame: float = 2.0
    ) -> str:
        """
        Create a preview GIF from the scene images.
        
        Args:
            images: List of generated images
            project_name: Project name for output path
            duration_per_frame: Seconds per frame in the GIF
            
        Returns:
            Path to the generated GIF
        """
        self._ensure_dirs(project_name)
        
        images_sorted = sorted(images, key=lambda x: x.scene_number)
        
        # Load and resize images for GIF
        pil_images = []
        for img in images_sorted:
            pil_img = Image.open(img.image_path)
            pil_img = pil_img.resize((480, 270), Image.Resampling.LANCZOS)  # Smaller for GIF
            pil_images.append(pil_img)
        
        # Save as GIF
        output_path = str(self.output_dir / project_name / f"{project_name}_preview.gif")
        
        pil_images[0].save(
            output_path,
            save_all=True,
            append_images=pil_images[1:],
            duration=int(duration_per_frame * 1000),
            loop=0
        )
        
        return output_path
