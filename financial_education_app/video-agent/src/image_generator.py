"""
Image Generator - Creates cartoon images for story scenes
Supports Perplexity API for prompt enhancement to improve image quality.
"""

import asyncio
import os
import httpx
from pathlib import Path
from typing import List, Optional
from dataclasses import dataclass
from PIL import Image
import io
import time
import base64

from .config import AgentConfig
from .story_parser import Scene, ParsedStory, Character


@dataclass
class GeneratedImage:
    """Represents a generated image for a scene"""
    scene_number: int
    image_path: str
    prompt_used: str
    revised_prompt: Optional[str] = None  # DALL-E 3 may revise prompts


class PerplexityPromptEnhancer:
    """
    Uses Perplexity API to enhance image prompts for better quality cartoon images.
    This produces more detailed, artistic prompts that result in higher quality images.
    """
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("PERPLEXITY_API_KEY")
        self.enabled = bool(self.api_key)
        
        if self.enabled:
            self.base_url = "https://api.perplexity.ai/chat/completions"
            # Use sonar model (officially supported by Perplexity)
            self.model = "sonar"
    
    def enhance_prompt(self, base_prompt: str, scene: Scene) -> str:
        """
        Enhance an image generation prompt using Perplexity AI.
        
        Args:
            base_prompt: The original prompt
            scene: Scene information for context
            
        Returns:
            Enhanced prompt or original if enhancement fails
        """
        if not self.enabled:
            return base_prompt
        
        try:
            enhancement_request = f"""You are an expert at creating detailed prompts for AI image generation systems like DALL-E 3 and Stable Diffusion.

Given this scene description for a children's cartoon video:
- Setting: {scene.setting}
- Mood: {scene.mood}
- Visual Description: {scene.visual_description}

Original Prompt:
{base_prompt}

Create an enhanced, detailed prompt for generating a beautiful, child-friendly cartoon illustration. Include:
1. Specific artistic style (Disney/Pixar inspired)
2. Color palette and lighting details
3. Character expressions and poses
4. Background composition
5. Ensure it's wholesome and safe for children

Return ONLY the enhanced prompt text, nothing else. Keep it under 500 characters."""

            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            }
            
            payload = {
                "model": self.model,
                "messages": [
                    {
                        "role": "system",
                        "content": "You are an AI art prompt engineer specializing in children's content and cartoon illustrations. Return only the enhanced prompt, no explanations."
                    },
                    {"role": "user", "content": enhancement_request}
                ],
                "max_tokens": 400,
                "temperature": 0.7,
            }
            
            response = httpx.post(
                self.base_url, 
                headers=headers, 
                json=payload,
                timeout=30.0
            )
            
            if response.status_code == 200:
                enhanced = response.json()["choices"][0]["message"]["content"].strip()
                # Remove any quotes or extra formatting
                enhanced = enhanced.strip('"').strip("'").strip()
                # Validate the response
                if len(enhanced) > 50 and len(enhanced) < 1000:
                    return enhanced
                return base_prompt
            else:
                print(f"   Perplexity API returned status {response.status_code}")
                return base_prompt
                
        except Exception as e:
            print(f"   ⚠️  Perplexity prompt enhancement failed: {e}")
            return base_prompt


