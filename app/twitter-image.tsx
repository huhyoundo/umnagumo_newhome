import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "86px 96px",
          background:
            "radial-gradient(1200px 700px at 20% 30%, rgba(110,214,208,0.22) 0%, rgba(110,214,208,0.00) 55%), radial-gradient(900px 520px at 80% 70%, rgba(31,77,90,0.18) 0%, rgba(31,77,90,0.00) 55%), linear-gradient(180deg, #fbfaf7 0%, #f4f2ed 100%)",
          color: "#171a1f",
          letterSpacing: "-0.02em",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#1f4d5a",
            marginBottom: 18,
          }}
        >
          UMNAGUMO PLASTIC SURGERY
        </div>
        <div
          style={{
            fontSize: 74,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          엄나구모 성형외과
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            lineHeight: 1.35,
            color: "rgba(23,26,31,0.74)",
            marginTop: 22,
            maxWidth: 920,
          }}
        >
          강남 논현 가슴성형 전문 · 맞춤 디자인 · 내시경 기반 정밀 수술
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 42,
            fontSize: 22,
            color: "rgba(23,26,31,0.62)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#6ed6d0",
              boxShadow: "0 0 0 8px rgba(110,214,208,0.18)",
            }}
          />
          www.bust1.com
        </div>
      </div>
    ),
    { ...size }
  );
}
