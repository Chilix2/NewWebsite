import { ImageResponse } from "next/og";

export const runtime = "edge";

export default function favicon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "16%",
          color: "white",
          fontWeight: 900,
        }}
      >
        S
      </div>
    ),
    {
      width: 192,
      height: 192,
    }
  );
}
