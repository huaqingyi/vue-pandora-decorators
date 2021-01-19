const path = require('path');
const webpack = require('webpack');
const { cpus } = require('os');

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, on Mac: sudo npm run / sudo yarn
const devServerPort = 8080;
const name = 'Admin';

module.exports = {
    lintOnSave: false,
    // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    productionSourceMap: false,
    devServer: {
        hot: true,
        port: devServerPort,
        open: true,
        overlay: {
            warnings: false,
            errors: true,
        },
        progress: false,
        // proxy: {
        //     // change xxx-api/login => /mock-api/v1/login
        //     // detail: https://cli.vuejs.org/config/#devserver-proxy
        //     [process.env.VUE_APP_BASE_API]: {
        //         target: `http://localhost:${mockServerPort}/mock-api/v1`,
        //         changeOrigin: true, // needed for virtual hosted sites
        //         ws: true, // proxy websockets
        //         pathRewrite: {
        //             ['^' + process.env.VUE_APP_BASE_API]: '',
        //         },
        //     },
        // },
    },
    pwa: {
        name: name,
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: path.resolve(__dirname, 'src/pwa/service-worker.js')
        }
    },
    parallel: cpus().length > 1,
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
        },
    },
    // pluginOptions: {
    //     'style-resources-loader': {
    //         preProcessor: 'scss',
    //         patterns: [
    //             path.resolve(__dirname, 'src/styles/_variables.scss'),
    //             path.resolve(__dirname, 'src/styles/_mixins.scss'),
    //         ],
    //     },
    // },
    chainWebpack (config) {
        config.resolve.alias
            .set('@', path.resolve(__dirname, './src'))
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        config.set('name', name);

        // https://webpack.js.org/configuration/devtool/#development
        config.when(process.env.NODE_ENV === 'development', config =>
            config.devtool('cheap-eval-source-map')
        );

        // remove vue-cli-service's progress output
        config.plugins.delete('progress');
        // replace with another progress output plugin to solve the this bug:
        // https://github.com/vuejs/vue-cli/issues/4557
        config
            .plugin('simple-progress-webpack-plugin')
            .use(require.resolve('simple-progress-webpack-plugin'), [
                {
                    format: 'compact',
                },
            ]);

        config.when(process.env.NODE_ENV !== 'development', config => {
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial', // only package third parties that are initially dependent
                    },
                    antd: {
                        name: 'chunk-antd', // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/, // in order to adapt to cnpm
                    },
                    antdIcon: {
                        name: 'chunk-antd-icon', // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?@ant-design(.*)/, // in order to adapt to cnpm
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: path.resolve(__dirname, 'src/components'),
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true,
                    },
                },
            });
            config.optimization.runtimeChunk('single');
        });
    },
    configureWebpack: config => {
        config.plugins.push(
            new webpack.DefinePlugin({
                PRODUCTION: process.env.NODE_ENV === 'production' ? true : false,
                // TOKEN: `'这里可以和后端协商免验证的令牌, 用于dev开发模式'`
                LOCAL: `'${process.env.NODE_ENV}'`,
                DEBUGTOKEN: `'${process.env.NODE_ENV === 'development' ? '0LVgVPwwIs60pmAmJy2OrjdooRROKwSO' : ''}'`,
                VUE_APP_API_BASE_URL: `'${process.env.VUE_APP_API_BASE_URL}'`,

                // 玉符配置
                WELLKNOWN: `'${process.env.WELLKNOWN}'`,
                CLIENTID: `'${process.env.CLIENTID}'`,
                CLIENTSECRET: `'${process.env.CLIENTSECRET}'`,
                REDIRECTURI: `'${process.env.REDIRECTURI}'`,

                // 微信配置
                APPID: `'${process.env.APPID}'`,
                NONCESTR: `'${process.env.NONCESTR}'`,
                AGENTID: `'${process.env.AGENTID}'`,
                APPNAME: `'${process.env.APPNAME}'`,
            })
        );
    },
};
