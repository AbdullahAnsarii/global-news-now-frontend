/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/1200/800',
            },
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
                port: ''
            }
        ],
    },
}

module.exports = nextConfig
