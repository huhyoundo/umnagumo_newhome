
import json
import re

file_path = 'd:\\Github\\umnagumo-nextjs-legacy\\public\\content\\checklist-naver-post.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

html = data['html']

# 1. Remove the Image Component
# Target: <div class="se-component se-image se-l-default" id="SE-6c5e3c04-570c-46dc-9544-5dc363371b79"> ... </div>
# using regex to ensure we match the full div
image_pattern = r'<div class="se-component se-image[^"]*" id="SE-6c5e3c04-570c-46dc-9544-5dc363371b79">.*?</div>\s*</div>\s*</div>\s*</div>'
# The structure is nested: se-component -> se-component-content -> se-section -> se-module
# Let's try a simpler replacement since the ID is unique.
# We will match from <div ... id="SE-6c5e3c04..." to the closing of that component.
# Determining the closing of the component is tricky with regex. 
# Better: Splitting by the known ID component string.

# Let's look at the structure from .bak view:
# <div class="se-component se-image se-l-default" id="SE-6c5e3c04-570c-46dc-9544-5dc363371b79"> ... </div>
# It seems to be followed by <div class="se-component se-placesMap ...

if 'SE-6c5e3c04-570c-46dc-9544-5dc363371b79' in html:
    print("Found Doctor Image component. Removing...")
    # Find start index
    start_marker = '<div class="se-component se-image se-l-default" id="SE-6c5e3c04-570c-46dc-9544-5dc363371b79">'
    start_idx = html.find(start_marker)
    if start_idx != -1:
        # Find the next component start to know where to cut
        # The next component is likely se-placesMap id="SE-284d0997-42af-4e67-94db-688fa94a4d92"
        next_marker = 'id="SE-284d0997-42af-4e67-94db-688fa94a4d92"'
        next_idx = html.find('<div class="se-component se-placesMap', start_idx)
        
        if next_idx != -1:
            # Cut from start_idx to next_idx
            html = html[:start_idx] + html[next_idx:]
            print("Removed Doctor Image block.")
        else:
             print("Could not find next component to determine end of image block.")

# 2. Append Doctor Typography Section
# We need to insert it at the end of se-main-container
# The HTML ends with ...</div></div> which closes se-main-container?
# Let's verify end of string.
# .bak ended with: <div class="se-component se-placesMap ...></div> <div class="se-component se-text ...> ... </div> </div>
# We want to append AFTER the hashtags (SE-5dd8e570...)

has_text_section = "doctor-typography-section" in html
if not has_text_section:
    print("Adding Doctor Typography Section...")
    
    doctor_section_html = """
<div class="se-component se-text se-l-default doctor-typography-section">
    <div class="se-component-content">
        <div class="se-section se-section-text se-l-default">
            <div class="se-module se-module-text">
                <div style="border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; padding: 60px 0; margin: 60px 0;">
                    <p style="text-align: center; font-size: 11px; letter-spacing: 0.2em; color: #1a237e; font-weight: 600; margin-bottom: 40px; text-transform: uppercase;">Medical Team</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 60px;">
                        
                        <!-- Doctor 1 -->
                        <div style="display: flex; flex-direction: column;">
                            <h3 style=\"font-size: 24px; font-weight: 700; color: #111; margin-bottom: 8px; letter-spacing: -0.02em;\">엄순찬 <span style=\"font-size: 16px; font-weight: 400; color: #666; margin-left: 4px;\">대표원장</span></h3>
                            <div style="width: 20px; height: 1px; background-color: #1a237e; margin-bottom: 24px;"></div>
                            <ul style="font-size: 14px; color: #4b5563; line-height: 1.9; list-style: none; padding: 0; margin: 0;">
                                <li>순천향대학교 의과대학 졸업</li>
                                <li>일본 교토대학교 부속병원 성형외과 전공의 수련</li>
                                <li>일본 교토대학교 의학부 의학연구과 외과계 박사</li>
                                <li>일본 도쿄 가슴전문 나구모 클리닉 수석의사</li>
                                <li>한국 성형외과 전문의 취득</li>
                                <li>대한 성형외과학회 정회원</li>
                                <li>대한 성형외과의사회 정회원 / 미용성형외과학회 창립회원</li>
                                <li style=\"color: #1a237e; font-weight: 700; margin-top: 8px;\">현) 엄나구모 성형외과 대표원장</li>
                            </ul>
                        </div>

                        <!-- Doctor 2 -->
                        <div style="display: flex; flex-direction: column;">
                            <h3 style=\"font-size: 24px; font-weight: 700; color: #111; margin-bottom: 8px; letter-spacing: -0.02em;\">남정현 <span style=\"font-size: 16px; font-weight: 400; color: #666; margin-left: 4px;\">대표원장</span></h3>
                            <div style="width: 20px; height: 1px; background-color: #1a237e; margin-bottom: 24px;"></div>
                            <ul style="font-size: 14px; color: #4b5563; line-height: 1.9; list-style: none; padding: 0; margin: 0;">
                                <li>순천향대학교 의과대학 졸업 / 성형외과 전문의</li>
                                <li>순천향대학교 대학원 성형외과학 석사</li>
                                <li>대한 성형외과학회 정회원</li>
                                <li>대한 성형외과의사회 정회원</li>
                                <li>대한 미용성형외과학회 정회원</li>
                                <li style=\"color: #1a237e; font-weight: 700; margin-top: 8px;\">현) 엄나구모 성형외과 대표원장</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
"""
    # Insert it before the last </div> (which closes main container?)
    # Valid HTML structure: <div class="se-main-container"> ...components... </div>
    # But usually smart editor HTML ends with a closing div for the last component, and then closing div for main.
    # Let's find the last closing div.
    
    # We want to append it to the content list.
    # Just append it to the end of the string, but BEFORE the final </div> which closes se-main-container.
    # Assuming the string ends with </div>
    
    if html.strip().endswith('</div>'):
        # Remove last 6 chars '</div>'
        html = html.strip()[:-6] + doctor_section_html + "</div>"
        print("Appended Doctor Typography Section.")
    else:
        print("HTML does not end with </div>. Appending strictly.")
        html = html + doctor_section_html

data['html'] = html

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Done.")
