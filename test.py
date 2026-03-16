import re
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'<p[^>]*class="answer-text"[^>]*>(.*?)</p>', text, flags=re.DOTALL)
print(f"Found {len(matches)} answers")

matches_extra = re.findall(r'<p[^>]*class="extra-text"[^>]*>(.*?)</p>', text, flags=re.DOTALL)
print(f"Found {len(matches_extra)} extra-texts")
