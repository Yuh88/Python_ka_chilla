import re

def check_tabs():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the indices of each tab opening and closing div
    for match in re.finditer(r'<div[^>]*id="tab-[^>]*>', content):
        print(f"Found {match.group(0)} at {match.start()}")
        
    print("Checking article lengths and tab dividers")
    
check_tabs()
