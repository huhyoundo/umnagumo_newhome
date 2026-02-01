'use client';

function cleanupHtml(html: string) {
    if (!html) return '';
    // Fix broken images by removing referer
    let cleaned = html.replace(/<img/gi, '<img referrerpolicy="no-referrer"');

    // Improve Typography & Layout
    // 1. Center align images by default and add spacing
    cleaned = cleaned.replace(/class="se-module-image"/gi, 'class="se-module-image" style="display:flex; justify-content:center; margin: 40px 0;"');

    // Fix: Remove isolated punctuation (colons) that mess up the layout
    // Removes <p>:</p>, <p> : </p>, <div>:</div> etc.
    cleaned = cleaned.replace(/<(p|div|span)[^>]*>\s*(:|：)\s*<\/\1>/gi, '');

    // Fix: Remove colon specifically after "STEP N" patterns even if inline or messy
    cleaned = cleaned.replace(/(STEP\s*\d+)(?:<[^>]+>|\s|&nbsp;)*(:|：)/gi, '$1');

    // 2. Add style to Q&A headings (Targeting <b> tags inside <p>)
    // Naver Smart Editor usually wraps text in <p class="se-text-paragraph"><span><b>...
    // We will target generic <b> tags that look like headers (short text?) or just enhance all <b>
    // Better: The user screenshot shows "수술 직후 상태" as bold. 
    // Let's target paragraphs that contain ONLY bold text or start with bold.

    // 3. Improve paragraph readability - Global
    // We inject a style block instead of inline replacing every paragraph to be safer and cover more cases.

    // Ensure all images have max-width
    cleaned = cleaned.replace(/style="[^"]*"/gi, (match) => {
        let newStyle = match;
        if (match.includes('width')) newStyle = newStyle.slice(0, -1) + ';max-width:100%;height:auto;"';
        return newStyle;
    });

    return `
      <style>
        /* =========================================
           PREMIUM EDITORIAL DESIGN SYSTEM
           ========================================= */

        /* 1. Global Reset & Typography */
        .checklist-html-content {
            color: #2c2c2c;
            font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
            font-size: 17px;
            line-height: 1.8;
        }

        /* 2. Main Container Constraints */
        /* Note: The parent div handles max-width, but we ensure content doesn't overflow */
        .checklist-html-content img {
            max-width: 100% !important;
            height: auto !important;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.06);
        }

        /* 3. Paragraph Styling - The "Reading" Experience */
        .checklist-html-content .se-text-paragraph {
          font-size: 17px !important;
          line-height: 1.85 !important;
          color: #374151 !important; /* Gray-700 for comfort */
          margin-bottom: 24px !important;
          word-break: keep-all;
          letter-spacing: -0.015em;
          text-align: left !important;
        }

        /* 4. Highlighted Headers (Q., STEP, etc) */
        /* The signature look: Navy text with a subtle marker highlight */
        .checklist-html-content u > b,
        .checklist-html-content strong,
        .checklist-html-content b {
            color: #1a237e !important; /* Brand Navy */
            font-weight: 700 !important;
            font-size: 19px !important;
            letter-spacing: -0.01em;
            position: relative;
            display: inline; /* Fix: changed from inline-block to inline to prevent line breaks */
            margin: 0;      /* Fix: remove margins that break flow */
            text-decoration: none !important;
        }
        
        /* Marker Effect for Headers */
        .checklist-html-content u > b::after {
            content: '';
            position: absolute;
            bottom: 2px;
            left: -2px;
            right: -2px;
            height: 8px;
            background-color: rgba(201, 169, 98, 0.15); /* Gold tint */
            z-index: -1;
            border-radius: 0;
        }
        .checklist-html-content u {
            text-decoration: none !important;
        }

        /* 5. Link Cards (OG Links) - Interactive & Modern */
        .se-component.se-oglink {
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            border-radius: 16px;
            overflow: hidden;
            margin: 50px 0 !important;
            border: 1px solid rgba(0,0,0,0.06);
            background: #fff;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
            text-decoration: none !important;
        }
        
        .se-component.se-oglink:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            border-color: rgba(26, 35, 126, 0.3);
        }

        /* Remove default link styles specifically for OG link containers if captured */
        .se-oglink a {
            text-decoration: none !important;
            color: inherit !important;
        }
        
        /* 6. Standard Lists (Bullets/Numbers) */
        .se-text-list {
            padding-left: 1.5em;
            margin-bottom: 30px;
            margin-top: 10px;
        }
        .se-text-list-item {
            margin-bottom: 12px;
            padding-left: 0.5em;
            position: relative;
        }
        /* Custom Bullet */
        .se-text-list-type-bullet-disc .se-text-list-item::marker {
            color: #C9A962; /* Brand Gold */
        }

        /* 7. Dividers - Elegant */
        .se-hr {
            border: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
            margin: 60px 0;
        }

        /* 8. Doctor Profile Section (Custom) */
        .doctor-typography-section {
            background-color: #f8fafc; /* Slate-50 */
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 48px;
            margin: 80px 0 !important;
            position: relative;
            overflow: hidden;
        }
        /* Decorative top accent */
        .doctor-typography-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, #1a237e, #C9A962);
        }

        /* 9. Component Spacing */
        .se-component {
            margin-bottom: 20px;
        }
        .se-module-image {
            margin: 50px 0 !important;
        }

      </style>
      ${cleaned}
    `;
}

type NaverChecklistPostPayload = {
    title: string;
    html: string;
    source?: string;
    blogId?: string;
    logNo?: string;
    fetchedAt?: string;
};

export default function ChecklistContent({
    naverPost,
}: {
    naverPost: NaverChecklistPostPayload | null;
}) {
    if (!naverPost) {
        return (
            <div className="py-20 text-center text-gray-500">
                <p>체크리스트 컨텐츠를 불러올 수 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-0">
            <h1 className="mb-10 text-center text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                {naverPost.title}
            </h1>
            <div
                className="checklist-html-content"
                dangerouslySetInnerHTML={{ __html: cleanupHtml(naverPost.html) }}
            />
        </div>
    );
}
