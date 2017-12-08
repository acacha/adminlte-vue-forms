const webpack = require('webpack')

const path = require('path')

const version = require('./package.json').version
var banner = '/**\n' + ' * Acacha Forms adminlte-vue ' + version + '\n' + ' * https://github.com/acacha/adminlte-vue-forms\n' + ' * Released under the MIT License.\n' + ' */\n'

var isProd = (process.env.NODE_ENV === 'production')

var outputFile = 'acacha-adminlte-vue-forms.js'

if (isProd) {
  outputFile = 'acacha-adminlte-vue-forms.min.js'
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: outputFile,
    libraryTarget: 'umd',
    library: 'AcachaAdminlteVueForms',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: false,
      mangle: false
    }),
    new webpack.BannerPlugin({banner: banner, raw: true})
  ],
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.vue?$/,
      exclude: /node_modules/,
      loader: 'vue-loader'
    }
    ]
  }
}
