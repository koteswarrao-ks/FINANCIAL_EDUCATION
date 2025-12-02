import requests
from agno_mock import Agent

ANIMATION_SERVICE_URL = "http://localhost:7002/animate"

def animation_agent_fn(input_data: dict) -> dict:
    """
    Input: { "images": [ { "panelId": 1, "imageUrl": "..." }, ... ] }
    Output: { "clips": [ { "panelId": 1, "clipUrl": "http://..." }, ... ] }
    """
    import time
    images = input_data["images"]
    clips = []

    print(f"🎞️  Animating {len(images)} images...")
    start_time = time.time()
    
    for i, img in enumerate(images, 1):
        print(f"   Animating image {i}/{len(images)} for panel {img['panelId']}...")
        panel_start = time.time()
        
        try:
            # Animation: 45s download + 45s ffmpeg = 90s max (with buffer)
            print(f"   📡 Sending request to animation service...")
            resp = requests.post(ANIMATION_SERVICE_URL, json={"imageUrl": img["imageUrl"]}, timeout=90)
            resp.raise_for_status()
            data = resp.json()
            
            panel_time = time.time() - panel_start
            print(f"   ✅ Animation {i} completed in {panel_time:.1f}s")
            
            clips.append({
                "panelId": img["panelId"],
                "clipUrl": data["videoUrl"]
            })
        except requests.exceptions.Timeout:
            print(f"   ❌ Animation {i} timed out")
            raise Exception(f"Animation timed out for panel {img['panelId']}")
        except Exception as e:
            print(f"   ❌ Animation {i} failed: {str(e)}")
            raise Exception(f"Animation failed for panel {img['panelId']}: {str(e)}")

    total_time = time.time() - start_time
    print(f"✅ All {len(clips)} animations completed in {total_time:.1f}s")
    return {"clips": clips}

animation_agent = Agent(func=animation_agent_fn, name="AnimationAgent")
