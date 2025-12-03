import os
from typing import List, Dict, Any, Optional

import requests

PERPLEXITY_API_BASE_URL = "https://api.perplexity.ai/v1"  # keep base_url aligned with current docs


class PerplexityClient:
    """
    Simple wrapper around Perplexity's pplx-api chat completions endpoint.
    """

    def __init__(self, api_key: Optional[str] = None):
        """
        :param api_key: Your Perplexity API key. If not provided, reads from PERPLEXITY_API_KEY env var.
        """
        self.api_key = api_key or os.getenv("PERPLEXITY_API_KEY")
        if not self.api_key:
            raise ValueError("Perplexity API key not provided. Set PERPLEXITY_API_KEY env var or pass api_key.")

        self.base_url = "https://api.perplexity.ai/chat/completions"  # from official quickstart [web:22]

    def _headers(self) -> Dict[str, str]:
        return {
            "Authorization": f"Bearer {self.api_key}",  # bearer token auth [web:22]
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

    def chat_completion(
        self,
        messages: List[Dict[str, str]],
        model: str = "mistral-7b-instruct",
        max_tokens: int = 512,
        temperature: float = 0.7,
        stream: bool = False,
        **extra_params: Any,
    ) -> Any:
        """
        Call Perplexity chat completions.

        :param messages: List of {\"role\": \"system\"|\"user\"|\"assistant\", \"content\": \"...\"}
        :param model: Model name supported by pplx-api (e.g. \"mistral-7b-instruct\", \"llama-70b-instruct\"). [web:22]
        :param max_tokens: Max tokens in completion.
        :param temperature: Sampling temperature.
        :param stream: If True, yields streaming chunks; else returns full JSON.
        :param extra_params: Any additional parameters supported by the API.
        """

        payload: Dict[str, Any] = {
            "model": model,
            "messages": messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "stream": stream,
        }
        payload.update(extra_params)

        if stream:
            # streaming responses: use stream=True in requests [web:22]
            with requests.post(self.base_url, headers=self._headers(), json=payload, stream=True) as resp:
                resp.raise_for_status()
                for line in resp.iter_lines():
                    if not line:
                        continue
                    # each line should be one JSON chunk; caller can parse or log raw
                    yield line.decode("utf-8")
        else:
            resp = requests.post(self.base_url, headers=self._headers(), json=payload)
            resp.raise_for_status()
            return resp.json()


if __name__ == "__main__":
    """
    Minimal demo: run `python perplexity_client.py` after setting PERPLEXITY_API_KEY.
    """
    client = PerplexityClient()

    messages = [
        {
            "role": "system",
            "content": "You are a helpful assistant specialized in generating short educational video scripts.",
        },
        {
            "role": "user",
            "content": "Create a 20-second explainer script about why saving money early is important for teenagers.",
        },
    ]

    result = client.chat_completion(
        messages=messages,
        model="mistral-7b-instruct",  # or another supported model [web:22]
        max_tokens=300,
        temperature=0.7,
    )

    print(result["choices"][0]["message"]["content"])
