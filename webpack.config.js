const path = require("path");

module.exports = {
  // 最初に読み込むファイルを指定
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  // 出力の設定
  output: {
    // output セクションは、出力するファイルの設定
    path: path.resolve(__dirname, "dist"),
    // 出力するファイル名
    filename: "index.js",
    publicPath: "dist/",
  },
};
