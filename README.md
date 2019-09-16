# babel.webpack.setting

Practive how to set Javascript environment with Babel and Webpack.

## Babel + Webpack + ES6 + SASS

![babel + webpack + es6](https://poiemaweb.com/img/babel-webpack.png)

### webpack.config.js
```javascript
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // entry files
    entry: ['@babel/polyfill', './src/js/main.js', './src/sass/main.scss'],
    // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    plugins: [
        // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
        new MiniCssExtractPlugin({ filename: 'css/style.css' })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src/js')
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map',
    // https://webpack.js.org/concepts/mode/#mode-development
    mode: 'development'
};
```

### .babelrc
```
{
    "presets": ["@babel/preset-env"],
    "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

Referenced this page. [Link(korean)](https://poiemaweb.com/es6-babel-webpack-1)

## Babel + Webpack + React

![babel + webpack + react](https://miro.medium.com/max/1200/1*6ItHoU8x6M-m7-Pt2UG7cw.png)

### webpack.config.js
```javascript 
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new miniCssExtractPlugin({
            filename: './css/app.css',
        })
    ]
}
```

### .babelrc
```
{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
}
```

Referenced this page. [Link(english)](https://blog.usejournal.com/setting-up-react-webpack-4-babel-7-from-scratch-2019-b771dca2f637)

## Babel + Webpack + Vue

![babel + webpakc + vue](https://i.imgur.com/avEUftE.png)

### webpack.config.js
```javascript
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js'  webpack 1용 입니다
        },
        extensions: ['*', '.js', '.vue', '.json'],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),
        new miniCssExtractPlugin({
            filename: './css/app.css'
        }),
        new vueLoaderPlugin(),
    ]
}
```

### .babelrc
```
{
    "presets": ["@babel/preset-env"]
}
```

Referenced this page. [Link(korean)](https://medium.com/@benjaminwoojang/%EC%B2%98%EC%9D%8C-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-vue-js-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-setup%ED%95%98%EA%B8%B0-e3540b9bd964)