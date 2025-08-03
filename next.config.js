// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@wagmi/connectors', '@web3modal/ethereum', '@web3modal/react'],

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            },
            // --- TAMBAHAN DI SINI ---
            {
                protocol: 'https',
                hostname: 'ipfs.io',
                port: '',
                pathname: '/ipfs/**',
            },
            {
                protocol: 'https',
                hostname: 'dweb.link',
                port: '',
                pathname: '/ipfs/**',
            },
            // ------------------------
        ],
    },

    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.optimization.minimizer.forEach((minimizer) => {
                if (minimizer.constructor.name === 'TerserPlugin') {
                    minimizer.options.exclude = /HeartbeatWorker\.js$/;
                }
            });
        }
        return config;
    },
};

module.exports = nextConfig;