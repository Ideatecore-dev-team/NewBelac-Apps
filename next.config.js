/** @type {import('next').NextConfig} */
const nextConfig = {

    transpilePackages: ['@wagmi/connectors', '@web3modal/ethereum', '@web3modal/react'],
}

module.exports = nextConfig