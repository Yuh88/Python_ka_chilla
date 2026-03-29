import json
import re
from pathlib import Path

SUBJECT_MENU = {
    "1": "Computer Science",
    "2": "English",
    "3": "Physics",
    "4": "Islamiyat",
    "5": "Tarjama-tul-Quran",
}

MODEL_PAPER_SUBJECT_MENU = {
    "1": "Computer Science",
    "2": "English",
    "3": "Physics",
}

CATEGORY_MENU = {
    "1": "most",
    "2": "important",
    "3": "conceptual",
}

AUTO_SAVE_BATCH = 5
BACK_KEYWORD = "b"


def prompt_with_back(prompt_text: str):
    user_input = input(f"{prompt_text} (Type 'b' to go back): ").strip()
    if user_input.lower() == BACK_KEYWORD:
        return None
    return user_input


def clean_menu_token(raw_value: str):
    value = str(raw_value or "").strip()
    value = re.sub(r"\s+", "", value)
    value = value.strip("[](){}")
    return value.upper()


def read_js_data_block(js_path: Path, const_name: str, window_name: str):
    content = js_path.read_text(encoding="utf-8")
    escaped_const_name = re.escape(const_name)
    escaped_window_name = re.escape(window_name)
    pattern = re.compile(
        rf"(const\s+{escaped_const_name}\s*=\s*)(\{{[\s\S]*?\}})(\s*;\s*window\.{escaped_window_name}\s*=\s*{escaped_const_name}\s*;)"
    )
    match = pattern.search(content)
    if not match:
        raise ValueError(f"Could not find {const_name} object in content_data.js")

    data_obj = json.loads(match.group(2))
    return content, match, data_obj


def read_site_data(js_path: Path):
    return read_js_data_block(js_path, const_name="siteData", window_name="siteData")


def read_model_papers_data(js_path: Path):
    return read_js_data_block(js_path, const_name="modelPapersData", window_name="modelPapersData")


def write_js_data_block(js_path: Path, original_content: str, match, data_obj):
    json_blob = json.dumps(data_obj, indent=2, ensure_ascii=False)
    updated_content = original_content[: match.start(2)] + json_blob + original_content[match.end(2):]
    js_path.write_text(updated_content, encoding="utf-8")


def write_site_data(js_path: Path, original_content: str, match, data_obj):
    write_js_data_block(js_path, original_content, match, data_obj)


def write_model_papers_data(js_path: Path, original_content: str, match, data_obj):
    write_js_data_block(js_path, original_content, match, data_obj)


def choose_subject():
    print("\nSelect Subject:")
    for key, value in SUBJECT_MENU.items():
        print(f"{key}. {value}")

    while True:
        choice = prompt_with_back("Enter choice (1-5)")
        if choice is None:
            return None
        if choice in SUBJECT_MENU:
            return SUBJECT_MENU[choice]
        print("Invalid choice. Please enter a number between 1 and 5.")


def choose_model_paper_subject():
    print("\nSelect Model Paper Subject:")
    for key, value in MODEL_PAPER_SUBJECT_MENU.items():
        print(f"{key}. {value}")

    while True:
        choice = prompt_with_back("Enter choice (1-3)")
        if choice is None:
            return None
        if choice in MODEL_PAPER_SUBJECT_MENU:
            return MODEL_PAPER_SUBJECT_MENU[choice]
        print("Invalid choice. Please enter a number between 1 and 3.")


def choose_chapter():
    while True:
        chapter = prompt_with_back("Enter Chapter Number (e.g., 1)")
        if chapter is None:
            return None
        if chapter.isdigit() and int(chapter) > 0:
            return str(int(chapter))
        print("Invalid chapter number. Please enter a positive integer.")


def choose_mode():
    print("\nChoose Entry Mode:")
    print("1. Normal Mode (one question at a time)")
    print("2. Bulk Mode (paste many questions with --- separators)")
    while True:
        mode = prompt_with_back("Enter mode (1-2)")
        if mode is None:
            return None
        if mode in {"1", "2"}:
            return mode
        print("Invalid mode. Enter 1 or 2.")


