
import json
import re

file_path = 'd:\\Github\\umnagumo-nextjs-legacy\\public\\content\\checklist-naver-post.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

html = data['html']

# Find all se-component se-image
# flexible regex to capture id and src
image_pattern = re.compile(r'<div class="se-component se-image[^"]*" id="([^"]+)">.*?src="([^"]+)".*?</div>', re.DOTALL)

matches = image_pattern.findall(html)

print(f"Found {len(matches)} images.")
for i, (comp_id, src) in enumerate(matches):
    print(f"Image {i+1}: ID={comp_id}, Src={src[:100]}...")

# Also check for text section "doctor-typography-section"
if "doctor-typography-section" in html:
    print("\ndoctor-typography-section is PRESENT.")
else:
    print("\ndoctor-typography-section is MISSING.")
