import json
import re

def slugify_route_segment(value):
    # Mimic the JavaScript slugify function
    safe_str = str(value or '').lower().strip()
    safe_str = re.sub(r'[^a-z0-9\s\-\u0600-\u06FF]', '', safe_str)
    safe_str = re.sub(r'\s+', '-', safe_str)
    safe_str = re.sub(r'-+', '-', safe_str)
    return safe_str

def main():
    try:
        with open('content_data.js', 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Extract the siteData object from content_data.js
        start_idx = content.find('{')
        end_idx = content.find('const modelPapersData')
        
        if end_idx == -1:
            json_str = content[start_idx:content.rfind('}')+1]
        else:
            # Finding the end of the siteData object
            json_str = content[start_idx:content.rfind('}', 0, end_idx)+1]
            
        data = json.loads(json_str)

        urls = ['https://notescraft.dev/']
        
        for subject, subject_data in data.items():
            subject_slug = slugify_route_segment(subject)
            urls.append(f'https://notescraft.dev/{subject_slug}')
            
            if subject == 'Islamiyat':
                for baab_name, baab_data in subject_data.items():
                    if isinstance(baab_data, dict):
                        for topic_name in baab_data.keys():
                            if isinstance(baab_data[topic_name], list):
                                chapter_slug = slugify_route_segment(f"{baab_name} - {topic_name}")
                                urls.append(f'https://notescraft.dev/{subject_slug}/{chapter_slug}')
            else:
                for chapter_key, chapter_data in subject_data.items():
                    if isinstance(chapter_data, list):
                        chapter_label = f"Chapter {chapter_key}" if chapter_key.isdigit() else chapter_key
                        chapter_slug = slugify_route_segment(chapter_label)
                        urls.append(f'https://notescraft.dev/{subject_slug}/{chapter_slug}')
                        
        xml_content = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        ]
        
        for url in urls:
            # basic escaping
            url_escaped = url.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&apos;')
            xml_content.append('  <url>')
            xml_content.append(f'    <loc>{url_escaped}</loc>')
            xml_content.append('  </url>')
            
        xml_content.append('</urlset>')
        
        with open('sitemap.xml', 'w', encoding='utf-8') as f:
            f.write('\n'.join(xml_content))
            
        print(f"Generated sitemap.xml with {len(urls)} URLs.")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
