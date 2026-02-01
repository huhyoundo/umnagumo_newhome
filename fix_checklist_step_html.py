import json
import re

file_path = 'd:\\Github\\umnagumo-nextjs-legacy\\public\\content\\checklist-naver-post.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

html = data['html']

# The problem: HTML structure is broken into multiple spans with separate styling commands.
# Example: <p...><span...><u><b>STEP 1</b></u></span><span...><u> :</u></span><span...> Content</span></p>

# We want to normalize this to:
# <p...><b>STEP 1 :</b> Content</p>

# Regex strategy:
# Match the whole paragraph containing "STEP \d"
# Pattern logic:
# <p [^>]*>.*?STEP (\d+).*?<\/p>
# We need to capture the step number and the content.

# Let's try to match the specific messy pattern.
# <span [^>]*>.*?<u><b>STEP (\d+)</b></u></span>.*?<span [^>]*>.*?<u> :</u></span>.*?<span [^>]*>(.*?)</span>

def normalize_step(match):
    step_num = match.group(1)
    content = match.group(2)
    # Reconstruct simple paragraph
    # Preserve the <p> tag exactly as it was?
    # Actually the match should probably just replace the inner content of the P tag if possible, or the whole P tag.
    
    # Let's match the inner spans and replace them.
    return f'<span style="color:#1a237e; font-weight:800; font-size:18px;">STEP {step_num} :</span><span>{content}</span>'

# We will apply this regex to the whole HTML string.
# Pattern looks for:
# <span ...><u><b>STEP (\d+)</b></u></span>  (Step part)
# <span ...><u> :</u></span>                 (Colon part)
# <span ...>(.*?)</span>                     (Content part)

# Note: The attributes inside <span ...> can vary.
pattern = r'<span[^>]*>.*?<u><b>STEP (\d+)</b></u></span>.*?<span[^>]*>.*?<u> :</u></span>.*?<span[^>]*>(.*?)</span>'

# We need to be careful about newlines vs spaces in regex. Naver HTML might have them.
# The view_file output showed everything in one line roughly.

# Replace function
new_html = re.sub(pattern, normalize_step, html, flags=re.DOTALL)

if new_html != html:
    print("Replaced STEP sections.")
    html = new_html
else:
    print("No STEP sections matched. Trying looser pattern.")
    # Looser pattern
    # Just look for STEP \d ... : ... Content
    pass

data['html'] = html

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Done.")
