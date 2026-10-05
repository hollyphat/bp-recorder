import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BP Recorder",
    short_name: "BP Recorder",
    description: "A simple place to track your blood pressure readings over time.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9fafb",
    theme_color: "#dc2626",
    icons: [
      {
        src: "/icon-192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
