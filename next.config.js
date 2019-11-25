const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules");

const nextConfig = {
    webpack: config => {
        const originalEntry = config.entry;
        config.entry = async() => {
            const entries = await originalEntry();
            if (entries["main.js"]) {
                entries["main.js"].unshift("./client/polyfills.js");
            }
            return entries;
        }

        return config;
    }
};

module.exports = withPlugins(
    [
        [
            withTM,
            {
                transpileModules: ["ky", "ky-universal"],
            },
        ],
    ], nextConfig);