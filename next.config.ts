import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* Aqui permito que o next.js carregue imagens de domínios remotos */
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
    ],
  },
  outputFileTracingRoot: "/",
}

export default nextConfig
