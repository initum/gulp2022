const isProd = process.argv.includes('--production');
const isDev = !isProd;

import social from '../data/social.json';

export default {
  isProd: isProd,
  isDev: isDev,

  htmlmin: {
    collapseWhitespace: isProd
  },

  babel: {
    presets: [
      "@babel/preset-env"
    ]
  },

  webpack: {
    mode: isProd ? "production" : "development"
  },

  imagemin: {
    verbose: true
  },

  fonter: {
    formats: ["ttf", "woff", "eot", "svg"]
  }
}