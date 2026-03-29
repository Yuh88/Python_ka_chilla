import re

with open('d:/Python_ka_chilla/injector_bot.py', "r", encoding="utf-8") as f:
    text = f.read()

text = re.sub(
    r'def choose_chapter_for_subject\(data_obj, subject\):(.*?)(?=\ndef [a-z])',
    '''def choose_chapter_for_subject(data_obj, subject):
    current = data_obj.get(subject, {})
    if not isinstance(current, dict):
        return None

    path = []
    while isinstance(current, dict):
        keys = list(current.keys())
        if not keys:
            print("No topics found.")
            return tuple(path) if path else None

        print(f"\\nAvailable {'Topics' if path else 'Chapters'}:")
        for index, key in enumerate(keys, start=1):
            print(f"{index}. {key}")

        while True:
            choice = prompt_with_back("Enter index from list")
            if choice is None:
                return None

            if choice.isdigit():
                index = int(choice)
                if 1 <= index <= len(keys):
                    selected_key = keys[index - 1]
                    path.append(selected_key)
                    current = current.get(selected_key, {})
                    break
                print("Invalid index.")

    return tuple(path)
''',
    text,
    flags=re.DOTALL
)

text = re.sub(
    r'def ensure_structure\(data_obj, subject, chapter\):(.*?)(?=\ndef [a-z])',
    '''def ensure_structure(data_obj, subject, chapter):
    if subject not in data_obj or not isinstance(data_obj[subject], dict):
        data_obj[subject] = {}
        
    current = data_obj[subject]
    if isinstance(chapter, tuple):
        for k in chapter[:-1]:
            if k not in current or not isinstance(current[k], dict):
                current[k] = {}
            current = current[k]
        last_key = chapter[-1]
    else:
        last_key = chapter

    if last_key not in current or not isinstance(current[last_key], list):
        current[last_key] = []

''',
    text,
    flags=re.DOTALL
)


text = re.sub(
    r'def append_and_save\(js_path, original_content, match, data_obj, subject, chapter, entries\):(.*?)(?=\ndef [a-z])',
    '''def append_and_save(js_path, original_content, match, data_obj, subject, chapter, entries):
    if not entries:
        return 0
    ensure_structure(data_obj, subject, chapter)
    
    current = data_obj[subject]
    if isinstance(chapter, tuple):
        for k in chapter[:-1]:
            current = current[k]
        current[chapter[-1]].extend(entries)
    else:
        current[chapter].extend(entries)
        
    write_site_data(js_path, original_content, match, data_obj)
    return len(entries)

''',
    text,
    flags=re.DOTALL
)

with open('d:/Python_ka_chilla/injector_bot.py', "w", encoding="utf-8") as f:
    f.write(text)

print("injector_bot.py fixed correctly.")
