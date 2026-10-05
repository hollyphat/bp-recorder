import { ImageResponse } from "next/og";
import { AppIconSvg } from "@/lib/app-icon";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<AppIconSvg size={32} rounded={0.28} />, size);
}