def choose_delete_submenu_action():
    print("\nDelete Menu")
    print("[A] Delete Specific Numbers")
    print("[B] Delete Entire Category")
    print("[BACK] Return to Main Menu")
    while True:
        raw_action = input("Choose option (A-B or BACK): ").strip()
        normalized_action = clean_menu_token(raw_action)
        if normalized_action in {"A", "B"}:
            return normalized_action
        if normalized_action in {"BACK", "RETURN"}:
            return None
        print("Invalid choice. Please enter A, B, or BACK.")


def choose_main_menu_action():
    print("\nMain Menu")
    print("[1] Add New Questions (Single/Bulk)")
    print("[2] Delete a Question")
    print("[3] Exit")
    print("[4] Add Model Paper Content")
    while True:
        action = prompt_with_back("Choose action (1-4)")
        if action is None:
            return "3"
        if action in {"1", "2", "3", "4"}:
            return action
        print("Invalid choice. Please enter 1, 2, 3, or 4.")


def normalize_category(raw_value: str):
    value = str(raw_value or "").strip().lower()
    if value in CATEGORY_MENU:
        return CATEGORY_MENU[value]
    if "most" in value:
        return "most"
    if "important" in value:
        return "important"
    if "concept" in value:
        return "conceptual"
    return None


def choose_category():
    print("Category: 1=🔥 Most Important, 2=⭐ Important, 3=🧠 Conceptual")
    while True:
        cat = prompt_with_back("Enter category number (1-3)")
        if cat is None:
            return None
        category = normalize_category(cat)
        if category:
            return category
        print("Invalid category. Please enter 1, 2, or 3.")


def get_category_menu_code(category_value):
    for code, value in CATEGORY_MENU.items():
        if value == category_value:
            return code
    return category_value


