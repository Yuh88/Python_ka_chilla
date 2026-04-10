import json
import re

def slugify_js(value):
    s = str(value or '').lower().strip()
    s = re.sub(r'[^a-z0-9\s\-\u0600-\u06FF]', '', s)
    s = re.sub(r'[\s\-]+', '-', s).strip('-')
    return s

def get_slug(value, is_topic=False):
    s = slugify_js(value)
    if not s: # It's empty, so JS would generate a hash
        return None
    return s

def generate_sitemap():
    with open('content_data.js', 'r', encoding='utf-8') as f:
        code = f.read()

    start_str = "const siteData = {"
    start_idx = code.find(start_str) + len(start_str) - 1
    end_idx = code.find('\nwindow.siteData', start_idx)
    data_str = code[start_idx:end_idx].strip()
    if data_str.endswith(';'):
        data_str = data_str[:-1]

    site_data = json.loads(data_str)

    urls = []
    
    # Priority 1.0 and 0.9 Static Routes
    urls.append({"loc": "https://notescraft.dev/", "priority": "1.0"})
    urls.append({"loc": "https://notescraft.dev/pairing-schemes", "priority": "0.9"})
    
    for subject, chapters in site_data.items():
        if subject == "slug": continue
        subject_slug = get_slug(subject)
        
        # Priority 0.9 Subject Route
        urls.append({"loc": f"https://notescraft.dev/{subject_slug}", "priority": "0.9"})
        
        for chapter_name, chapter_data in chapters.items():
            if chapter_name == "slug": continue
            
            if isinstance(chapter_data, list):
                # 2-level structure (e.g. Computer Science, Physics)
                c_slug = get_slug(chapter_name)
                urls.append({"loc": f"https://notescraft.dev/{subject_slug}/{c_slug}", "priority": "0.8", "changefreq": "weekly"})
                
            elif isinstance(chapter_data, dict):
                # 3-level structure (e.g. Islamiyat)
                parent_slug = chapter_data.get('slug')
                if not parent_slug:
                    parent_slug = get_slug(chapter_name)
                    
                topic_keys = [k for k in chapter_data.keys() if k != 'slug']
                for index, topic_name in enumerate(topic_keys):
                    topic_data = chapter_data[topic_name]
                    topic_slug = ""
                    if isinstance(topic_data, dict) and 'slug' in topic_data:
                        topic_slug = topic_data['slug']
                    else:
                        eng_slug = get_slug(topic_name)
                        if not eng_slug:
                            topic_slug = f"topic-{index + 1}"
                        else:
                            topic_slug = eng_slug
                            
                    deep_url = f"https://notescraft.dev/{subject_slug}/{parent_slug}-{topic_slug}"
                    urls.append({"loc": deep_url, "priority": "0.8", "changefreq": "weekly"})

    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        for url in urls:
            f.write('  <url>\n')
            f.write(f'    <loc>{url["loc"]}</loc>\n')
            if 'changefreq' in url:
                f.write(f'    <changefreq>{url["changefreq"]}</changefreq>\n')
            f.write(f'    <priority>{url["priority"]}</priority>\n')
            f.write('  </url>\n')
        f.write('</urlset>\n')
        print("sitemap.xml successfully generated!")

if __name__ == '__main__':
    generate_sitemap()
