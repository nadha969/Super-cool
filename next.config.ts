/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shop.supercooluae.com",
        pathname: "/cdn/**",
      },
      {
        protocol: "https",
        hostname: "retail.mideasouthafrica.com",
      },
      {
        protocol: "https",
        hostname: "i5.walmartimages.com",
      },

      // Bing images (IMPORTANT)
      {
        protocol: "https",
        hostname: "th.bing.com",
      },
      {
        protocol: "https",
        hostname: "tse1.mm.bing.net",
      },
      {
        protocol: "https",
        hostname: "tse2.mm.bing.net",
      },
      {
        protocol: "https",
        hostname: "tse3.mm.bing.net",
      },
      {
        protocol: "https",
        hostname: "tse4.mm.bing.net",
      },

      {
        protocol: "https",
        hostname: "www.generalcool.ae",
      },
      {
        protocol: "https",
        hostname: "top10gears.com",
      },
      {
        protocol: "https",
        hostname: "www.citysearch.ae",
      },
    ],
  },
};

module.exports = nextConfig;