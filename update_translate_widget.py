import re
import os

# Directory containing HTML files
directory = "/sessions/sweet-keen-goodall/mnt/for web/"

# Get all HTML files except style-guide.html
html_files = [f for f in os.listdir(directory) if f.endswith('.html') and f != 'style-guide.html']

# Pattern to match the outer wrapper div with any of the three background colors
# Captures the background color to preserve it
outer_wrapper_pattern = r'<div style="text-align:right;padding:5px 16px 4px;(background:#[0-9a-f]{6});?">'

# Replacement for outer wrapper (keeping the background color)
def replace_outer_wrapper(match):
    bg_color = match.group(1)
    return f'<div style="text-align:right;padding:6px 16px 6px;{bg_color};min-height:36px;display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:8px;">'

# Pattern for the google_translate_element div
google_element_pattern = r'<div id="google_translate_element" style="display:inline-block;font-size:13px;min-height:24px;min-width:120px;"></div>'

# Replacement for google_translate_element
google_element_replacement = r'<div id="google_translate_element" style="display:inline-block;font-size:13px;min-height:28px;min-width:140px;vertical-align:middle;"></div>'

# Process each HTML file
for html_file in sorted(html_files):
    file_path = os.path.join(directory, html_file)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update outer wrapper div
    updated_content = re.sub(outer_wrapper_pattern, replace_outer_wrapper, content)
    
    # Update google_translate_element div
    updated_content = re.sub(google_element_pattern, google_element_replacement, updated_content)
    
    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print(f"Updated: {html_file}")

print("\nAll files updated successfully!")

# Show the updated widget block from index.html for confirmation
index_path = os.path.join(directory, 'index.html')
with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the translate widget section
translate_section_pattern = r'<div style="text-align:right;[^>]*background:[^>]*>[\s\S]*?</div>\s*</div>'
match = re.search(translate_section_pattern, content)

if match:
    print("\n" + "="*60)
    print("Updated widget block from index.html:")
    print("="*60)
    print(match.group(0)[:500])  # Print first 500 chars to show the structure
