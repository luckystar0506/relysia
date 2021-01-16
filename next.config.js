const withImages = require("next-images");

module.exports = withImages({
  webpack(config, options) {
    return config;
  },
  images: {
    domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com", "assets.vercel.com"],
  },
});
