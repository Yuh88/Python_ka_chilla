import re

html = open('index.html', 'r', encoding='utf-8').read()

start_idx = html.find('<div class="questions-feed">')
end_idx = html.find('</main>')

print(html[start_idx:start_idx+500])
