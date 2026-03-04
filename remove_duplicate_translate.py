#!/usr/bin/env python3
"""
Remove duplicate Google Translate script loader tags from HTML files.
Keeps only the first occurrence of the script tag.
"""

import os
import glob

# Define the script line to look for
TRANSLATE_SCRIPT = '<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>'

def remove_duplicate_translate_tags(filepath):
    """
    Remove duplicate Google Translate script tags from an HTML file.
    Keeps only the first occurrence.
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Count occurrences
    count_before = content.count(TRANSLATE_SCRIPT)
    
    if count_before <= 1:
        print(f"  {os.path.basename(filepath)}: Already has {count_before} occurrence(s). No changes needed.")
        return
    
    # Replace all occurrences with a placeholder, then restore only the first one
    parts = content.split(TRANSLATE_SCRIPT)
    
    # Reconstruct with only the first occurrence
    new_content = TRANSLATE_SCRIPT.join([parts[0], ''.join(parts[1:])])
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    count_after = new_content.count(TRANSLATE_SCRIPT)
    print(f"  {os.path.basename(filepath)}: Removed {count_before - count_after} duplicate(s). Now has {count_after} occurrence(s).")

def main():
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    print(f"Working in directory: {script_dir}")
    print(f"Looking for Google Translate script tags...\n")
    
    # Find all HTML files except style-guide.html
    html_files = glob.glob(os.path.join(script_dir, '*.html'))
    html_files = [f for f in html_files if not os.path.basename(f) == 'style-guide.html']
    html_files.sort()
    
    if not html_files:
        print("No HTML files found.")
        return
    
    print(f"Processing {len(html_files)} HTML file(s):\n")
    
    for filepath in html_files:
        remove_duplicate_translate_tags(filepath)
    
    print("\nDone!")

if __name__ == '__main__':
    main()
