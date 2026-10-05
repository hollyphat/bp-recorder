import { ImageResponse } from "next/og";
import { AppIconSvg } from "@/lib/app-icon";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(<AppIconSvg size={192} rounded={0.22} />, {
    width: 192,
    height: 192,
  });
}
