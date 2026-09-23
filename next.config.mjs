/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Using unoptimized output so the site works cleanly on Netlify's
    // static/Next runtime without extra image-optimization configuration.
    // Swap this out if you wire up a remote image loader later.
    unoptimized: true,
  },
};

export default nextConfig;
