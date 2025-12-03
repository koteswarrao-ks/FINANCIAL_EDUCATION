from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
import os
import uuid
import subprocess
import shutil
import requests as http_requests
from PIL import Image
from io import BytesIO

app = FastAPI(title="Animation Service")

INPUT_DIR = "anim_input_frames"
OUTPUT_DIR = "animated_clips"
os.makedirs(INPUT_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Cache for ffmpeg availability check
_ffmpeg_available = None
_ffmpeg_check_lock = False

def check_ffmpeg_available():
    """Check if ffmpeg exists and can run (lazy check)"""
    global _ffmpeg_available, _ffmpeg_check_lock
    
    # Return cached result if available
    if _ffmpeg_available is not None:
        return _ffmpeg_available
    
    # Prevent concurrent checks
    if _ffmpeg_check_lock:
        return False
    
    _ffmpeg_check_lock = True
    try:
        ffmpeg_path = shutil.which("ffmpeg")
        if not ffmpeg_path:
            _ffmpeg_available = False
            return False
        
        # Try to run ffmpeg -version to verify it works
        result = subprocess.run(
            [ffmpeg_path, "-version"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=3
        )
        _ffmpeg_available = result.returncode == 0
        return _ffmpeg_available
    except (subprocess.TimeoutExpired, subprocess.CalledProcessError, FileNotFoundError, Exception):
        _ffmpeg_available = False
        return False
    finally:
        _ffmpeg_check_lock = False

@app.get("/health")
def health():
    """Health check endpoint - always responds quickly"""
    try:
        ffmpeg_available = check_ffmpeg_available()
    except Exception:
        ffmpeg_available = False
    
    return {
        "status": "OK",
        "ffmpeg_available": ffmpeg_available
    }

@app.post("/animate")
def animate(payload: dict):
    if not check_ffmpeg_available():
        return JSONResponse({
            "error": "ffmpeg is not installed. Please install it with: brew install ffmpeg"
        }, status_code=503)
    
    image_url = payload.get("imageUrl")
    if not image_url:
        return JSONResponse({"error": "Missing imageUrl"}, status_code=400)

    try:
        import time
        start_time = time.time()
        
        # Step 1: Download image
        print(f"📥 Downloading image from {image_url}...")
        download_start = time.time()
        try:
            resp = http_requests.get(image_url, timeout=45)
            resp.raise_for_status()
        except http_requests.exceptions.RequestException as e:
            print(f"❌ Image download failed: {str(e)}")
            return JSONResponse({
                "error": f"Image download failed: {str(e)}"
            }, status_code=500)
        
        # Step 2: Save image
        try:
            img = Image.open(BytesIO(resp.content))
            img_name = f"{uuid.uuid4()}.png"
            img_path = os.path.join(INPUT_DIR, img_name)
            if img.mode != "RGB":
                img = img.convert("RGB")
            img.save(img_path)
            download_time = time.time() - download_start
            print(f"✅ Image downloaded in {download_time:.1f}s ({os.path.getsize(img_path)} bytes)")
        except Exception as e:
            print(f"❌ Image processing failed: {str(e)}")
            return JSONResponse({
                "error": f"Image processing failed: {str(e)}"
            }, status_code=500)

        # Step 3: Generate video - use simplest possible approach
        clip_name = f"{uuid.uuid4()}.mp4"
        clip_path = os.path.join(OUTPUT_DIR, clip_name)
        
        print(f"🎬 Starting ffmpeg animation...")
        ffmpeg_start = time.time()
        
        # Simplest possible ffmpeg command - just create a static 2-second video
        # No complex filters that could hang
        ffmpeg_cmd = [
            "ffmpeg",
            "-y",
            "-loop", "1",
            "-i", img_path,
            "-t", "2",
            "-vf", "scale=1024:1024",
            "-c:v", "libx264",
            "-preset", "ultrafast",
            "-pix_fmt", "yuv420p",
            "-movflags", "+faststart",
            "-r", "25",
            clip_path,
        ]

        try:
            result = subprocess.run(
                ffmpeg_cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=45,
                text=True
            )
            
            if result.returncode != 0:
                error_msg = f"FFmpeg failed with return code {result.returncode}"
                if result.stderr:
                    stderr_preview = result.stderr[:500]
                    error_msg += f" | Error: {stderr_preview}"
                print(f"❌ {error_msg}")
                return JSONResponse({
                    "error": "FFmpeg animation failed",
                    "details": error_msg
                }, status_code=500)
            
            ffmpeg_time = time.time() - ffmpeg_start
            total_time = time.time() - start_time
            print(f"✅ FFmpeg completed in {ffmpeg_time:.1f}s (total: {total_time:.1f}s)")

            # Verify output file exists
            if not os.path.exists(clip_path):
                return JSONResponse({
                    "error": "FFmpeg completed but output file not found"
                }, status_code=500)

            return {"videoUrl": f"http://localhost:7002/video/{clip_name}"}
            
        except subprocess.TimeoutExpired:
            print(f"❌ FFmpeg animation timeout")
            return JSONResponse({
                "error": "FFmpeg animation timeout"
            }, status_code=500)
            
    except Exception as e:
        print(f"❌ Unexpected error: {str(e)}")
        import traceback
        traceback.print_exc()
        return JSONResponse({
            "error": f"Unexpected error during animation generation: {str(e)}"
        }, status_code=500)

@app.get("/video/{filename}")
def get_video(filename: str):
    path = os.path.join(OUTPUT_DIR, filename)
    if not os.path.exists(path):
        return JSONResponse({"error": "Not found"}, status_code=404)
    return FileResponse(path, media_type="video/mp4")

