import { ImageResponse } from "next/og";
export const alt =
  "Aurel Advisory — Independent thinking. Lasting progress. A fictional portfolio demonstration.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: "#f7f7f0",
        padding: 70,
        color: "#242820",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 55, letterSpacing: -3 }}>aurel.</span>
        <span style={{ fontSize: 15, letterSpacing: 3 }}>
          INDEPENDENT THINKING. LASTING PROGRESS.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 86,
          letterSpacing: -5,
          lineHeight: 1.05,
        }}
      >
        <span>Clarity for today.</span>
        <span>Confidence for tomorrow.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #c9cec0",
          paddingTop: 25,
          fontSize: 17,
        }}
      >
        <span>STRATEGY / TRANSFORMATION / INNOVATION</span>
        <span>FICTIONAL PORTFOLIO DEMONSTRATION</span>
      </div>
    </div>,
    size,
  );
}
