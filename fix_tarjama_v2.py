import json

def update_tarjama():
    filepath = 'd:/Python_ka_chilla/content_data.js'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    prefix = 'window.siteData = '
    suffix = ';\n'
    
    start_index = content.find(prefix)
    if start_index == -1:
        print("Prefix not found")
        return
        
    start_index += len(prefix)
    end_index = content.rfind(';')
    
    json_str = content[start_index:end_index]
    
    try:
        data = json.loads(json_str)
        data['Tarjama-tul-Quran'] = {
            "سُورَةُ الْبَقَرَةِ": [],
            "سُورَةُ آلِ عِمْرَانَ": [],
            "سُورَةُ الْأَنْفَالِ": [],
            "سُورَةُ التَّوْبَةِ": []
        }
        
        new_json_str = json.dumps(data, indent=2, ensure_ascii=False)
        new_content = content[:start_index] + new_json_str + content[end_index:]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully updated content_data.js")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    update_tarjama()
