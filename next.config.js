// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@wagmi/connectors', '@web3modal/ethereum', '@web3modal/react'],

    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'placehold.co',
            port: '',
            pathname: '/**'
        }]
    },

    webpack: (config, { isServer }) => {
        // Aturan ini hanya berlaku untuk build client-side,
        // karena minifikasi JavaScript hanya terjadi di sana.
        if (!isServer) {
            // Kita cari plugin Terser di dalam array minimizer Webpack.
            config.optimization.minimizer.forEach((minimizer) => {
                // Nama konstruktornya adalah 'TerserPlugin'
                if (minimizer.constructor.name === 'TerserPlugin') {
                    // INI BAGIAN PALING PENTING:
                    // Kita tambahkan opsi 'exclude' ke konfigurasi Terser.
                    // Ini memerintahkan Terser untuk mengabaikan file apa pun
                    // yang cocok dengan regular expression ini.
                    minimizer.options.exclude = /HeartbeatWorker\.js$/;
                }
            });
        }

        // Selalu kembalikan config yang sudah dimodifikasi.
        return config;
    },
};

module.exports = nextConfig;