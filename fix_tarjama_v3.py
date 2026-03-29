import json
import re

def update_tarjama():
    filepath = 'd:/Python_ka_chilla/content_data.js'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We need to extract what's between `const siteData = {` and `};`
    # However, there are multiple objects in this file. (siteData, modelPapersData, etc.)
    # Let's extract between `const siteData = {` and the FIRST line that starts with `const modelPapersData` or similar
    
    match = re.search(r'const\s+siteData\s*=\s*(\{.*?\})\s*;\s*(const|window|let|var)', content, re.DOTALL)
    if not match:
        print("Could not find siteData block.")
        return
        
    json_str = match.group(1)
    
    try:
        data = json.loads(json_str)
        data['Tarjama-tul-Quran'] = {
            "سُورَةُ الْبَقَرَةِ": [],
            "سُورَةُ آلِ عِمْرَانَ": [],
            "سُورَةُ الْأَنْفَالِ": [],
            "سُورَةُ التَّوْبَةِ": []
        }
        
        new_json_str = json.dumps(data, indent=2, ensure_ascii=False)
        new_content = content[:match.start(1)] + new_json_str + content[match.end(1):]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully updated content_data.js")
    except Exception as e:
        print(f"Error parsing JSON: {e}")

if __name__ == "__main__":
    update_tarjama()
