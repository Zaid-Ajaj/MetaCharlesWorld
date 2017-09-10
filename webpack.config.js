var path = require("path");

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".ts", ".js"] 
  },
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    port: 8080
  },
  module: {
    loaders: [ 
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}