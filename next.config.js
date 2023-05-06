/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: false,
  webpack(config){
    config.module.rules.push({
      test: /\.svg$/,
      use: [{loader: '@svgr/webpack', options: {icon:true}}]
    })
    return config
  },
  images: {
    domains: ['localhost']
  },
  i18n
}
module.exports = nextConfig
