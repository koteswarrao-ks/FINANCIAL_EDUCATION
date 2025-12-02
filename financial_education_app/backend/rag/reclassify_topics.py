"""
Reclassify topics in financial_concepts.json using improved classification logic
"""

import json
from pathlib import Path
from extract_pdf_content import identify_topic

BASE_DIR = Path(__file__).resolve().parent
JSON_FILE = BASE_DIR / "financial_concepts.json"

def reclassify_topics():
    """Reclassify all PDF entries with improved topic identification"""
    print("=" * 60)
    print("🔄 Reclassifying PDF Topics")
    print("=" * 60)
    
    # Load existing knowledge base
    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"\n📊 Total entries: {len(data)}")
    
    # Count before
    pdf_entries = [item for item in data if item.get('source', '').startswith('Class_')]
    original_entries = [item for item in data if not item.get('source', '').startswith('Class_')]
    
    print(f"   - Original KB entries: {len(original_entries)}")
    print(f"   - PDF entries: {len(pdf_entries)}")
    
    # Reclassify PDF entries
    reclassified = 0
    topic_changes = {}
    
    for entry in pdf_entries:
        old_topic = entry.get('topic', 'General')
        content = entry.get('content', '')
        
        if len(content) < 50:  # Skip very short entries
            continue
        
        new_topic = identify_topic(content)
        
        if new_topic != old_topic:
            entry['topic'] = new_topic
            reclassified += 1
            change_key = f"{old_topic} → {new_topic}"
            topic_changes[change_key] = topic_changes.get(change_key, 0) + 1
    
    # Save updated knowledge base
    with open(JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    # Print statistics
    print(f"\n✅ Reclassification complete!")
    print(f"   - Reclassified entries: {reclassified}")
    
    if topic_changes:
        print(f"\n📈 Topic Changes:")
        for change, count in sorted(topic_changes.items(), key=lambda x: -x[1]):
            print(f"   - {change}: {count} entries")
    
    # Count after
    topics_after = {}
    for item in pdf_entries:
        topic = item.get('topic', 'Unknown')
        topics_after[topic] = topics_after.get(topic, 0) + 1
    
    print(f"\n📊 Final PDF Topic Distribution:")
    for topic, count in sorted(topics_after.items(), key=lambda x: -x[1]):
        print(f"   - {topic}: {count} entries")
    
    print(f"\n💡 Next step: Run 'python ingest_kb.py' to update ChromaDB")

if __name__ == "__main__":
    reclassify_topics()

