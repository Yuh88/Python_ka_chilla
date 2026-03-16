import re
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

def fix_invert(match):
    cls_name = match.group(2)
    text = match.group(1)
    return f'<p class="{cls_name}">{text}</p>'

new_content = re.sub(r'<p class="(.*?)">(answer-text|extra-text)</p>', fix_invert, content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
     f.write(new_content)
     
print("Fixed inverted groups")