def choose_chapter_for_subject(data_obj, subject):
    current = data_obj.get(subject, {})
    if not isinstance(current, dict):
        return None

    path = []
    while isinstance(current, dict):
        keys = list(current.keys())
        if not keys:
            print("No topics found.")
            return tuple(path) if path else None

        print(f"
Available {'Topics' if path else 'Chapters'}:")
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

def build_entry(question, answer, category, badge_title, badge_text):
    return {
        "question": str(question).strip(),
        "answer": str(answer).strip(),
        "category": normalize_category(category) or "most",
        "badgeTitle": str(badge_title).strip() or "MARKS BOOSTER",
        "badgeText": str(badge_text).strip(),
    }


def normalize_existing_site_data_schema(data_obj):
    def normalize_entry_list(items):
        if not isinstance(items, list):
            return []

        normalized_items = []
        for entry in items:
            if not isinstance(entry, dict):
                continue
            question = entry.get("question", "")
            answer = entry.get("answer", "")
            category = normalize_category(entry.get("category")) or "most"
            badge_title = (
                entry.get("badgeTitle")
                or entry.get("badge_title")
                or "MARKS BOOSTER"
            )
            badge_text = (
                entry.get("badgeText")
                or entry.get("badge_text")
                or entry.get("marks_booster")
                or entry.get("marksBooster")
                or ""
            )
            normalized_items.append(
                build_entry(question, answer, category, badge_title, badge_text)
            )

        return normalized_items

    def normalize_chapter_node(node):
        if isinstance(node, list):
            return normalize_entry_list(node)
        if isinstance(node, dict):
            return {key: normalize_chapter_node(value) for key, value in node.items()}
        return []

    for subject_name, chapters in data_obj.items():
        if not isinstance(chapters, dict):
            data_obj[subject_name] = {}
            continue
        data_obj[subject_name] = {key: normalize_chapter_node(value) for key, value in chapters.items()}


def append_and_save(js_path, original_content, match, data_obj, subject, chapter, entries):
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


def ensure_model_paper_structure(data_obj, subject):
    if subject not in data_obj or not isinstance(data_obj[subject], list):
        data_obj[subject] = []


def append_model_papers_and_save(js_path, original_content, match, data_obj, subject, entries):
    if not entries:
        return 0
    ensure_model_paper_structure(data_obj, subject)
    data_obj[subject].extend(entries)
    write_model_papers_data(js_path, original_content, match, data_obj)
    return len(entries)


def collect_single_entries(save_callback):
    pending = []
    total_saved = 0
    print("\nNormal Mode Commands:")
    print("1. Add Question")
    print("2. SAVE & EXIT")
    print("3. Exit Without Saving Pending")

    while True:
        action = prompt_with_back("\nChoose action (1-3)")
        if action is None:
            if pending:
                saved_now = save_callback(pending)
                total_saved += saved_now
                pending = []
                print(f"Saved {saved_now} pending item(s) before going back.")
            print("Going back to previous menu.")
            return total_saved, True

        if action == "2":
            if pending:
                saved_now = save_callback(pending)
                total_saved += saved_now
                pending = []
                print(f"Saved {saved_now} pending item(s).")
            print("SAVE & EXIT completed.")
            return total_saved, False

        if action == "3":
            print("Exited without saving pending entries.")
            return total_saved, False

        if action != "1":
            print("Invalid action. Enter 1, 2, or 3.")
            continue

        question = prompt_with_back("Question")
        if question is None:
            print("Going back to previous menu.")
            continue
        if not question:
            print("Question cannot be empty.")
            continue

        answer = prompt_with_back("Answer")
        if answer is None:
            print("Going back to previous menu.")
            continue
        if not answer:
            print("Answer cannot be empty.")
            continue

        category = choose_category()
        if category is None:
            print("Going back to previous menu.")
            continue

        badge_title = prompt_with_back("Badge Title (e.g., MARKS BOOSTER, KEY STEPS)")
        if badge_title is None:
            print("Going back to previous menu.")
            continue
        if not badge_title:
            badge_title = "MARKS BOOSTER"

        badge_text = prompt_with_back("Badge Text (extra info)")
        if badge_text is None:
            print("Going back to previous menu.")
            continue

        pending.append(build_entry(question, answer, category, badge_title, badge_text))
        print("Added.\n")

        if len(pending) >= AUTO_SAVE_BATCH:
            saved_now = save_callback(pending)
            total_saved += saved_now
            pending = []
            print(f"Auto-saved {saved_now} item(s) after {AUTO_SAVE_BATCH} entries.")

    return total_saved, False


def parse_bulk_blocks(raw_text: str):
    lines = raw_text.replace("\r\n", "\n").split("\n")
    blocks = []
    current_lines = []
    for raw_line in lines:
        line = raw_line.strip()
        if not line:
            continue
        if re.fullmatch(r"-{3,}", line):
            if current_lines:
                blocks.append("\n".join(current_lines))
                current_lines = []
            continue
        current_lines.append(raw_line)

    if current_lines:
        blocks.append("\n".join(current_lines))

    return blocks


def parse_bulk_entry_block(block: str):
    data = {
        "q": "",
        "a": "",
        "b": "",
        "bt": "",
        "c": "",
    }
    current_key = None
    for raw_line in block.splitlines():
        line = raw_line.strip()
        if not line:
            continue
        match = re.match(r"^([A-Za-z]{1,3})\s*:\s*(.*)$", line, flags=re.IGNORECASE)
        if match:
            key = match.group(1).upper()
            value = match.group(2).strip()
            if key == "Q":
                data["q"] = value
                current_key = "q"
            elif key == "A":
                data["a"] = value
                current_key = "a"
            elif key == "B":
                data["b"] = value
                current_key = "b"
            elif key == "BT":
                data["bt"] = value
                current_key = "bt"
            elif key == "C":
                data["c"] = value
                current_key = "c"
            else:
                current_key = None
            continue

        if current_key:
            existing = data[current_key]
            data[current_key] = f"{existing}\n{line}".strip() if existing else line

    question = data.get("q", "").strip()
    answer = data.get("a", "").strip()
    category = normalize_category(data.get("c", ""))
    badge_title = data.get("b", "").strip() or "MARKS BOOSTER"
    badge_text = data.get("bt", "").strip()

    if not question or not answer or category is None:
        return None

    return build_entry(question, answer, category, badge_title, badge_text)


def read_bulk_batch_text():
    print("Paste your batch now and press Ctrl+Z then Enter (Windows) when done.")
    print("Type 'END' on a new line to save this batch now.")
    print("Type 'b' on the first line to go back.")
    lines = []
    first_line = True
    ended_by_end = False
    ended_by_eof = False
    ended_by_interrupt = False

    while True:
        try:
            line = input()
            if first_line and line.strip().lower() == BACK_KEYWORD:
                return {
                    "text": None,
                    "ended_by_end": False,
                    "ended_by_interrupt": False,
                    "went_back": True,
                }
            if line.strip().upper() == "END":
                ended_by_end = True
                break
            lines.append(line)
            first_line = False
        except EOFError:
            ended_by_eof = True
            break
        except KeyboardInterrupt:
            ended_by_interrupt = True
            print("\nKeyboard interrupt detected. Trying to save parsed blocks...")
            break

    return {
        "text": "\n".join(lines),
        "ended_by_end": ended_by_end,
        "ended_by_eof": ended_by_eof,
        "ended_by_interrupt": ended_by_interrupt,
        "went_back": False,
    }


def collect_bulk_entries(save_callback):
    pending = []
    total_saved = 0

    print("\nBulk Mode Format (use --- between questions):")
    print("Q: Your question text")
    print("A: Your answer text")
    print("B: Badge Title (e.g., MARKS BOOSTER)")
    print("BT: Badge Text")
    print("C: 1|2|3  (1=Most, 2=Important, 3=Conceptual)")
    print("---")
    print("\nBulk Mode Commands:")
    print("1. Paste Bulk Batch")
    print("2. SAVE & EXIT")
    print("3. Exit Without Saving Pending")

    while True:
        try:
            action = prompt_with_back("\nChoose action (1-3)")
        except KeyboardInterrupt:
            print("\nKeyboard interrupt detected. Trying to save pending blocks...")
            if pending:
                saved_now = save_callback(pending)
                total_saved += saved_now
                pending = []
                print(f"Successfully Saved {saved_now} Blocks.")
            else:
                print("Successfully Saved 0 Blocks.")
            return total_saved, False

        if action is None:
            if pending:
                saved_now = save_callback(pending)
                total_saved += saved_now
                pending = []
                print(f"Saved {saved_now} pending item(s) before going back.")
            print("Going back to previous menu.")
            return total_saved, True

        if action == "2":
            if pending:
                saved_now = save_callback(pending)
                total_saved += saved_now
                pending = []
                print(f"Saved {saved_now} pending item(s).")
            print("SAVE & EXIT completed.")
            return total_saved, False

        if action == "3":
            print("Exited without saving pending entries.")
            return total_saved, False

        if action != "1":
            print("Invalid action. Enter 1, 2, or 3.")
            continue

        bulk_read_result = read_bulk_batch_text()
        if bulk_read_result["went_back"]:
            print("Going back to previous menu.")
            continue

        raw_bulk = bulk_read_result["text"]
        blocks = parse_bulk_blocks(raw_bulk)
        if not blocks:
            print("No valid blocks found in this batch.")
            if bulk_read_result["ended_by_interrupt"]:
                if pending:
                    saved_now = save_callback(pending)
                    total_saved += saved_now
                    pending = []
                    print(f"Successfully Saved {saved_now} Blocks.")
                return total_saved, False
            continue

        parsed_count = 0
        skipped_count = 0
        saved_this_batch = 0
        for block in blocks:
            parsed = parse_bulk_entry_block(block)
            if parsed:
                pending.append(parsed)
                parsed_count += 1
            else:
                skipped_count += 1

        print(f"Parsed {parsed_count} block(s), skipped {skipped_count} invalid block(s).")

        while len(pending) >= AUTO_SAVE_BATCH:
            batch_to_save = pending[:AUTO_SAVE_BATCH]
            saved_now = save_callback(batch_to_save)
            total_saved += saved_now
            saved_this_batch += saved_now
            pending = pending[AUTO_SAVE_BATCH:]
            print(f"Auto-saved {saved_now} item(s).")

        if bulk_read_result["ended_by_end"] or bulk_read_result["ended_by_eof"]:
            if pending:
                saved_now = save_callback(pending)
                total_saved += saved_now
                saved_this_batch += saved_now
                pending = []
            print(f"Successfully Saved {saved_this_batch} Blocks.")

        if bulk_read_result["ended_by_interrupt"]:
            if pending:
                saved_now = save_callback(pending)
                total_saved += saved_now
                pending = []
                print(f"Successfully Saved {saved_now} Blocks.")
            else:
                print("Successfully Saved 0 Blocks.")
            return total_saved, False

    return total_saved, False


def ensure_structure(data_obj, subject, chapter):
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


def write_data_with_error_handling(js_path, original_content, match, data_obj):
    try:
        write_site_data(js_path, original_content, match, data_obj)
        return True
    except Exception as exc:
        print(f"Error writing {js_path.name}: {exc}")
        return False


def get_leaf_question_lists(node):
    if isinstance(node, list):
        return [node]
    if isinstance(node, dict):
        lists = []
        for value in node.values():
            lists.extend(get_leaf_question_lists(value))
        return lists
    return []


def run_add_questions_flow(js_path, original_content, match, data_obj):
    while True:
        subject = choose_subject()
        if subject is None:
            return

        while True:
            if subject in ["Islamiyat", "Tarjama-tul-Quran"]:
                chapter = choose_chapter_for_subject(data_obj, subject)
            else:
                chapter = choose_chapter()

            if chapter is None:
                break

            while True:
                mode = choose_mode()
                if mode is None:
                    break

                def save_callback(entries):
                    try:
                        return append_and_save(
                            js_path=js_path,
                            original_content=original_content,
                            match=match,
                            data_obj=data_obj,
                            subject=subject,
                            chapter=chapter,
                            entries=entries,
                        )
                    except Exception as exc:
                        print(f"Error writing {js_path.name}: {exc}")
                        return 0

                if mode == "1":
                    total_saved, went_back = collect_single_entries(save_callback)
                else:
                    total_saved, went_back = collect_bulk_entries(save_callback)

                if total_saved > 0:
                    print(f"\nSaved {total_saved} item(s) to {subject} -> Chapter {chapter} in {js_path.name}.")
                else:
                    print("No entries were saved.")

                if went_back:
                    continue

                return


def run_add_model_papers_flow(js_path, original_content, match, data_obj):
    while True:
        subject = choose_model_paper_subject()
        if subject is None:
            return

        ensure_model_paper_structure(data_obj, subject)

        while True:
            mode = choose_mode()
            if mode is None:
                break

            def save_callback(entries):
                try:
                    return append_model_papers_and_save(
                        js_path=js_path,
                        original_content=original_content,
                        match=match,
                        data_obj=data_obj,
                        subject=subject,
                        entries=entries,
                    )
                except Exception as exc:
                    print(f"Error writing {js_path.name}: {exc}")
                    return 0

            if mode == "1":
                total_saved, went_back = collect_single_entries(save_callback)
            else:
                total_saved, went_back = collect_bulk_entries(save_callback)

            if total_saved > 0:
                print(f"\nSaved {total_saved} model paper item(s) to {subject} in {js_path.name}.")
            else:
                print("No model paper entries were saved.")

            if went_back:
                continue

            return


def run_delete_specific_numbers_flow(js_path, original_content, match, data_obj):
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

            if not isinstance(chapter_questions, list):
                print("No questions found to delete.")
                continue

            while True:
                if len(chapter_questions) == 0:
                    print("No questions found to delete.")
                    break

                print(f"\nQuestions in {subject} -> Chapter {chapter}:")
                for idx, item in enumerate(chapter_questions, start=1):
                    question_text = str(item.get("question", "")).strip() if isinstance(item, dict) else ""
                    if not question_text:
                        question_text = "[No question text]"
                    print(f"{idx}. {question_text}")

                while True:
                    chosen = prompt_with_back("Enter question number(s) to delete (e.g., 1, 3, 5)")
                    if chosen is None:
                        print("Going back to previous menu.")
                        break

                    parts = [part.strip() for part in chosen.split(",") if part.strip()]

                    if not parts:
                        print("Invalid input. Please enter one or more numbers separated by commas.")
                        continue

                    if not all(part.isdigit() for part in parts):
                        print("Invalid input. Please enter only numeric indexes, e.g., 1, 3, 5.")
                        continue

                    indexes = sorted({int(part) for part in parts}, reverse=True)
                    if indexes[-1] < 1 or indexes[0] > len(chapter_questions):
                        print("Invalid number. Please enter valid indexes from the displayed list.")
                        continue

                    removed_items = []
                    for index in indexes:
                        removed = chapter_questions.pop(index - 1)
                        removed_items.append((index, removed))

                    if not write_data_with_error_handling(js_path, original_content, match, data_obj):
                        for index, removed in sorted(removed_items, key=lambda item: item[0]):
                            chapter_questions.insert(index - 1, removed)
                        return

                    deleted_summary = ", ".join([f"#{index}" for index in indexes])
                    print(f"Successfully deleted questions: {deleted_summary}.")

                    while True:
                        again = prompt_with_back("Do you want to delete more from this chapter? (y/n)")
                        if again is None:
                            print("Going back to previous menu.")
                            break
                        normalized_again = again.lower()
                        if normalized_again in {"y", "n"}:
                            break
                        print("Invalid choice. Enter y or n.")

                    if again is None or normalized_again == "n":
                        return

                    break

                if chosen is None:
                    break

                if len(chapter_questions) == 0:
                    break


def run_delete_entire_category_flow(js_path, original_content, match, data_obj):
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
                chapter_node = current.get(chapter)
            leaf_lists = get_leaf_question_lists(chapter_node)

            if not leaf_lists:
                print("No questions found to delete.")
                continue

            category = choose_category()
            if category is None:
                print("Going back to previous menu.")
                continue

            total_found = 0
            for question_list in leaf_lists:
                for entry in question_list:
                    if isinstance(entry, dict) and normalize_category(entry.get("category")) == category:
                        total_found += 1

            confirmation = prompt_with_back(f"Found {total_found} questions. Delete all? (y/n)")
            if confirmation is None:
                print("Going back to previous menu.")
                continue

            if confirmation.lower() != "y":
                print("Category delete cancelled.")
                continue

            for question_list in leaf_lists:
                filtered = []
                for entry in question_list:
                    if not (isinstance(entry, dict) and normalize_category(entry.get("category")) == category):
                        filtered.append(entry)
                question_list[:] = filtered

            if not write_data_with_error_handling(js_path, original_content, match, data_obj):
                return

            category_code = get_category_menu_code(category)
            print(f"Success! All questions in Category [{category_code}] for Chapter [{chapter}] have been cleared.")
            continue


def run_delete_question_flow(js_path, original_content, match, data_obj):
    while True:
        action = choose_delete_submenu_action()
        if action is None:
            return

        if action == "A":
            run_delete_specific_numbers_flow(js_path, original_content, match, data_obj)
            continue

        if action == "B":
            run_delete_entire_category_flow(js_path, original_content, match, data_obj)
            continue


def main():
    js_path = Path(__file__).resolve().parent / "content_data.js"
    if not js_path.exists():
        print(f"Error: {js_path.name} not found next to injector_bot.py")
        return

    try:
        original_content, match, data_obj = read_site_data(js_path)
    except Exception as exc:
        print(f"Error reading {js_path.name}: {exc}")
        return

    normalize_existing_site_data_schema(data_obj)

    if not write_data_with_error_handling(js_path, original_content, match, data_obj):
        print(f"Error normalizing {js_path.name}")
        return

    while True:
        action = choose_main_menu_action()
        if action == "1":
            run_add_questions_flow(js_path, original_content, match, data_obj)
        elif action == "2":
            run_delete_question_flow(js_path, original_content, match, data_obj)
        elif action == "4":
            try:
                model_original_content, model_match, model_papers_data_obj = read_model_papers_data(js_path)
            except Exception as exc:
                print(f"Error reading model papers data in {js_path.name}: {exc}")
                continue

            run_add_model_papers_flow(js_path, model_original_content, model_match, model_papers_data_obj)
        else:
            print("Exiting injector bot.")
            return


if __name__ == "__main__":
    main()
