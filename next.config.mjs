/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'vi'],
        defaultLocale: 'en',
        localeDetection: false,
    },
    images: {
        unoptimized: true,
    },
    transpilePackages: ['mui-one-time-password-input'],
    webpack(config) {
        config.module.rules.push(
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                use: ['@svgr/webpack'],
            },
        );

        return config;
    },
};

export default nextConfig;
