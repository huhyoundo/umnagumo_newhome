
import json

file_path = 'd:\\Github\\umnagumo-nextjs-legacy\\public\\content\\checklist-naver-post.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

html = data['html']
if "STEP 1" in html:
    idx = html.find("STEP 1")
    start = max(0, idx - 100)
    end = min(len(html), idx + 200)
    print(f"Context:\n{html[start:end]}")
else:
    print("STEP 1 not found in HTML")
