import { ImageResponse } from "next/og";

export const alt = "QODIX Studio — Building Beyond Digital.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          padding: "72px",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 6, color: "#777777" }}>
          <span>QODIX.STUDIO</span>
          <span>INDEPENDENT DIGITAL TECHNOLOGY STUDIO</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 132, lineHeight: 1, fontWeight: 700 }}>BUILDING</div>
          <div style={{ display: "flex", fontSize: 132, lineHeight: 1, color: "#2a2a2a" }}>
            BEYOND
          </div>
          <div style={{ display: "flex", fontSize: 132, lineHeight: 1 }}>DIGITAL.</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #252525", paddingTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, border: "2px solid #ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700 }}>
              Q
            </div>
            <span style={{ fontSize: 30, letterSpacing: 4 }}>QODIX</span>
          </div>
          <span style={{ fontSize: 22, color: "#b5b5b5" }}>WEB DEVELOPMENT / SOFTWARE / AI / DIGITAL PRODUCTS</span>
        </div>
      </div>
    ),
    size
  );
}
