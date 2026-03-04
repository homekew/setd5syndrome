import re
import os
from pathlib import Path

# Define the directory
base_dir = "/sessions/sweet-keen-goodall/mnt/for web"

# Define the new clean widget block
new_widget_block = '''<!-- Google Translate Widget -->
<div style="position:fixed;top:10px;right:12px;z-index:99999;background:rgba(26,39,68,0.92);padding:5px 10px;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.25);">
  <div id="google_translate_element"></div>
</div>
<script type="text/javascript">
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    autoDisplay: false
  }, 'google_translate_element');
}
</script>
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
'''

# Find all HTML files except style-guide.html
html_files = [f for f in Path(base_dir).glob("*.html") if f.name != "style-guide.html"]

print(f"Found {len(html_files)} HTML files to process (excluding style-guide.html)\n")

for html_file in sorted(html_files):
    print(f"Processing: {html_file.name}")
    
    # Read the file content
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match the old Google Translate widget block
    # From <!-- Google Translate Widget --> to the closing </script> with element.js
    pattern = r'<!--\s*Google Translate Widget\s*-->.*?<script[^>]*src="[^"]*translate_a/element\.js[^"]*"[^>]*></script>'
    
    # Check if the pattern exists
    if re.search(pattern, content, re.DOTALL):
        # Remove the old widget block
        content_updated = re.sub(pattern, '', content, flags=re.DOTALL)
        
        # Find where to insert the new block - right after <body> tag
        body_pattern = r'(<body[^>]*>)'
        
        def replace_body(match):
            body_tag = match.group(1)
            # Insert new widget block right after <body> tag
            return body_tag + '\n' + new_widget_block
        
        content_updated = re.sub(body_pattern, replace_body, content_updated, count=1)
        
        # Write the updated content back
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content_updated)
        
        # Verify: count occurrences of googleTranslateElementInit
        count = len(re.findall(r'googleTranslateElementInit', content_updated))
        print(f"  ✓ Updated - googleTranslateElementInit count: {count}")
    else:
        # Check if file has any body tag at all
        if re.search(r'<body[^>]*>', content):
            print(f"  - No Google Translate widget found to replace")
        else:
            print(f"  - No <body> tag found")

print("\nReplacement complete!")
