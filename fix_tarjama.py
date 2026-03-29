import re
import json

c = open('content_data.js', encoding='utf-8').read()
m = re.search(r'const siteData\s*=\s*(\{.*?});\s*window', c, re.DOTALL)
data = json.loads(m.group(1))

data['Tarjama-tul-Quran']['tarjama-tul-quran'] = [
      { "id": "surah-baqarah", "title": "سُورَةُ الْبَقَرَةِ" },
      { "id": "surah-ale-imran", "title": "سُورَةُ آلِ عِمْرَانَ" },
      { "id": "surah-anfal", "title": "سُورَةُ الْأَنْفَالِ" },
      { "id": "surah-taubah", "title": "سُورَةُ التَّوْبَةِ" }
]

new_json = json.dumps(data, indent=2, ensure_ascii=False)
new_c = c[:m.start(1)] + new_json + c[m.end(1):]
open('content_data.js', 'w', encoding='utf-8').write(new_c)
print("done")