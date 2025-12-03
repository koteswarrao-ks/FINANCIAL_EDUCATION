"""
Character Generator - Creates per-character cartoon sprites for overlay
"""

from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List
import io
import os
import time
import base64
import httpx
from PIL import Image, ImageDraw, ImageFont

from .config import AgentConfig
from .story_parser import Character


@dataclass
class CharacterSprite:
    name: str
    image_path: str


class CharacterGenerator:
    """
    Generates standalone character images (sprites) for overlay in scenes.
    Falls back to placeholder sprites if no image provider is available.
    """
    def __init__(self, config: AgentConfig):
        self.config = config
        self.output_dir = Path(config.output_dir)
        self.temp_dir = Path(config.temp_dir)

    def _ensure_dirs(self, project_name: str):
        (self.output_dir / project_name / "characters").mkdir(parents=True, exist_ok=True)
        self.temp_dir.mkdir(parents=True, exist_ok=True)

    def generate_all(self, characters: List[Character], subject: str, project_name: str) -> Dict[str, CharacterSprite]:
        self._ensure_dirs(project_name)
        sprites: Dict[str, CharacterSprite] = {}
        for c in characters:
            path = self._generate_character(c, subject, project_name)
            sprites[c.name] = CharacterSprite(name=c.name, image_path=path)
        return sprites

    def _generate_character(self, character: Character, subject: str, project_name: str) -> str:
        provider = self.config.character_image.provider
        prompt = self._build_prompt(character, subject)
        out_path = str(self.output_dir / project_name / "characters" / f"{character.name.lower().replace(' ', '_')}.png")

        if provider == "replicate":
            try:
                return self._gen_replicate(prompt, out_path)
            except Exception as e:
                # Fallback to placeholder
                return self._placeholder_sprite(character.name, out_path)
        elif provider == "openai":
            try:
                return self._gen_openai(prompt, out_path)
            except Exception:
                return self._placeholder_sprite(character.name, out_path)
        elif provider == "azure":
            try:
                return self._gen_azure(prompt, out_path)
            except Exception:
                return self._placeholder_sprite(character.name, out_path)
        elif provider == "horde":
            try:
                return self._gen_horde(prompt, out_path)
            except Exception as e:
                print(f"Horde character generation failed for {character.name}: {e}")
                if os.getenv("REPLICATE_API_TOKEN"):
                    try:
                        return self._gen_replicate(prompt, out_path)
                    except Exception as e2:
                        print(f"Replicate fallback failed: {e2}, using placeholder.")
                        return self._placeholder_sprite(character.name, out_path)
                return self._placeholder_sprite(character.name, out_path)
        else:
            return self._placeholder_sprite(character.name, out_path)

    def _build_prompt(self, character: Character, subject: str) -> str:
        return (
            f"Create a standalone full-body cartoon character sticker on a plain white background. "
            f"Character: {character.name}. Visual traits: {character.visual_traits}. "
            f"Style: {self.config.image.cartoon_style}. {self.config.character_image.style_hint}. "
            f"Theme: {subject}. Centered, single character, no text."
        )

    def _white_to_transparent(self, image: Image.Image) -> Image.Image:
        image = image.convert("RGBA")
        datas = image.getdata()
        threshold = self.config.character_image.remove_white_threshold
        new_data = []
        for item in datas:
            if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
        image.putdata(new_data)
        return image

    def _save_processed(self, content: bytes, out_path: str) -> str:
        img = Image.open(io.BytesIO(content)).convert("RGBA")
        if self.config.character_image.transparent_background:
            img = self._white_to_transparent(img)
        img.save(out_path, "PNG")
        return out_path

    def _gen_azure(self, prompt: str, out_path: str) -> str:
        url = f"{self.config.azure.endpoint}/openai/deployments/{self.config.azure.dalle_deployment}/images/generations?api-version={self.config.azure.api_version}"
        headers = {"Content-Type": "application/json", "Api-Key": self.config.azure.api_key}
        payload = {"prompt": prompt, "size": self.config.character_image.size, "n": 1}
        resp = httpx.post(url, headers=headers, json=payload, timeout=120.0)
        resp.raise_for_status()
        url_img = resp.json()["data"][0]["url"]
        img_resp = httpx.get(url_img, follow_redirects=True, timeout=60.0)
        img_resp.raise_for_status()
        return self._save_processed(img_resp.content, out_path)

    def _gen_openai(self, prompt: str, out_path: str) -> str:
        from openai import OpenAI
        client = OpenAI(api_key=self.config.openai_api_key)
        res = client.images.generate(
            model=self.config.image.model,
            prompt=prompt,
            size=self.config.character_image.size,
            n=1,
            response_format="b64_json"
        )
        import base64
        b64 = res.data[0].b64_json
        content = base64.b64decode(b64)
        return self._save_processed(content, out_path)

    def _gen_replicate(self, prompt: str, out_path: str) -> str:
        import replicate
        output = replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            input={
                "prompt": prompt,
                "negative_prompt": "background, multiple characters, text, watermark, realistic, photo, nsfw, dark, scary",
                "width": 768,
                "height": 768,
                "num_outputs": 1,
                "scheduler": "K_EULER",
                "num_inference_steps": 35,
                "guidance_scale": 8.5,
            }
        )
        img_url = output[0] if isinstance(output, list) else output
        img_resp = httpx.get(img_url, follow_redirects=True, timeout=60.0)
        img_resp.raise_for_status()
        return self._save_processed(img_resp.content, out_path)

    def _parse_size(self, size_str: str) -> tuple:
        try:
            w, h = size_str.lower().split("x")
            return int(w), int(h)
        except Exception:
            return (768, 768)

    def _gen_horde(self, prompt: str, out_path: str) -> str:
        """
        Generate a character sprite using AI Horde (free). We request white background
        and then remove it to get transparency.
        """
        base = "https://aihorde.net/api/v2"
        post_url = f"{base}/generate/async"
        headers = {
            "apikey": os.getenv("HORDE_API_KEY", "0000000000"),
            "Client-Agent": "CartoonVideoAgent:1.0.0:cursor"
        }
        width, height = self._parse_size(self.config.character_image.size)
        payload = {
            "prompt": prompt + " plain white background, single centered character, sticker style",
            "params": {
                "sampler_name": "k_euler",
                "cfg_scale": 8,
                "steps": 32,
                "width": width,
                "height": height,
                "karras": True
            },
            "nsfw": False,
            "censor_nsfw": True,
            "models": ["stable_diffusion"],
            "r2": True,
            "shared": False,
            "slow_workers": True
        }
        resp = httpx.post(post_url, headers=headers, json=payload, timeout=120.0)
        resp.raise_for_status()
        job = resp.json()
        req_id = job.get("id")
        if not req_id:
            raise RuntimeError(f"Horde: No request id: {job}")
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
        return self._save_processed(content, out_path)

    def _placeholder_sprite(self, name: str, out_path: str) -> str:
        w, h = 512, 512
        colors = [(255, 182, 193), (135, 206, 250), (255, 218, 185), (144, 238, 144)]
        bg = colors[abs(hash(name.lower())) % len(colors)]
        img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        draw.ellipse([(16, 16), (w-16, h-16)], fill=bg + (255,))
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
        except Exception:
            font = ImageFont.load_default()
        initials = "".join([p[0].upper() for p in name.split()][:2]) or "AA"
        tb = draw.textbbox((0,0), initials, font=font)
        tw, th = tb[2]-tb[0], tb[3]-tb[1]
        draw.text(((w-tw)//2, (h-th)//2), initials, font=font, fill=(255, 255, 255, 255))
        img.save(out_path, "PNG")
        return out_path