class ImageGenerator:
    """
    Generates cartoon images for story scenes using AI image generation.
    Supports Azure OpenAI DALL-E, OpenAI DALL-E 3, Replicate (Stable Diffusion XL),
    and AI Horde (free). Can optionally use Perplexity API to enhance prompts.
    """
    
    def __init__(self, config: AgentConfig):
        self.config = config
        self.output_dir = Path(config.output_dir)
        self.temp_dir = Path(config.temp_dir)
        
        # Initialize Perplexity prompt enhancer (uses PERPLEXITY_API_KEY env var)
        self.prompt_enhancer = PerplexityPromptEnhancer()
        if self.prompt_enhancer.enabled:
            print("✨ Perplexity API enabled for prompt enhancement")
        
    def _ensure_dirs(self, project_name: str):
        """Ensure output directories exist"""
        (self.output_dir / project_name / "images").mkdir(parents=True, exist_ok=True)
        self.temp_dir.mkdir(parents=True, exist_ok=True)
        
    def _build_image_prompt(
        self, 
        scene: Scene, 
        characters: List[Character],
        subject: str
    ) -> str:
        """Build a detailed prompt for image generation"""
        # Find characters in this scene
        scene_chars = [c for c in characters if c.name in scene.characters_present]
        
        char_desc = ""
        if scene_chars:
            char_desc = "Characters: " + ", ".join([
                f"{c.name} - {c.visual_traits}" for c in scene_chars
            ])
        
        prompt = f"""Create a children's cartoon illustration in a colorful, friendly Pixar/Disney animation style.

Scene Description: {scene.visual_description}

Setting: {scene.setting}
Mood: {scene.mood} atmosphere
{char_desc}

Theme/Subject: {subject}

Art Style Requirements:
- Bright, vibrant colors with soft gradients
- Child-friendly and wholesome
- Expressive cartoon characters with big eyes
- Detailed, whimsical background
- Professional children's book illustration quality
- No text or words in the image
- Safe for all ages
- 2D cartoon animation style"""

        return prompt
    
    def generate_scene_image(
        self, 
        scene: Scene, 
        characters: List[Character],
        subject: str,
        project_name: str
    ) -> GeneratedImage:
        """
        Generate a single image for a scene with intelligent fallback chain.
        
        Tries providers in this order:
        1. Configured provider (Azure/OpenAI/Replicate/Horde)
        2. AI Horde (free, no API key needed)
        3. Placeholder image (guaranteed to work)
        
        Args:
            scene: The scene to generate an image for
            characters: List of all characters in the story
            subject: The story's subject/theme
            project_name: Name for organizing output files
            
        Returns:
            GeneratedImage with the path to the saved image
        """
        self._ensure_dirs(project_name)
        
        # Build base prompt
        prompt = self._build_image_prompt(scene, characters, subject)
        
        # Enhance prompt with Perplexity AI if available
        if self.prompt_enhancer.enabled:
            print(f"   🔮 Enhancing prompt with Perplexity AI...")
            enhanced_prompt = self.prompt_enhancer.enhance_prompt(prompt, scene)
            if enhanced_prompt != prompt:
                print(f"   ✓ Prompt enhanced successfully")
                prompt = enhanced_prompt
        
        provider = self.config.image.provider
        errors = []
        
        # Try configured provider first
        if provider == "azure":
            try:
                return self._generate_with_azure_dalle(scene, prompt, project_name)
            except Exception as e:
                errors.append(f"Azure DALL-E: {e}")
                print(f"⚠️  Azure DALL-E not available: {e}")
                
        elif provider == "openai":
            try:
                return self._generate_with_dalle(scene, prompt, project_name)
            except Exception as e:
                errors.append(f"OpenAI DALL-E: {e}")
                print(f"⚠️  OpenAI DALL-E not available: {e}")
                
        elif provider == "replicate":
            try:
                return self._generate_with_replicate(scene, prompt, project_name)
            except Exception as e:
                errors.append(f"Replicate: {e}")
                print(f"⚠️  Replicate not available: {e}")
                
        elif provider == "horde":
            try:
                return self._generate_with_horde(scene, prompt, project_name)
            except Exception as e:
                errors.append(f"AI Horde: {e}")
                print(f"⚠️  AI Horde failed: {e}")
        
        elif provider == "pollinations":
            try:
                return self._generate_with_pollinations(scene, prompt, project_name)
            except Exception as e:
                errors.append(f"Pollinations: {e}")
                print(f"⚠️  Pollinations.ai failed: {e}")
                
        elif provider == "placeholder":
            return self._generate_placeholder_image(scene, prompt, project_name)
        
        # Fallback chain: Try other available providers
        print(f"🔄 Trying fallback providers...")
        
        # Try AI Horde (free, no API key required)
        if provider != "horde":
            try:
                print("   Trying AI Horde (free, no API key needed)...")
                return self._generate_with_horde(scene, prompt, project_name)
            except Exception as e:
                errors.append(f"AI Horde fallback: {e}")
                print(f"   AI Horde failed: {e}")
        
        # Try OpenAI if key available
        if provider != "openai" and os.getenv("OPENAI_API_KEY"):
            try:
                print("   Trying OpenAI DALL-E...")
                return self._generate_with_dalle(scene, prompt, project_name)
            except Exception as e:
                errors.append(f"OpenAI fallback: {e}")
                print(f"   OpenAI DALL-E failed: {e}")
        
        # Try Replicate if token available
        if provider != "replicate" and os.getenv("REPLICATE_API_TOKEN"):
            try:
                print("   Trying Replicate...")
                return self._generate_with_replicate(scene, prompt, project_name)
            except Exception as e:
                errors.append(f"Replicate fallback: {e}")
                print(f"   Replicate failed: {e}")
        
        # Try Pollinations.ai (completely free, no API key)
        try:
            print("   🌸 Trying Pollinations.ai (free, no API key needed)...")
            return self._generate_with_pollinations(scene, prompt, project_name)
        except Exception as e:
            errors.append(f"Pollinations: {e}")
            print(f"   Pollinations failed: {e}")
        
        # Final fallback: placeholder image
        print(f"⚠️  All image generation providers failed. Using placeholder.")
        print(f"   Errors: {'; '.join(errors)}")
        print(f"💡 Tip: Set OPENAI_API_KEY environment variable for best quality images")
        return self._generate_placeholder_image(scene, prompt, project_name)
    
    def _generate_with_azure_dalle(
        self,
        scene: Scene,
        prompt: str,
        project_name: str
    ) -> GeneratedImage:
        """Generate image using Azure OpenAI DALL-E"""
        url = f"{self.config.azure.endpoint}/openai/deployments/{self.config.azure.dalle_deployment}/images/generations?api-version={self.config.azure.api_version}"
        
        headers = {
            "Content-Type": "application/json",
            "Api-Key": self.config.azure.api_key
        }
        
        payload = {
            "prompt": prompt,
            "size": self.config.image.size,
            "quality": self.config.image.quality,
            "style": self.config.image.style,
            "n": 1
        }
        
        response = httpx.post(url, headers=headers, json=payload, timeout=120.0)
        response.raise_for_status()
        
        result = response.json()
        image_url = result["data"][0]["url"]
        revised_prompt = result["data"][0].get("revised_prompt")
        
        # Download and save the image
        image_path = self._download_and_save_image(
            image_url,
            project_name,
            scene.scene_number
        )
        
        return GeneratedImage(
            scene_number=scene.scene_number,
            image_path=image_path,
            prompt_used=prompt,
            revised_prompt=revised_prompt
        )
    
    def _generate_with_dalle(
        self, 
        scene: Scene, 
        prompt: str, 
        project_name: str
    ) -> GeneratedImage:
        """Generate image using OpenAI DALL-E 3"""
        from openai import OpenAI
        client = OpenAI(api_key=self.config.openai_api_key)
        
        response = client.images.generate(
            model=self.config.image.model,
            prompt=prompt,
            size=self.config.image.size,
            quality=self.config.image.quality,
            style=self.config.image.style,
            n=1,
            response_format="url"
        )
        
        image_url = response.data[0].url
        revised_prompt = response.data[0].revised_prompt
        
        # Download and save the image
        image_path = self._download_and_save_image(
            image_url, 
            project_name, 
            scene.scene_number
        )
        
        return GeneratedImage(
            scene_number=scene.scene_number,
            image_path=image_path,
            prompt_used=prompt,
            revised_prompt=revised_prompt
        )
    
    def _generate_with_replicate(
        self, 
        scene: Scene, 
        prompt: str, 
        project_name: str
    ) -> GeneratedImage:
        """Generate image using Replicate (Stable Diffusion XL)"""
        try:
            import replicate
        except ImportError:
            raise ImportError("Please install replicate: pip install replicate")
        
        output = replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            input={
                "prompt": prompt,
                "negative_prompt": "scary, violent, blood, dark, creepy, realistic, photo, adult content, nsfw",
                "width": 1024,
                "height": 1024,
                "num_outputs": 1,
                "scheduler": "K_EULER",
                "num_inference_steps": 30,
                "guidance_scale": 7.5,
            }
        )
        
        image_url = output[0] if isinstance(output, list) else output
        
        image_path = self._download_and_save_image(
            image_url, 
            project_name, 
            scene.scene_number
        )
        
        return GeneratedImage(
            scene_number=scene.scene_number,
            image_path=image_path,
            prompt_used=prompt,
            revised_prompt=None
        )
    
    def _generate_placeholder_image(
        self,
        scene: Scene,
        prompt: str,
        project_name: str
    ) -> GeneratedImage:
        """Generate a placeholder image when AI image generation is not available"""
        from PIL import ImageDraw, ImageFont
        import textwrap
        
        width, height = self.config.video.resolution
        
        # Create a colorful gradient background based on scene mood
        mood_colors = {
            "happy": [(255, 223, 186), (255, 182, 193)],      # Warm peachy-pink
            "exciting": [(255, 200, 87), (255, 107, 107)],    # Orange-red
            "calm": [(173, 216, 230), (176, 224, 230)],       # Light blue
            "sad": [(176, 196, 222), (192, 192, 192)],        # Gray-blue
            "mysterious": [(147, 112, 219), (138, 43, 226)],  # Purple
            "funny": [(255, 255, 153), (144, 238, 144)],      # Yellow-green
        }
        
        colors = mood_colors.get(scene.mood.lower(), [(200, 230, 255), (255, 200, 230)])
        color1, color2 = colors
        
        # Create gradient
        img = Image.new('RGB', (width, height))
        for y in range(height):
            ratio = y / height
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
            for x in range(width):
                img.putpixel((x, y), (r, g, b))
        
        draw = ImageDraw.Draw(img)
        
        # Try to use a nice font, fallback to default
        try:
            font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 60)
            font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 30)
        except:
            font_large = ImageFont.load_default()
            font_small = ImageFont.load_default()
        
        # Add scene number
        scene_text = f"Scene {scene.scene_number}"
        draw.text((width//2, 100), scene_text, fill=(255, 255, 255), font=font_large, anchor="mm")
        
        # Add setting
        setting_text = f"📍 {scene.setting}"
        draw.text((width//2, 180), setting_text, fill=(50, 50, 50), font=font_small, anchor="mm")
        
        # Add mood
        mood_text = f"😊 Mood: {scene.mood}"
        draw.text((width//2, 230), mood_text, fill=(50, 50, 50), font=font_small, anchor="mm")
        
        # Add visual description (wrapped)
        wrapped = textwrap.wrap(scene.visual_description, width=60)
        y_pos = 350
        for line in wrapped[:5]:  # Max 5 lines
            draw.text((width//2, y_pos), line, fill=(30, 30, 30), font=font_small, anchor="mm")
            y_pos += 40
        
        # Add placeholder notice
        notice = "🎨 AI Image Generation Placeholder"
        draw.text((width//2, height - 100), notice, fill=(100, 100, 100), font=font_small, anchor="mm")
        
        # Save image
        image_path = str(
            self.output_dir / project_name / "images" / f"scene_{scene.scene_number:02d}.png"
        )
        img.save(image_path, "PNG")
        
        return GeneratedImage(
            scene_number=scene.scene_number,
            image_path=image_path,
            prompt_used=prompt,
            revised_prompt=None
        )
    
    def _download_and_save_image(
        self, 
        url: str, 
        project_name: str, 
        scene_number: int
    ) -> str:
        """Download image from URL and save locally"""
        response = httpx.get(url, follow_redirects=True, timeout=60.0)
        response.raise_for_status()
        
        # Process with PIL to ensure proper format
        image = Image.open(io.BytesIO(response.content))
        
        # Resize to video resolution if needed
        target_size = self.config.video.resolution
        image = self._resize_for_video(image, target_size)
        
        # Save as PNG for quality
        image_path = str(
            self.output_dir / project_name / "images" / f"scene_{scene_number:02d}.png"
        )
        image.save(image_path, "PNG", quality=95)
        
        return image_path
    
    def _resize_for_video(self, image: Image.Image, target_size: tuple) -> Image.Image:
        """Resize image to fit video dimensions while maintaining aspect ratio"""
        target_width, target_height = target_size
        
        # Calculate scaling to fill the frame (cover mode)
        img_ratio = image.width / image.height
        target_ratio = target_width / target_height
        
        if img_ratio > target_ratio:
            # Image is wider - fit height
            new_height = target_height
            new_width = int(new_height * img_ratio)
        else:
            # Image is taller - fit width
            new_width = target_width
            new_height = int(new_width / img_ratio)
        
        # Resize
        image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Center crop to exact target size
        left = (new_width - target_width) // 2
        top = (new_height - target_height) // 2
        right = left + target_width
        bottom = top + target_height
        
        image = image.crop((left, top, right, bottom))
        
        return image

    def _parse_size(self, size_str: str) -> tuple:
        try:
            w, h = size_str.lower().split("x")
            return int(w), int(h)
        except Exception:
            return (1024, 1024)
    
    def _generate_with_pollinations(
        self,
        scene: Scene,
        prompt: str,
        project_name: str
    ) -> GeneratedImage:
        """
        Generate image using Pollinations.ai (completely free, no API key required).
        This service provides free AI image generation via a simple URL-based API.
        """
        import urllib.parse
        
        # Clean and encode prompt for URL
        # Add cartoon/kid-friendly style keywords
        enhanced_prompt = f"{prompt}, cartoon style, vibrant colors, child-friendly, cute, safe for kids, pixar style"
        
        # Truncate if too long (URL limit)
        if len(enhanced_prompt) > 800:
            enhanced_prompt = enhanced_prompt[:800]
        
        encoded_prompt = urllib.parse.quote(enhanced_prompt)
        
        # Pollinations.ai URL format
        width, height = self._parse_size(self.config.image.size)
        # Use reasonable size
        width = min(width, 1024)
        height = min(height, 1024)
        
        # Generate unique seed based on scene
        seed = hash(f"{scene.scene_number}_{scene.setting}_{time.time()}") % 1000000
        
        # Pollinations.ai API URL
        image_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width={width}&height={height}&seed={seed}&nologo=true"
        
        print(f"   Generating image via Pollinations.ai...")
        
        # Download the image (Pollinations generates on-the-fly)
        max_retries = 3
        for attempt in range(max_retries):
            try:
                response = httpx.get(image_url, follow_redirects=True, timeout=120.0)
                
                if response.status_code == 200 and len(response.content) > 1000:
                    # Valid image received
                    image = Image.open(io.BytesIO(response.content))
                    
                    # Resize to video resolution
                    target_size = self.config.video.resolution
                    image = self._resize_for_video(image, target_size)
                    
                    # Save image
                    image_path = str(
                        self.output_dir / project_name / "images" / f"scene_{scene.scene_number:02d}.png"
                    )
                    image.save(image_path, "PNG", quality=95)
                    
                    print(f"   ✓ Image generated successfully via Pollinations.ai")
                    
                    return GeneratedImage(
                        scene_number=scene.scene_number,
                        image_path=image_path,
                        prompt_used=enhanced_prompt,
                        revised_prompt=None
                    )
                else:
                    if attempt < max_retries - 1:
                        print(f"   Retry {attempt + 1}/{max_retries}...")
                        time.sleep(2)
                    
            except Exception as e:
                if attempt < max_retries - 1:
                    print(f"   Retry {attempt + 1}/{max_retries} after error: {e}")
                    time.sleep(2)
                else:
                    raise
        
        raise RuntimeError("Pollinations.ai failed after multiple retries")

    def _generate_with_horde(
        self,
        scene: Scene,
        prompt: str,
        project_name: str
    ) -> GeneratedImage:
        """
        Generate image using AI Horde (free, crowd-powered). 
        Anonymous access supported with "0000000000" key.
        """
        base = "https://stablehorde.net/api/v2"  # Use stablehorde.net endpoint
        post_url = f"{base}/generate/async"
        
        # Headers for AI Horde - anonymous key is "0000000000"
        api_key = os.getenv("HORDE_API_KEY", "0000000000")
        headers = {
            "apikey": api_key,
            "Content-Type": "application/json",
            "Client-Agent": "FinLitQuestVideoAgent:1.0:github.com/finlitquest"
        }
        
        # Parse size - AI Horde requires specific sizes (multiples of 64)
        width, height = self._parse_size(self.config.image.size)
        # Round to nearest 64
        width = (width // 64) * 64
        height = (height // 64) * 64
        # Limit to reasonable size for faster generation
        width = min(width, 768)
        height = min(height, 768)
        
        # Simplified prompt for better results
        simplified_prompt = prompt[:500] if len(prompt) > 500 else prompt
        
        payload = {
            "prompt": f"{simplified_prompt} ### child-friendly, cartoon, colorful, safe for kids",
            "params": {
                "sampler_name": "k_euler_a",
                "cfg_scale": 7.5,
                "steps": 25,
                "width": width,
                "height": height,
                "karras": True,
                "post_processing": ["GFPGAN"]  # Face enhancement
            },
            "nsfw": False,
            "censor_nsfw": True,
            "trusted_workers": False,
            "slow_workers": True,
            "models": ["Deliberate", "stable_diffusion", "Anything Diffusion"],  # Multiple models for availability
            "r2": True,
            "shared": True  # Share results to help the community
        }
        
        print(f"   🌐 Connecting to AI Horde (free image generation)...")
        
        # Submit job
        resp = httpx.post(post_url, headers=headers, json=payload, timeout=60.0)
        
        # Handle specific error cases
        if resp.status_code == 403:
            error_data = resp.json() if resp.content else {}
            raise RuntimeError(f"AI Horde access denied: {error_data.get('message', 'Unknown error')}")
        
        resp.raise_for_status()
        job = resp.json()
        req_id = job.get("id")
        if not req_id:
            raise RuntimeError(f"Horde: No request id: {job}")
        # Poll
        check_url = f"{base}/generate/check/{req_id}"
        status_url = f"{base}/generate/status/{req_id}"
        start = time.time()
        while True:
            chk = httpx.get(check_url, headers=headers, timeout=30.0)
            if chk.status_code == 404:
                time.sleep(2)
                continue
            chk.raise_for_status()
            cjson = chk.json()
            if cjson.get("done", False):
                break
            wait_time = cjson.get("wait_time", 3)
            time.sleep(min(5, max(1, wait_time)))
            if time.time() - start > 600:
                raise TimeoutError("Horde generation timed out.")
        # Fetch result
        st = httpx.get(status_url, headers=headers, timeout=60.0)
        st.raise_for_status()
        sj = st.json()
        gens = sj.get("generations", [])
        if not gens:
            raise RuntimeError(f"Horde: No generations returned: {sj}")
        b64 = gens[0].get("img")
        if not b64:
            raise RuntimeError("Horde: Missing image data.")
        content = base64.b64decode(b64)
        image = Image.open(io.BytesIO(content))
        target_size = self.config.video.resolution
        image = self._resize_for_video(image, target_size)
        image_path = str(self.output_dir / project_name / "images" / f"scene_{scene.scene_number:02d}.png")
        image.save(image_path, "PNG", quality=95)
        return GeneratedImage(
            scene_number=scene.scene_number,
            image_path=image_path,
            prompt_used=prompt,
            revised_prompt=None
        )
    
    async def generate_all_images_async(
        self,
        parsed_story: ParsedStory,
        project_name: str,
        progress_callback=None
    ) -> List[GeneratedImage]:
        """
        Generate images for all scenes asynchronously.
        
        Args:
            parsed_story: The parsed story with scenes
            project_name: Name for organizing output
            progress_callback: Optional callback(current, total) for progress updates
            
        Returns:
            List of GeneratedImage objects
        """
        self._ensure_dirs(project_name)
        
        images = []
        total = len(parsed_story.scenes)
        
        # Process in batches to respect rate limits
        batch_size = self.config.max_concurrent_generations
        
        for i in range(0, total, batch_size):
            batch = parsed_story.scenes[i:i + batch_size]
            
            # Generate batch (sequential for DALL-E to respect rate limits)
            for scene in batch:
                image = self.generate_scene_image(
                    scene,
                    parsed_story.characters,
                    parsed_story.subject,
                    project_name
                )
                images.append(image)
                
                if progress_callback:
                    progress_callback(len(images), total)
                
                # Small delay between requests
                await asyncio.sleep(1)
        
        return images
    
    def generate_all_images(
        self,
        parsed_story: ParsedStory,
        project_name: str,
        progress_callback=None
    ) -> List[GeneratedImage]:
        """
        Synchronous wrapper for generating all scene images.
        """
        return asyncio.run(
            self.generate_all_images_async(parsed_story, project_name, progress_callback)
        )
