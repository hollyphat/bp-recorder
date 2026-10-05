import { ImageResponse } from "next/og";
import { AppIconSvg } from "@/lib/app-icon";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(<AppIconSvg size={512} rounded={0} />, {
    width: 512,
    height: 512,
  });
}
