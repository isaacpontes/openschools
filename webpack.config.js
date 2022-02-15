const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/resources/js/app.js')
  },

  output: {
    path: path.resolve(__dirname, 'public', 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin()
  ]
};
