module.exports = {
  entry: './app/index.js',
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  devtool: "source-map",
  output: {
    filename: './app/bundle.js',
  }
};