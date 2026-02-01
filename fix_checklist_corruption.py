import json

file_path = 'd:\\Github\\umnagumo-nextjs-legacy\\public\\content\\checklist-naver-post.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

html = data['html']

# The corruption was observed as:
# ... </div>
# >
#                 </div>>
#                 <div class="se-component se-placesMap ...

# It seems I appended extra content or missed the cutting point.
# I will search for the specific corrupted string pattern I saw in the view_file.
# Pattern: ">\n                </div>>"
# Or I can look for the end of the doctor section I inserted.
# My inserted doctor section ends with: ... </div>\n</div>\n
# And followed by corruption.

# Let's target the transition between the doctor section and the map section.
# Doctor section class: "doctor-typography-section"
# Map section ID: "SE-284d0997-42af-4e67-94db-688fa94a4d92" (from Step 538 view)

# Strategy: Find the end of doctor section and start of map section, and clean everything in between.

doctor_sig = 'class="se-component se-text se-l-default doctor-typography-section"'
map_sig = 'id="SE-284d0997-42af-4e67-94db-688fa94a4d92"'

doc_idx = html.find(doctor_sig)
map_idx = html.find(map_sig)

if doc_idx == -1 or map_idx == -1:
    print("Could not find doctor or map sections.")
    # Fallback: simple string replacement of the garbage if unique
    garbage = '>\n                </div>>'
    if garbage in html:
        html = html.replace(garbage, '')
        print("Removed garbage string directly.")
    else:
        # Try another variation seen in view_file
        # Line 7 end ... </div>\n</div>\n>\n                </div>>\n                <div ...
        garbage2 = '>\n                </div>>'
        # Actually, let's look at the context from Step 538
        # ... </div>\n</div>\n>\n                </div>>\n                <div class="se-component se-placesMap ...
        
        # The doctor section has a lot of closing divs.
        # My inserted HTML ended with </div>\n</div>\n</div>\n</div> (4 nested divs)
        # The file content has `>\n                </div>>`
        
        # Let's just blindly replace the corrupted sequence because it's specific.
        target_garbage = '>\n                </div>>' 
        # Wait, the view output (Step 538 lines 7-8) showed:
        # ... </div>\n</div>\n>\n                </div>>\n                <div ...
        
        # I will replace `>\n                </div>>` with emptiness or correct closing if needed.
        # But wait, looking at the previous update script (Step 510):
        # I replaced content UP TO component_start_idx (start of se-component)
        # AND FROM idx (after </div>).
        # It seems `html_content[idx:]` included `                </div>` which was the closing of the *previous* component I thought I was inside?
        # No, `idx` was calculated by balancing divs.
        
        # Let's just fix the file by string replacement which is safer than complex logic now.
        pass

# Attempt direct garbage styling removal
# From Step 538: `</div>\n</div>\n>\n                </div>>\n                <div`
bad_pattern = '>\n                </div>>'
if bad_pattern in html:
    html = html.replace(bad_pattern, '')
    print("Fixed corrupted tags (pattern 1).")

# Also check for solitary `>`
if '\n>\n' in html:
     html = html.replace('\n>\n', '\n')
     print("Fixed stray >.")
     
# Check for `</div>>`
if '</div>>' in html:
    html = html.replace('</div>>', '</div>')
    print("Fixed </div>>.")

data['html'] = html

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Done.")
