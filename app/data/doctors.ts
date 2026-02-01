export type Doctor = {
    role: string;
    name: string;
    image: string;
    credentials: readonly string[];
    namStyleLink?: string;
};

export const doctors: readonly Doctor[] = [
    {
        role: '대표원장',
        name: '엄 순 찬',
        image: '/의료진 페이지 사진/2(대표원장님).jpg',
        credentials: [
            '순천향대학교 의과대학 졸업',
            '일본 교토대학교 부속병원 성형외과 전공의 수련',
            '일본 교토대학교 의학부 의학연구과 외과계 박사',
            '일본 도쿄 가슴전문 나구모 클리닉 수석의사',
            '한국 성형외과 전문의 취득',
            '대한 성형외과학회 정회원',
            '대한 성형외과의사회 정회원',
            '대한 미용성형외과학회 정회원',
            '현) 엄나구모 성형외과 대표원장',
        ],
    },
    {
        role: '대표원장',
        name: '남 정 현',
        image: '/의료진 페이지 사진/3(남정현-원장님).jpg',
        credentials: [
            '순천향대학교 의과대학 졸업',
            '순천향대학병원 성형외과 전문의',
            '순천향대학교 대학원 성형외과학 석사',
            '대한 성형외과학회 정회원',
            '대한 성형외과의사회 정회원',
            '대한 미용성형외과학회 정회원',
            '대한 성형외과 유방성형연구회 학술위원',
            '현) 엄나구모 성형외과 대표원장',
        ],
        namStyleLink: '/nam-style',
    },
    {
        role: '마취통증의학과 전문의',
        name: '나 중 열',
        image: '/의료진 페이지 사진/Dr_Na.jpg',
        credentials: [
            '충남대학교 의과대학 졸업',
            '순천향대학병원 마취통증의학과 전문의',
            '대한 마취통증의학회 정회원',
        ],
    },
] as const;
