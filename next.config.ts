import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Claude Design handoff prototypes live in project/ as the visual source of
  // truth. They are not part of the build.
  outputFileTracingExcludes: {
    "*": ["./project/**"],
  },
};

export default nextConfig;
