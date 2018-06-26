const webpack = require("webpack");
const path = require("path");


let config = {

  	entry: "./src/index.js",

    output: {
      path: path.resolve("./dist"),
      filename: "./main.js",
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ],
    },

    devServer: {
      contentBase: path.resolve("."),
      open: true,
      watchOptions: {
        ignored: ['node_modules'],
      },
      overlay: {
          warnings: true,
          errors: true
      },
      publicPath: 'http://localhost:8080/dist/', // doit être absolu
    }

    // resolve: {
    //   extensions: ['.js', '.jsx'],
    //   modules: ['node_modules', path.resolve(__dirname, 'src')]
    // },

}

module.exports = config;
