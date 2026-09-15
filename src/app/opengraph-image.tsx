import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import { AtomMark } from "@/components/Logo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #05070d 0%, #0a1122 55%, #101a30 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "10px 22px",
            borderRadius: 999,
            alignSelf: "flex-start",
            background: "rgba(76,147,247,0.12)",
            border: "1px solid rgba(76,147,247,0.35)",
            color: "#7ab4ff",
            fontSize: 26,
          }}
        >
          Electricals &middot; Solar &middot; Automation
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 44,
          }}
        >
          <div style={{ display: "flex", color: "#f2f5fb", fontSize: 64, fontWeight: 700, lineHeight: 1.08 }}>
            Complete electrical,
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.08,
              backgroundImage: "linear-gradient(90deg, #7ab4ff, #4c93f7, #818cf8)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            solar &amp; automation.
          </div>
        </div>

        <div style={{ display: "flex", marginTop: 36, fontSize: 30, color: "#93a1ba", maxWidth: 880 }}>
          {siteConfig.fullName} — solar, electrical, fire alarm, CCTV & automation installed
          and supported across Zirakpur and the tricity area.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 56,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <AtomMark size={38} />
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 600, color: "#f2f5fb" }}>
            {siteConfig.fullName}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
