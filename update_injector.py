import re

content = open("injector_bot.py", encoding="utf-8").read()

new_choose = """def choose_chapter_for_subject(data_obj, subject):
    current = data_obj.get(subject, {})
    if not isinstance(current, dict):
        return None
        
    path = []
    while isinstance(current, dict):
        keys = list(current.keys())
        if not keys:
            print("No topics found.")
            return None if not path else tuple(path)
            
        print(f"\\nAvailable {'Topics' if path else 'Chapters'}:")
        for index, key in enumerate(keys, start=1):
            print(f"{index}. {key}")
            
        while True:
            choice = prompt_with_back("Enter index from list")
            if choice is None:
                return None
                
            selected_key = None
            if choice.isdigit():
                idx = int(choice)
                if 1 <= idx <= len(keys):
                    selected_key = keys[idx - 1]
            elif choice in current:
                selected_key = choice
                
            if selected_key:
                path.append(selected_key)
                current = current[selected_key]
                break
            print("Invalid choice.")
            
    return tuple(path) if len(path) > 1 else (path[0] if path else None)"""

content = re.sub(r'def choose_chapter_for_subject\(data_obj, subject\):.*?print\("Invalid chapter\. Enter a valid index from the list\."\)', new_choose, content, flags=re.DOTALL)

# Update ensure_structure
new_ensure = """def ensure_structure(data_obj, subject, chapter):
    if subject not in data_obj or not isinstance(data_obj[subject], dict):
        data_obj[subject] = {}
    current = data_obj[subject]
    if isinstance(chapter, tuple):
        for k in chapter[:-1]:
            if k not in current or not isinstance(current[k], dict):
                current[k] = {}
            current = current[k]
        last = chapter[-1]
        if last not in current or not isinstance(current[last], list):
            current[last] = []
    else:
        if chapter not in current or not isinstance(current[chapter], list):
            current[chapter] = []"""
content = re.sub(r'def ensure_structure\(data_obj, subject, chapter\):.*?data_obj\[subject\]\[chapter\] = \[\]', new_ensure, content, flags=re.DOTALL)

# Update append_and_save
new_append = """def append_and_save(js_path, original_content, match, data_obj, subject, chapter, entries):
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
    return len(entries)"""
content = re.sub(r'def append_and_save\(js_path, original_content, match, data_obj, subject, chapter, entries\):.*?return len\(entries\)', new_append, content, flags=re.DOTALL)

# Update run_delete_entire_category_flow and specific numbers
new_delete_specific = """def run_delete_specific_numbers_flow(js_path, original_content, match, data_obj):
    while True:
        subject = choose_subject()
        if subject is None:
            return

        while True:
            chapter = choose_chapter_for_subject(data_obj, subject)
            if chapter is None:
                break
                
            chapter_questions = []
            if isinstance(data_obj.get(subject), dict):
                current = data_obj[subject]
                if isinstance(chapter, tuple):
                    for k in chapter[:-1]:
                        current = current.get(k, {})
                    chapter_questions = current.get(chapter[-1], [])
                else:
                    chapter_questions = current.get(chapter, [])
"""
content = re.sub(r'def run_delete_specific_numbers_flow\(js_path, original_content, match, data_obj\):.*?chapter_questions = data_obj\[subject\]\.get\(chapter, \[\]\)', new_delete_specific, content, flags=re.DOTALL)

new_delete_entire = """def run_delete_entire_category_flow(js_path, original_content, match, data_obj):
    while True:
        subject = choose_subject()
        if subject is None:
            break

        while True:
            chapter = choose_chapter_for_subject(data_obj, subject)
            if chapter is None:
                break

            current = data_obj.get(subject, {})
            if isinstance(chapter, tuple):
                for k in chapter[:-1]:
                    current = current.get(k, {})
                chapter_node = current.get(chapter[-1])
            else:
                chapter_node = current.get(chapter)"""
content = re.sub(r'def run_delete_entire_category_flow\(js_path, original_content, match, data_obj\):.*?chapter_node = data_obj\.get\(subject, \{\}\)\.get\(chapter\)', new_delete_entire, content, flags=re.DOTALL)

open("injector_bot.py", "w", encoding="utf-8").write(content)
print("Updated injector_bot.py successfully.")