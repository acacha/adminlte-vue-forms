const webpack = require('webpack')
const path = require('path')
const version = require('./package.json').version
const MinifyPlugin = require('babel-minify-webpack-plugin')
const merge = require('webpack-merge')

let banner = '/**\n' + ' * Acacha Forms adminlte-vue-forms ' + version + '\n' + ' * https://github.com/acacha/adminlte-vue-forms\n' + ' * Released under the MIT License.\n' + ' */\n'

let isProd = (process.env.NODE_ENV === 'production')

let outputFile = 'acacha-adminlte-vue-forms.js'
let outputFileNode = 'acacha-adminlte-vue-forms.node.js'

if (isProd) {
  outputFile = 'acacha-adminlte-vue-forms.min.js'
  outputFileNode = 'acacha-adminlte-vue-forms.node.min.js'
}

function getPlugins () {
  const plugins = []

  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }))

  plugins.push(new webpack.BannerPlugin({banner: banner, raw: true}))

  // Conditionally add plugins for Production builds.
  if (isProd) {
    plugins.push(new MinifyPlugin())
  }

  return plugins
}

const shared = merge([
  {
    entry: './src/index.js',
    plugins: getPlugins(),
    externals: {
      'axios': {
        commonjs: 'axios',
        commonjs2: 'axios',
        amd: 'axios',
        root: 'axios'
      },
      'moment': {
        commonjs: 'moment',
        commonjs2: 'moment',
        amd: 'moment',
        root: 'moment'
      },
      'change-case': {
        commonjs: 'change-case',
        commonjs2: 'change-case',
        amd: 'change-case',
        root: 'change-case'
      },
      'inputmask': {
        commonjs: 'inputmask',
        commonjs2: 'inputmask',
        amd: 'inputmask',
        root: 'inputmask'
      },
      'vue-multiselect': {
        commonjs: 'vue-multiselect',
        commonjs2: 'vue-multiselect',
        amd: 'vue-multiselect',
        root: 'vue-multiselect'
      },
      'vue': {
        cmmonjs: 'vue',
        commonjs2: 've',
        amd: 'vue',
        root: 'vue'
      }
    },
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
])

const umdOnly = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: outputFile,
    libraryTarget: 'umd',
    library: 'AcachaAdminlteVueForms',
    umdNamedDefine: true
  }
}

const umd = merge(shared, umdOnly)

const nodeOnly = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: outputFileNode
  }
}

const node = merge(shared, nodeOnly)

module.exports = [umd, node]
