import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace .answer-text
old_answer = r"""\.answer-text \{[\s\S]*?\}"""
new_answer = """.answer-text {
    font-size: 1.15rem;
    color: #1a1a1a;
    line-height: 1.7;
}

body.dark-mode .answer-text {
    color: #ffffff;
}"""
css = re.sub(old_answer, new_answer, css, count=1)

# Modify .answer-text strong so it pops better
old_strong = r"""\.answer-text strong \{[\s\S]*?\}"""
new_strong = """.answer-text strong {
    color: var(--primary-color);
    font-weight: 700;
    background-color: rgba(79, 70, 229, 0.1);
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
}

body.dark-mode .answer-text strong {
    color: #FFD700;
    background-color: rgba(255, 215, 0, 0.1);
}"""
css = re.sub(old_strong, new_strong, css, count=1)

# Modify .card-footer
old_footer = r"""\.card-footer \{[\s\S]*?border: 1px solid var\(--border-light\);\s*\}"""
new_footer = """.card-footer {
    background: transparent;
    border-left: 3px solid var(--primary-color);
    padding: 0.5rem 0 0.5rem 1rem;
    margin-top: 1.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: baseline;
    border-radius: 0;
}"""
css = re.sub(old_footer, new_footer, css, count=1)

# Modify .extra-badge
old_badge = r"""\.extra-badge \{[\s\S]*?min-width: max-content;\s*\}"""
new_badge = """.extra-badge {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    min-width: max-content;
}"""
css = re.sub(old_badge, new_badge, css, count=1)

# Modify .extra-text
old_extra = r"""\.extra-text \{[\s\S]*?\}"""
new_extra = """.extra-text {
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.4;
}"""
css = re.sub(old_extra, new_extra, css, count=1)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Hierarchy styling updated.")
