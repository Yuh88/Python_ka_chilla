import re

with open("d:/Python_ka_chilla/injector_bot.py", "r", encoding="utf-8") as f:
    text = f.read()

# Fix run_delete_specific_numbers_flow
old_del_spec = '''            chapter_questions = []
            if isinstance(data_obj.get(subject), dict):
                chapter_questions = data_obj[subject].get(chapter, [])'''

new_del_spec = '''            chapter_questions = []
            if isinstance(data_obj.get(subject), dict):
                current = data_obj[subject]
                if isinstance(chapter, tuple):
                    for k in chapter[:-1]:
                        current = current.get(k, {})
                    chapter_questions = current.get(chapter[-1], [])
                else:
                    chapter_questions = current.get(chapter, [])'''

text = text.replace(old_del_spec, new_del_spec)

# Fix run_delete_entire_category_flow
old_del_cat = '''            chapter_node = data_obj.get(subject, {}).get(chapter)
            leaf_lists = get_leaf_question_lists(chapter_node)'''

new_del_cat = '''            current = data_obj.get(subject, {})
            if isinstance(chapter, tuple):
                for k in chapter[:-1]:
                    current = current.get(k, {})
                chapter_node = current.get(chapter[-1])
            else:
                chapter_node = current.get(chapter)
            leaf_lists = get_leaf_question_lists(chapter_node)'''

text = text.replace(old_del_cat, new_del_cat)

with open("d:/Python_ka_chilla/injector_bot.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Fixed delete flows for tuples")
