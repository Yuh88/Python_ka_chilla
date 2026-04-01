import re

with open('d:/Python_ka_chilla/script.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(
    r\"let rawBadgeTitle = entry\.badgeTitle \|\| entry\.badge_title \|\| \(isUrdu \? \'.*?\' : \'MARKS BOOSTER\'\);\",
    \"let rawBadgeTitle = entry.badgeTitle !== undefined ? entry.badgeTitle : (entry.badge_title || '');\",
    text
)

text = text.replace(
    \"if (isUrdu && ['MARKS BOOSTER', 'ENERGY FLOW', 'QUICK NOTE'].includes(rawBadgeTitle.toUpperCase())) {\",
    \"if (isUrdu && rawBadgeTitle && ['MARKS BOOSTER', 'ENERGY FLOW', 'QUICK NOTE'].includes(rawBadgeTitle.toUpperCase())) {\"
)

with open('d:/Python_ka_chilla/script.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Success')
