/* eslint-disable no-undef */
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "10",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties"],
    [
      "module-resolver",
      {
        alias: {
          "@main": "./src/main",
          "@data": "./src/data",
          "@domain": "./src/domain",
          "@infra": "./src/infra",
          "@presentation": "./src/presentation",
          "@utils": "./src/utils",
        },
      },
    ],
    ["add-module-exports"],
  ],
  ignore: ["**/*.spec.ts", "**/*.test.ts"],
};
