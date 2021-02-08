const path = require("path");

module.exports = {
  // 最初に読み込むファイルを指定
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // x? は あってもなくてもいいという意味 正規表現
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", "ts", "tsx"],
  },
  // 出力の設定
  output: {
    // output セクションは、出力するファイルの設定
    path: path.resolve(__dirname, "dist"),
    // 出力するファイル名
    filename: "index.js",
    publicPath: "dist/",
  },
  devServer: {
    hot: true,
    // ファイルを変更すると自動的にブラウザに反映させるフラグa
    open: true,
    // 起動時にブラウザで開くフラグ,
  },
};
