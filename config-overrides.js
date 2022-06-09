/* eslint-disable */
const webpack = require('webpack');
const WorkBoxPlugin = require('workbox-webpack-plugin');
module.exports = {
    webpack: (config, env) => {
        const fallback = config.resolve.fallback || {};
        Object.assign(fallback, {
            assert: require.resolve('assert/'),
            buffer: require.resolve('buffer'),
            path: require.resolve('path-browserify'),
            process: require.resolve('process/browser'),
            stream: require.resolve('stream-browserify'),
            crypto: require.resolve('crypto-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            fs: false,
            tls: false,
            net: false,
            os: require.resolve('os-browserify/browser'),
            util: require.resolve('util/'),
            zlib: require.resolve('browserify-zlib'),
        });
        config.resolve.fallback = fallback;

        config.plugins.forEach((plugin) => {
            if (plugin instanceof WorkBoxPlugin.InjectManifest) {
                plugin.config.maximumFileSizeToCacheInBytes = 50 * 1024 * 1024;
            }
        });

        config.plugins = [
            ...config.plugins,
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
                process: 'process/browser',
            }),
        ];

        config.module.rules.push({
            test: /\.(js|mjs|jsx)$/,
            enforce: 'pre',
            loader: require.resolve('source-map-loader'),
            resolve: {
                fullySpecified: false,
            },
        });
        config.ignoreWarnings = [/Failed to parse source map/]; // gets rid of a billion source map warnings
        return config;
    },
};
