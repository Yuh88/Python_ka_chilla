import sys
with open('d:/Python_ka_chilla/injector_bot.py', 'r', encoding='utf-8') as f:
    t = f.read()

t = t.replace('\"badgeTitle\": str(badge_title).strip() or \"MARKS BOOSTER\",', '\"badgeTitle\": str(badge_title).strip(),')
t = t.replace('or \"MARKS BOOSTER\"', 'or \"\"')
t = t.replace('badge_title = \"MARKS BOOSTER\"', 'badge_title = \"\"')
t = t.replace('badge_title = data.get(\"b\", \"\").strip() or \"\"', 'badge_title = data.get(\"b\", \"\").strip()')
t = t.replace('print(\"B: Badge Title (e.g., MARKS BOOSTER)\")', 'print(\"B: Badge Title (Optional)\")')
t = t.replace('print(\"BT: Badge Text\")', 'print(\"BT: Badge Text (Optional)\")')

with open('d:/Python_ka_chilla/injector_bot.py', 'w', encoding='utf-8') as f:
    f.write(t)
print('Success')
