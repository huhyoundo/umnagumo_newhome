import json
import os

file_path = 'd:\\Github\\umnagumo-nextjs-legacy\\public\\content\\checklist-naver-post.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

html_content = data['html']

# I need to find the block I previously inserted. 
# It started with <div class="se-component se-text se-l-default"> and contained "엄순찬 대표원장"
# I will use a regex or string find to locate the container of "엄순찬 대표원장" and replace that whole block.

# Validating unique string to find the start of the block
start_marker = '<!-- Doctor 1: Eom Soon-chan -->'
# Wait, I commented that in the python script but did I include it in the replacement content?
# Yes, I did: "<!-- Doctor 1: Eom Soon-chan -->"

# But to be safe, I'll search for the outer container text I used:
# <div style="display: flex; flex-direction: column; gap: 40px; margin: 60px 0;">

search_str = '<div style="display: flex; flex-direction: column; gap: 40px; margin: 60px 0;">'
start_idx = html_content.find(search_str)

if start_idx == -1:
    print("Error: Could not find the doctor section to replace.")
    # Fallback: maybe looking for the Name?
    search_str = '엄순찬 대표원장'
    name_idx = html_content.find(search_str)
    if name_idx == -1:
        print("Error: Strictly could not find doctor section.")
        exit(1)
    # If found by name, try to find the container div backwards? 
    # This is risky. Let's assume the previous write worked as expected.
    # If not found, maybe I should print the context around keywords.
    exit(1)

# Now find the end of this block. 
# The block ends with the closing of the 3 nested divs I added?
# actually I replaced the whole `se-module-text` content?
# No, I replaced the whole `se-component` block.
# The previous script replaced `html_content[:start_idx] + new_html + html_content[idx:]` 
# where start_idx was the `se-component` div.
# So my new block starts with `<div class="se-component se-text se-l-default">`

# Let's search for the generic start of the component I injected.
component_start = '<div class="se-component se-text se-l-default">'  # This is common...
# But I know it contains "엄순찬 대표원장".

# Let's verify the content is there.
if "엄순찬 대표원장" not in html_content:
    print("Doctor string not found.")
    exit(1)

# Constructing the new "Typography focused" HTML (No Images)
# Using a grid or flex layout for side-by-side text.
# Styling: "Nam Style" -> Serif headings, Navy/Gold accents.

new_doctor_html = '''
<div class="se-component se-text se-l-default doctor-typography-section">
    <div class="se-component-content">
        <div class="se-section se-section-text se-l-default">
            <div class="se-module se-module-text">
                <div style="border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; padding: 60px 0; margin: 60px 0;">
                    <p style="text-align: center; font-size: 11px; letter-spacing: 0.2em; color: #1a237e; font-weight: 600; margin-bottom: 40px; text-transform: uppercase;">Medical Team</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 60px;">
                        
                        <!-- Doctor 1 -->
                        <div style="display: flex; flex-direction: column;">
                            <h3 style="font-size: 24px; font-weight: 700; color: #111; margin-bottom: 8px; letter-spacing: -0.02em;">엄순찬 <span style="font-size: 16px; font-weight: 400; color: #666; margin-left: 4px;">대표원장</span></h3>
                            <div style="width: 20px; height: 1px; background-color: #1a237e; margin-bottom: 24px;"></div>
                            <ul style="font-size: 14px; color: #4b5563; line-height: 1.9; list-style: none; padding: 0; margin: 0;">
                                <li>순천향대학교 의과대학 졸업</li>
                                <li>일본 교토대학교 부속병원 성형외과 전공의 수련</li>
                                <li>일본 교토대학교 의학부 의학연구과 외과계 박사</li>
                                <li>일본 도쿄 가슴전문 나구모 클리닉 수석의사</li>
                                <li>한국 성형외과 전문의 취득</li>
                                <li>대한 성형외과학회 정회원</li>
                                <li>대한 성형외과의사회 정회원 / 미용성형외과학회 창립회원</li>
                                <li style="color: #1a237e; font-weight: 700; margin-top: 8px;">현) 엄나구모 성형외과 대표원장</li>
                            </ul>
                        </div>

                        <!-- Doctor 2 -->
                        <div style="display: flex; flex-direction: column;">
                            <h3 style="font-size: 24px; font-weight: 700; color: #111; margin-bottom: 8px; letter-spacing: -0.02em;">남정현 <span style="font-size: 16px; font-weight: 400; color: #666; margin-left: 4px;">대표원장</span></h3>
                            <div style="width: 20px; height: 1px; background-color: #1a237e; margin-bottom: 24px;"></div>
                            <ul style="font-size: 14px; color: #4b5563; line-height: 1.9; list-style: none; padding: 0; margin: 0;">
                                <li>순천향대학교 의과대학 졸업 / 성형외과 전문의</li>
                                <li>순천향대학교 대학원 성형외과학 석사</li>
                                <li>대한 성형외과학회 정회원</li>
                                <li>대한 성형외과의사회 정회원</li>
                                <li>대한 미용성형외과학회 정회원</li>
                                <li style="color: #1a237e; font-weight: 700; margin-top: 8px;">현) 엄나구모 성형외과 대표원장</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
'''

# Strategy: Replace the previous block based on finding the specific content I added.
# I used: <div style=\"display: flex; flex-direction: column; gap: 40px; margin: 60px 0;\">
previous_content_identifier = '<div style="display: flex; flex-direction: column; gap: 40px; margin: 60px 0;">'
start_idx = html_content.find(previous_content_identifier)

if start_idx == -1:
    print("Could not find previous content identifier. Aborting to avoid corrupting file.")
    exit(1)

# To find where to cut, I need to go back to the start of the component containing this div.
# The structure I wrote was:
# <div class="se-component se-text se-l-default">
#     <div class="se-component-content">
#         <div class="se-section se-section-text se-l-default">
#             <div class="se-module se-module-text">
#                 <div style="display: flex...

# So I need to find the `<div class="se-component` BEFORE the identifer.
component_start_idx = html_content.rfind('<div class="se-component', 0, start_idx)

# And find the end.
# I will use the same div balancing logic starting from component_start_idx
idx = component_start_idx
balance = 0
found_end = False

while idx < len(html_content):
    if html_content[idx:].startswith('<div'):
        balance += 1
        idx += 4
    elif html_content[idx:].startswith('</div'):
        balance -= 1
        idx += 5
        if balance == 0:
            found_end = True
            break
    else:
        idx += 1

if not found_end:
    print("Error parsing divs")
    exit(1)

end_idx = idx + 1

# Update
updated_html = html_content[:component_start_idx] + new_doctor_html + html_content[idx:] # idx is after </div>

data['html'] = updated_html

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Successfully updated checklist-naver-post.json with text-only layout")
