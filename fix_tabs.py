import sys

with open(r'd:\Python_ka_chilla\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

parts = content.split('<!-- Premium Question Card ')

if len(parts) > 1:
    out = parts[0]
    
    q_index = out.rfind('<div class="questions-feed">')
    if q_index != -1:
        prefix = out[:q_index + len('<div class="questions-feed">')]
        suffix = out[q_index + len('<div class="questions-feed">'):]
        out = prefix + '\n                <div class="tab-pane active" id="tab-most-important">' + suffix
        
    for i, p in enumerate(parts[1:]):
        card_num = i + 1
        
        if card_num == 11:
            out += '                </div>\n                <!-- Tab 2 -->\n                <div class="tab-pane" id="tab-important">\n'
        elif card_num == 19:
            out += '                </div>\n                <!-- Tab 3 -->\n                <div class="tab-pane" id="tab-conceptual">\n'
            
        out += '<!-- Premium Question Card ' + p
        
    last_div_idx = out.rfind('            </div>')
    out = out[:last_div_idx] + '                </div>\n' + out[last_div_idx:]
    
    with open(r'd:\Python_ka_chilla\index.html', 'w', encoding='utf-8') as f:
        f.write(out)
    print('Successfully updated tabs')
else:
    print('Failed to split')
