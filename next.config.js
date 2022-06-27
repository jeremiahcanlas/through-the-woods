module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    mapbox_token: process.env.MAPBOX_API_KEY,
  },
};
