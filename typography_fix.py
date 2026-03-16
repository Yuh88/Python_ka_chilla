import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = re.sub(r'\.answer-text\s*\{[^}]*\}', 
""".answer-text {
    font-size: 1.05rem;
    color: var(--text-primary);
    line-height: 1.7;
}""", css)

css = re.sub(r'body\.dark-mode\s*\.answer-text\s*\{[^}]*\}', 
"""body.dark-mode .answer-text {
    color: var(--text-primary);
}""", css)

css = re.sub(r'\.extra-text\s*\{[^}]*\}', 
""".extra-text {
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.6;
}""", css)

css = re.sub(r'\.extra-badge\s*\{[^}]*\}', 
""".extra-badge {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    min-width: max-content;
}""", css)

# Make soft border more subtle in dark mode if needed, but it's using transparent which is fine 
css = re.sub(r'\.card-footer\s*\{[^}]*\}',
""".card-footer {
    background: transparent;
    border-left: 2px solid rgba(79, 70, 229, 0.4);
    padding: 0.5rem 0 0.5rem 1rem;
    margin-top: 1.25rem;
    display: flex;
    gap: 0.5rem;
    align-items: baseline;
    border-radius: 0;
}""", css)

# Strong keyword contrast check
# Light mode: it's var(--primary-color) which is #4f46e5 (blue). It's readable on white background #f8fafc / #ffffff.
# BG is rgba(79, 70, 229, 0.1)

# Dark mode: It's #FFD700 (yellow/gold) on #1e293b.
# BG is rgba(255, 215, 0, 0.1) which is readable!

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Typography updated for balance.")
