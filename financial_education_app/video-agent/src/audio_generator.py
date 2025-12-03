"""
Audio Generator - Creates narration audio for story scenes
"""

import asyncio
import os
import httpx
from pathlib import Path
from typing import List, Optional
from dataclasses import dataclass, field

# MoviePy 2.x imports
from moviepy import AudioFileClip, concatenate_audioclips, AudioClip

from .config import AgentConfig
from .story_parser import Scene, ParsedStory


@dataclass
class GeneratedAudio:
    """Represents generated audio for a scene"""
    scene_number: int
    audio_path: str
    duration_seconds: float
    narration_text: str
    # Optional: dialogue clips metadata if using character mode
    dialogue_clips: List["DialogueClip"] = field(default_factory=list)


@dataclass
class DialogueClip:
    """Represents a single spoken line timing and metadata"""
    scene_number: int
    speaker: str
    text: str
    audio_path: str
    start_time: float
    end_time: float


class AudioGenerator:
    """
    Generates narration audio for story scenes.
    Supports Azure OpenAI TTS, OpenAI TTS, and ElevenLabs for high-quality voice synthesis.
    """
    
    # Kid-friendly voice configurations
    OPENAI_VOICES = {
        "friendly_female": "nova",      # Warm and friendly
        "storyteller_male": "onyx",     # Deep and engaging
        "energetic": "shimmer",         # Bright and energetic
        "gentle": "alloy",              # Soft and gentle
        "expressive": "fable",          # British, expressive
    }
    
    ELEVENLABS_VOICES = {
        "storyteller": "pNInz6obpgDQGcFmaJgB",  # Adam - clear narrator
        "friendly": "EXAVITQu4vr4xnSDxMaL",      # Bella - warm female
        "child_friendly": "jBpfuIE2acCO8z3wKNLl", # Gigi - animated
    }
    
    def __init__(self, config: AgentConfig):
        self.config = config
        self.output_dir = Path(config.output_dir)
        self.temp_dir = Path(config.temp_dir)
        
    def _ensure_dirs(self, project_name: str):
        """Ensure output directories exist"""
        (self.output_dir / project_name / "audio").mkdir(parents=True, exist_ok=True)
        self.temp_dir.mkdir(parents=True, exist_ok=True)
    
    def _get_audio_duration(self, audio_path: str) -> float:
        """Get duration of an audio file using moviepy"""
        try:
            audio_clip = AudioFileClip(audio_path)
            duration = audio_clip.duration
            audio_clip.close()
            return duration
        except Exception:
            # Fallback: estimate based on text length
            return 5.0
        
    def generate_scene_narration(
        self,
        scene: Scene,
        project_name: str
    ) -> GeneratedAudio:
        """
        Generate narration audio for a single scene.
        
        Args:
            scene: The scene with narration text
            project_name: Name for organizing output files
            
        Returns:
            GeneratedAudio with path and duration
        """
        self._ensure_dirs(project_name)
        
        provider = self.config.audio.provider
        
        if provider == "azure":
            try:
                return self._generate_with_azure_tts(scene, project_name)
            except Exception as e:
                print(f"Azure TTS not available: {e}")
                print("Trying gTTS (Google Text-to-Speech)...")
                return self._generate_with_gtts(scene, project_name)
        elif provider == "openai":
            return self._generate_with_openai(scene, project_name)
        elif provider == "elevenlabs":
            return self._generate_with_elevenlabs(scene, project_name)
        elif provider == "gtts":
            return self._generate_with_gtts(scene, project_name)
        else:
            # Try Azure first, then fallback to gTTS
            try:
                return self._generate_with_azure_tts(scene, project_name)
            except Exception as e:
                print(f"Azure TTS failed: {e}, using gTTS...")
                return self._generate_with_gtts(scene, project_name)
    
    def _generate_with_azure_tts(
        self,
        scene: Scene,
        project_name: str
    ) -> GeneratedAudio:
        """Generate narration using Azure OpenAI TTS"""
        audio_path = str(
            self.output_dir / project_name / "audio" / f"narration_{scene.scene_number:02d}.mp3"
        )
        
        # Add expression hints based on mood
        narration_text = self._add_expression_hints(scene.narration, scene.mood)
        
        url = f"{self.config.azure.endpoint}/openai/deployments/{self.config.azure.tts_deployment}/audio/speech?api-version={self.config.azure.api_version}"
        
        headers = {
            "Content-Type": "application/json",
            "Api-Key": self.config.azure.api_key
        }
        
        payload = {
            "model": self.config.audio.model,
            "voice": self.config.audio.voice,
            "input": narration_text,
            "speed": self.config.audio.speed,
            "response_format": "mp3"
        }
        
        response = httpx.post(url, headers=headers, json=payload, timeout=120.0)
        response.raise_for_status()
        
        # Save the audio file
        with open(audio_path, "wb") as f:
            f.write(response.content)
        
        # Get duration using moviepy
        duration = self._get_audio_duration(audio_path)
        
        return GeneratedAudio(
            scene_number=scene.scene_number,
            audio_path=audio_path,
            duration_seconds=duration,
            narration_text=scene.narration
        )
    
    def _generate_with_openai(
        self,
        scene: Scene,
        project_name: str
    ) -> GeneratedAudio:
        """Generate narration using OpenAI TTS"""
        from openai import OpenAI
        client = OpenAI(api_key=self.config.openai_api_key)
        
        audio_path = str(
            self.output_dir / project_name / "audio" / f"narration_{scene.scene_number:02d}.mp3"
        )
        
        # Add expression hints based on mood
        narration_text = self._add_expression_hints(scene.narration, scene.mood)
        
        response = client.audio.speech.create(
            model=self.config.audio.model,
            voice=self.config.audio.voice,
            input=narration_text,
            speed=self.config.audio.speed,
            response_format="mp3"
        )
        
        # Save the audio file
        response.stream_to_file(audio_path)
        
        # Get duration using moviepy
        duration = self._get_audio_duration(audio_path)
        
        return GeneratedAudio(
            scene_number=scene.scene_number,
            audio_path=audio_path,
            duration_seconds=duration,
            narration_text=scene.narration
        )
    
    def _generate_with_elevenlabs(
        self,
        scene: Scene,
        project_name: str
    ) -> GeneratedAudio:
        """Generate narration using ElevenLabs"""
        try:
            from elevenlabs import generate, save, set_api_key
        except ImportError:
            raise ImportError("Please install elevenlabs: pip install elevenlabs")
        
        set_api_key(self.config.elevenlabs_api_key)
        
        audio_path = str(
            self.output_dir / project_name / "audio" / f"narration_{scene.scene_number:02d}.mp3"
        )
        
        # Get voice ID
        voice_id = self.ELEVENLABS_VOICES.get("child_friendly", "pNInz6obpgDQGcFmaJgB")
        
        audio = generate(
            text=scene.narration,
            voice=voice_id,
            model="eleven_monolingual_v1"
        )
        
        save(audio, audio_path)
        
        # Get duration using moviepy
        duration = self._get_audio_duration(audio_path)
        
        return GeneratedAudio(
            scene_number=scene.scene_number,
            audio_path=audio_path,
            duration_seconds=duration,
            narration_text=scene.narration
        )
    
    def _generate_with_gtts(
        self,
        scene: Scene,
        project_name: str
    ) -> GeneratedAudio:
        """Generate narration using gTTS (Google Text-to-Speech) - free, no API key needed"""
        try:
            from gtts import gTTS
        except ImportError:
            raise ImportError("Please install gTTS: pip install gTTS")
        
        audio_path = str(
            self.output_dir / project_name / "audio" / f"narration_{scene.scene_number:02d}.mp3"
        )
        
        # Clean up the text for TTS
        narration_text = scene.narration.strip()
        
        # Generate speech
        tts = gTTS(text=narration_text, lang='en', slow=False)
        tts.save(audio_path)
        
        # Get duration using moviepy
        duration = self._get_audio_duration(audio_path)
        
        return GeneratedAudio(
            scene_number=scene.scene_number,
            audio_path=audio_path,
            duration_seconds=duration,
            narration_text=scene.narration
        )
    
    def _add_expression_hints(self, text: str, mood: str) -> str:
        """Add subtle pauses and expression based on mood"""
        # Add appropriate pacing based on mood
        mood_pacing = {
            "exciting": text,  # Normal pace for excitement
            "calm": text,      # Gentle pace
            "happy": text,     # Upbeat
            "sad": text,       # Slower, softer
            "mysterious": text,  # Dramatic pauses
            "funny": text,     # Playful
        }
        
        result = mood_pacing.get(mood.lower(), text)
        
        # Add gentle pauses after sentences for children
        result = result.replace(". ", "... ")
        result = result.replace("! ", "!... ")
        result = result.replace("? ", "?... ")
        
        return result
    
    def _select_voice_for_character(self, name: str) -> str:
        """
        Choose a TTS voice for a given character name using config mappings, with stable fallback.
        """
        name_key = (name or "").strip().lower()
        mapping = self.config.audio.character_voices or {}
        if name_key in mapping:
            return mapping[name_key]
        # Stable hash-based selection among a few friendly voices
        candidates = [
            mapping.get("female_default", "nova"),
            mapping.get("neutral_default", "shimmer"),
            mapping.get("male_default", "onyx"),
        ]
        idx = abs(hash(name_key)) % len(candidates)
        return candidates[idx]

    def generate_scene_dialogue_audio(
        self,
        scene,
        project_name: str
    ) -> GeneratedAudio:
        """
        Generate per-character dialogue audio for a scene and combine into one track.
        Requires scene.dialogues to be populated.
        """
        self._ensure_dirs(project_name)
        dialogues = scene.dialogues or []
        if not dialogues:
            # Fallback to single-scene narration
            return self.generate_scene_narration(scene, project_name)

        clips_meta: List[DialogueClip] = []
        audio_line_paths: List[AudioFileClip] = []
        gap = 0.3  # seconds between lines
        current_time = 0.0

        # helper to produce one line audio and return path + duration
        def synth_line(speaker: str, text: str, line_idx: int) -> str:
            voice = self._select_voice_for_character(speaker)
            out_path = str(self.output_dir / project_name / "audio" / f"dialogue_{scene.scene_number:02d}_{line_idx:02d}.mp3")
            provider = self.config.audio.provider
            # Try provider sequence: azure -> openai -> gtts
            last_err = None
            if provider in ("azure", "auto"):
                try:
                    url = f"{self.config.azure.endpoint}/openai/deployments/{self.config.azure.tts_deployment}/audio/speech?api-version={self.config.azure.api_version}"
                    headers = {"Content-Type": "application/json", "Api-Key": self.config.azure.api_key}
                    payload = {"model": self.config.audio.model, "voice": voice, "input": text, "response_format": "mp3"}
                    resp = httpx.post(url, headers=headers, json=payload, timeout=120.0)
                    resp.raise_for_status()
                    with open(out_path, "wb") as f:
                        f.write(resp.content)
                    return out_path
                except Exception as e:
                    last_err = e
            if provider in ("openai", "auto"):
                try:
                    from openai import OpenAI
                    client = OpenAI(api_key=self.config.openai_api_key)
                    r = client.audio.speech.create(model=self.config.audio.model, voice=voice, input=text, response_format="mp3")
                    r.stream_to_file(out_path)
                    return out_path
                except Exception as e:
                    last_err = e
            # gTTS fallback with character voice differentiation
            try:
                from gtts import gTTS
                # Use different accents/TLDs for different characters
                speaker_lower = speaker.lower() if speaker else ""
                
                # Map characters to different English accents for variety
                accent_map = {
                    'narrator': ('en', 'com'),      # US English
                    'buddy': ('en', 'co.in'),       # Indian English (friendly)
                    'panda': ('en', 'co.in'),       # Indian English
                    'sneha': ('en', 'co.in'),       # Indian English (girl)
                    'male': ('en', 'co.uk'),        # British English
                    'female': ('en', 'com.au'),     # Australian English
                }
                
                # Find matching accent or use default
                lang, tld = 'en', 'com'
                for key, (l, t) in accent_map.items():
                    if key in speaker_lower:
                        lang, tld = l, t
                        break
                
                tts = gTTS(text=text, lang=lang, tld=tld, slow=False)
                tts.save(out_path)
                return out_path
            except Exception as e:
                # Final fallback: create a silent placeholder audio with estimated duration
                try:
                    def silence_fn(_t):
                        return 0
                    # rough estimate: 150 wpm => 2.5 wps -> 0.4s per word
                    words = max(1, len(text.split()))
                    est = max(0.8, min(6.0, words * 0.42))
                    AudioClip(silence_fn, duration=est).write_audiofile(out_path, logger=None)
                    return out_path
                except Exception as e2:
                    raise RuntimeError(f"All TTS providers failed for line '{text}': {last_err or ''} / {e} / {e2}")

        # Synthesize each line, gather timings
        for idx, line in enumerate(dialogues, start=1):
            line_path = synth_line(line.speaker, line.text, idx)
            line_duration = self._get_audio_duration(line_path)
            clips_meta.append(DialogueClip(
                scene_number=scene.scene_number,
                speaker=line.speaker,
                text=line.text,
                audio_path=line_path,
                start_time=current_time,
                end_time=current_time + line_duration
            ))
            current_time += line_duration + gap
            # We'll load into AudioFileClip later when concatenating

        # Build combined track
        def silence_fn(_t):
            return 0
        combined_clips = []
        for i, meta in enumerate(clips_meta):
            clip = AudioFileClip(meta.audio_path)
            combined_clips.append(clip)
            if i < len(clips_meta) - 1:
                combined_clips.append(AudioClip(silence_fn, duration=gap))
        combined = concatenate_audioclips(combined_clips)
        combined_path = str(self.output_dir / project_name / "audio" / f"dialogue_{scene.scene_number:02d}.mp3")
        combined.write_audiofile(combined_path, logger=None)
        duration = combined.duration
        # cleanup
        combined.close()
        for c in combined_clips:
            if hasattr(c, "close"):
                c.close()

        return GeneratedAudio(
            scene_number=scene.scene_number,
            audio_path=combined_path,
            duration_seconds=duration,
            narration_text=" ".join([d.text for d in dialogues]),
            dialogue_clips=clips_meta
        )

    async def generate_all_dialogues_async(
        self,
        parsed_story,
        project_name: str,
        progress_callback=None
    ) -> List[GeneratedAudio]:
        """
        Generate per-scene dialogue audio for the entire story.
        """
        self._ensure_dirs(project_name)
        outputs: List[GeneratedAudio] = []
        total = len(parsed_story.scenes)
        for sc in parsed_story.scenes:
            ga = self.generate_scene_dialogue_audio(sc, project_name)
            outputs.append(ga)
            if progress_callback:
                progress_callback(len(outputs), total)
            await asyncio.sleep(0.2)
        return outputs

    def generate_all_dialogues(
        self,
        parsed_story,
        project_name: str,
        progress_callback=None
    ) -> List[GeneratedAudio]:
        """Sync wrapper for dialogue generation."""
        return asyncio.run(self.generate_all_dialogues_async(parsed_story, project_name, progress_callback))
    
    async def generate_all_narrations_async(
        self,
        parsed_story: ParsedStory,
        project_name: str,
        progress_callback=None
    ) -> List[GeneratedAudio]:
        """
        Generate narration for all scenes.
        
        Args:
            parsed_story: The parsed story with scenes
            project_name: Name for organizing output
            progress_callback: Optional callback(current, total) for progress updates
            
        Returns:
            List of GeneratedAudio objects
        """
        self._ensure_dirs(project_name)
        
        audios = []
        total = len(parsed_story.scenes)
        
        for scene in parsed_story.scenes:
            audio = self.generate_scene_narration(scene, project_name)
            audios.append(audio)
            
            if progress_callback:
                progress_callback(len(audios), total)
            
            # Small delay between requests
            await asyncio.sleep(0.5)
        
        return audios
    
    def generate_all_narrations(
        self,
        parsed_story: ParsedStory,
        project_name: str,
        progress_callback=None
    ) -> List[GeneratedAudio]:
        """
        Synchronous wrapper for generating all narrations.
        """
        return asyncio.run(
            self.generate_all_narrations_async(parsed_story, project_name, progress_callback)
        )
    
    def combine_all_audio(
        self,
        audio_files: List[GeneratedAudio],
        project_name: str,
        gap_duration: float = 1.0
    ) -> str:
        """
        Combine all narration audio files into a single track using moviepy.
        
        Args:
            audio_files: List of GeneratedAudio objects
            project_name: Project name for output path
            gap_duration: Silence duration between scenes (seconds)
            
        Returns:
            Path to the combined audio file
        """
        self._ensure_dirs(project_name)
        
        # Sort by scene number
        sorted_audio = sorted(audio_files, key=lambda x: x.scene_number)
        
        # Create silence clip
        def make_silence(t):
            return 0
        silence = AudioClip(make_silence, duration=gap_duration)
        
        # Load and concatenate all audio clips
        clips = []
        for i, audio in enumerate(sorted_audio):
            clip = AudioFileClip(audio.audio_path)
            clips.append(clip)
            
            # Add gap between scenes (except after last)
            if i < len(sorted_audio) - 1:
                clips.append(silence)
        
        # Concatenate
        combined = concatenate_audioclips(clips)
        
        # Export combined audio
        output_path = str(
            self.output_dir / project_name / "audio" / "full_narration.mp3"
        )
        combined.write_audiofile(output_path, logger=None)
        
        # Cleanup
        combined.close()
        for clip in clips:
            if hasattr(clip, 'close'):
                clip.close()
        
        return output_path
    
    def get_scene_timings(
        self,
        audio_files: List[GeneratedAudio],
        gap_duration: float = 1.0
    ) -> List[tuple]:
        """
        Calculate start and end times for each scene in the combined audio.
        
        Returns:
            List of (start_time, end_time, scene_number) tuples
        """
        sorted_audio = sorted(audio_files, key=lambda x: x.scene_number)
        
        timings = []
        current_time = 0.0
        
        for audio in sorted_audio:
            start_time = current_time
            end_time = start_time + audio.duration_seconds
            
            timings.append((start_time, end_time, audio.scene_number))
            
            # Add gap duration for next scene
            current_time = end_time + gap_duration
        
        return timings
