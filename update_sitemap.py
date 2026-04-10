import json
import re

def slugify(value):
    safe_str = str(value or '').lower().strip()
    safe_str = re.sub(r'[^a-z0-9\s\-\u0600-\u06FF]', '', safe_str)
    safe_str = re.sub(r'\s+', '-', safe_str)
    safe_str = re.sub(r'-+', '-', safe_str)
    return safe_str

def generate():
    try:
        with open('content_data.js', 'r', encoding='utf-8') as f:
            content = f.read()

        # Find the siteData dictionary
        m = re.search(r'const siteData\s*=\s*(\{.*?});\s*window', content, re.DOTALL)
        if not m:
            print("Couldn't find siteData")
            return

        data = json.loads(m.group(1))

        urls = []
        
        # Base URLs priority 0.9
        urls.append({'loc': 'https://notescraft.dev/', 'priority': '0.9'})
        urls.append({'loc': 'https://notescraft.dev/pairing-schemes', 'priority': '0.9'})

        for subject, subject_data in data.items():
            subject_slug = slugify(subject)
            urls.append({'loc': f'https://notescraft.dev/{subject_slug}', 'priority': '0.9'})
            
            # Now the chapters
            if subject == 'Islamiyat':
                for baab_name, baab_data in subject_data.items():
                    if isinstance(baab_data, dict):
                        for topic_name in baab_data.keys():
                            if isinstance(baab_data[topic_name], list) and len(baab_data[topic_name]) > 0:
                                chapter_slug = slugify(f'{baab_name} - {topic_name}')
                                urls.append({'loc': f'https://notescraft.dev/{subject_slug}/{chapter_slug}', 'priority': '0.8', 'changefreq': 'weekly'})
            else:
                for chapter_key, chapter_data in subject_data.items():
                    if isinstance(chapter_data, list) and len(chapter_data) > 0:
                        chapter_label = f'Chapter {chapter_key}' if str(chapter_key).isdigit() else chapter_key
                        chapter_slug = slugify(chapter_label)
                        urls.append({'loc': f'https://notescraft.dev/{subject_slug}/{chapter_slug}', 'priority': '0.8', 'changefreq': 'weekly'})

        print(f"Total base+chapter URLs: {len(urls)}")

        xml_lines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        ]
        
        for u in urls:
            loc = u['loc'].replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
            xml_lines.append('  <url>')
            xml_lines.append(f'    <loc>{loc}</loc>')
            if 'changefreq' in u:
                xml_lines.append(f'    <changefreq>{u["changefreq"]}</changefreq>')
            if 'priority' in u:
                xml_lines.append(f'    <priority>{u["priority"]}</priority>')
            xml_lines.append('  </url>')
            
        xml_lines.append('</urlset>')
        
        with open('sitemap.xml', 'w', encoding='utf-8') as f:
            f.write('\n'.join(xml_lines) + '\n')
            
        print("sitemap.xml written successfully.")
            
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    generate()
