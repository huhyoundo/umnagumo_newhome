
import json

file_path = 'd:\\Github\\umnagumo-nextjs-legacy\\public\\content\\checklist-naver-post.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

html = data['html']
print("Length of HTML:", len(html))
print("Last 2000 chars:")
print(html[-2000:])
