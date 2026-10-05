import { ImageResponse } from "next/og";
import { AppIconSvg } from "@/lib/app-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<AppIconSvg size={180} rounded={0.22} />, size);
}
