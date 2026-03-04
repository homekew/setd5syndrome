import re
from pathlib import Path

base_dir = "/sessions/sweet-keen-goodall/mnt/for web"
html_files = [f for f in Path(base_dir).glob("*.html") if f.name != "style-guide.html"]

print("VERIFICATION REPORT\n" + "="*60)

for html_file in sorted(html_files):
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Count occurrences of googleTranslateElementInit
    count = len(re.findall(r'googleTranslateElementInit', content))
    
    # Check if the widget block starts right after <body>
    body_pattern = r'<body[^>]*>\s*<!-- Google Translate Widget -->'
    has_proper_placement = bool(re.search(body_pattern, content))
    
    # Check for the new widget div
    has_widget_div = bool(re.search(r'<div id="google_translate_element"></div>', content))
    
    # Check for the translate script
    has_translate_script = bool(re.search(r'src="//translate\.google\.com/translate_a/element\.js', content))
    
    print(f"\n{html_file.name}:")
    print(f"  googleTranslateElementInit count: {count}")
    print(f"  Proper widget placement: {has_proper_placement}")
    print(f"  Has widget div: {has_widget_div}")
    print(f"  Has translate script: {has_translate_script}")
    
    if count == 2 and has_proper_placement and has_widget_div and has_translate_script:
        print(f"  Status: ✓ VALID")
    else:
        print(f"  Status: ✗ NEEDS REVIEW")

print("\n" + "="*60)
print(f"\nstyle-guide.html (should NOT be modified):")
with open(f"{base_dir}/style-guide.html", 'r', encoding='utf-8') as f:
    style_guide_content = f.read()
style_guide_count = len(re.findall(r'googleTranslateElementInit', style_guide_content))
print(f"  googleTranslateElementInit count: {style_guide_count}")
print(f"  Status: {'✓ UNCHANGED' if style_guide_count == 0 else '✗ MODIFIED (ERROR)'}")
