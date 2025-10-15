module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        { jsxImportSource: "nativewind", "react-compiler": {} },
      ],
    ],
    plugins: [
      "react-native-reanimated/plugin", // must always be last
    ],
  };
};
