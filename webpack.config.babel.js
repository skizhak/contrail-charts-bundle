import { join } from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'

let fileName = 'contrail-charts.bundle'
const libraryName = 'cc'
function absolute(...args) {
    return join(__dirname, ...args)
}
const defaultEnv = { 'dev': true }

export default (env = defaultEnv) => {
    const plugins = []
    const rules = [{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
        }),
    }, {
        test: /\.html/,
        loader: 'handlebars-loader',
    }, {
        loader: 'babel-loader',
        test: /\.js$/,
        include: /(src)/,
        query: {
            presets: ['es2015'],
        }
    }]

    const externals = {}

    if (env.prod) {
        plugins.push(new UglifyJSPlugin({
            compress: {
                warnings: false
            },
            mangle: {
                keep_fnames: true,
            },
            sourceMap: true,
            include: /\.min\.js$/,
        }))
    }

    // Let's put css under css directory.
    plugins.push(new ExtractTextPlugin(fileName + '.css'))

    const configList = []

    const config = {
        entry: {
            [fileName]: absolute('src/index.js'),
            [`${fileName}.min`]: absolute('src/index.js'),
        },
        devtool: 'source-map',
        module: { rules },
        externals: externals,
        resolve: {
            modules: [absolute('src'), 'node_modules'],
            alias: {},
            extensions: ['.js'],
        },
        plugins: plugins,
        stats: { children: false }
    }

    const defaultConfig = Object.assign({}, config, {
        output: {
            path: absolute('build'),
            filename: '[name].js',
            library: libraryName,
            libraryTarget: 'umd',
            umdNamedDefine: false,
        }
    })
    configList.push(defaultConfig)

    return configList
}