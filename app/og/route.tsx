import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#0e1013",
          backgroundImage:
            "linear-gradient(135deg, #15181d 0%, #0e1013 58%, #201314 100%)",
          color: "#e9ecef",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(241,91,85,0.65)",
            borderRadius: "32px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "54px 60px",
            position: "relative",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "#ff817a",
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                letterSpacing: "-0.055em",
                lineHeight: 1.05,
              }}
            >
              {site.name}
            </div>
            <div
              style={{
                color: "#ff817a",
                display: "flex",
                fontSize: 34,
                fontWeight: 500,
                marginTop: 22,
              }}
            >
              {site.role}
            </div>
          </div>
          <div
            style={{
              color: "#8b93a0",
              display: "flex",
              fontSize: 20,
              letterSpacing: "0.06em",
            }}
          >
            rafshan.dev
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
