const fs = require('fs');
let code = fs.readFileSync('d:/Python_ka_chilla/script.js', 'utf-8');

code = code.replace(
    /let rawBadgeTitle = entry\.badgeTitle \|\| entry\.badge_title \|\| \(isUrdu \? '[^']+' : 'MARKS BOOSTER'\);/,
    "let rawBadgeTitle = entry.badgeTitle !== undefined ? entry.badgeTitle : (entry.badge_title || '');"
);

code = code.replace(
    /if \(isUrdu && \['MARKS BOOSTER', 'ENERGY FLOW', 'QUICK NOTE'\]\.includes\(rawBadgeTitle\.toUpperCase\(\)\)\) \{/,
    "if (isUrdu && rawBadgeTitle && ['MARKS BOOSTER', 'ENERGY FLOW', 'QUICK NOTE'].includes(rawBadgeTitle.toUpperCase())) {"
);

fs.writeFileSync('d:/Python_ka_chilla/script.js', code, 'utf-8');
console.log('Script patched.');
