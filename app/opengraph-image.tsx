import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sailly – We Handle the Calls. You Run Your Business.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              color: "white",
              fontWeight: 700,
              marginRight: 20,
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            Sailly
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 24,
            maxWidth: 900,
          }}
        >
          We Handle the Calls.
          <br />
          You Run Your Business.
        </div>

        {/* Sub-copy */}
        <div
          style={{
            fontSize: 24,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          The AI phone receptionist for hotels, restaurants &amp; medical practices.
        </div>

        {/* Bottom badges */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 48,
          }}
        >
          {["24/7 Active", "13 Languages", "90% Automated"].map((badge) => (
            <div
              key={badge}
              style={{
                background: "rgba(99,102,241,0.2)",
                border: "1px solid rgba(99,102,241,0.5)",
                borderRadius: 8,
                padding: "10px 20px",
                color: "#a5b4fc",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
