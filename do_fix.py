with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('<p class="answer-text">nav-title">SUBJECTS</p>', '<p class="nav-title">SUBJECTS</p>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)
