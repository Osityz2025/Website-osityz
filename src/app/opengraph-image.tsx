import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Osityz — Maritime AI Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050816",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Blue glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "rgba(37,99,235,0.22)",
            filter: "blur(100px)",
          }}
        />

        {/* Violet glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 440,
            height: 440,
            borderRadius: "50%",
            background: "rgba(139,92,246,0.18)",
            filter: "blur(80px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div
            style={{
              background: "rgba(37,99,235,0.15)",
              border: "1px solid rgba(96,165,250,0.35)",
              borderRadius: 999,
              padding: "10px 28px",
              color: "#7dd3fc",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Maritime AI Platform
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 104,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-3px",
              lineHeight: 1,
            }}
          >
            Osityz
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 28,
              color: "#94a3b8",
              maxWidth: 760,
              lineHeight: 1.5,
            }}
          >
            AI-powered workflows for shipbrokers, charterers, traders, and
            operators
          </div>

          {/* URL */}
          <div
            style={{
              marginTop: 8,
              fontSize: 20,
              color: "#3b82f6",
              fontWeight: 600,
            }}
          >
            osityz.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
