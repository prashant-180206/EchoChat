const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// 1️⃣ Get Expo default config
const config = getDefaultConfig(__dirname);

// 2️⃣ If you need CommonJS files (for firebase compat), add .cjs to resolver
config.resolver.sourceExts.push("cjs");

// 3️⃣ Fix package export issues for some packages (like firebase with Hermes)
config.resolver.unstable_enablePackageExports = false;

// 4️⃣ Apply NativeWind plugin (tailwind for React Native)
module.exports = withNativeWind(config, {
  input: "./app/global.css",
});
