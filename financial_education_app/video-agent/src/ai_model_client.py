from perplexity_client import PerplexityClient

client = PerplexityClient()

messages = [
    {"role": "system", "content": "You write short kid-friendly financial education video scripts."},
    {"role": "user", "content": "Explain compound interest to a 10-year-old in 30 seconds."},
]

response = client.chat_completion(messages=messages)
script = response["choices"][0]["message"]["content"]
