/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites(){
    return {
      fallback: [
        {
          source: "/:path*",
          destination: `http://dalbit-api.duckdns.org/api/`,
        }
      ]
    }
  }
}

module.exports = nextConfig
