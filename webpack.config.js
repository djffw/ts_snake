const path=require('path');
//const { EntryOptionPlugin } = require('webpack');

const HTMLWebpackPlugin=require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { Extension, isArrowFunction } = require('typescript');
const { EnvironmentPlugin } = require('webpack');

//webpack配置信息
module.exports={
    entry:"./src/index.ts", //指定入口文件
    output:{
        path:path.resolve(__dirname,'dist'),//指定打包文件目录
        filename:"bundle.js",//指定打包后的文件
        //不使用箭头
        environment:{
            arrowFunction:false,
            const:false
        }
    },
    //指定webpack打包时用的模块
    module:{
        //指定加载的规则
        rules:[
            {
                test:/\.ts$/, //指定规则生效的文件
                use:[
                    {
                    //配置babel
                    //指定加载器
                    loader:"babel-loader",
                    //设置
                    options:{
                        //设置预定义环境
                        presets:[
                            
                            [
                                 //指定环境的插件
                                "@babel/preset-env",
                                //配置信息
                                {
                                    //使用corejs的方式，usage表示按需加载
                                    "useBuiltIns":"usage",
                                    //指定corejs版本
                                    "corejs":"3",
                                    //要兼容的目标浏览器
                                    targets:{
                                        "ie":"11",
                                        "chrome":"88"
                                    },
                                    
                                    
                                    
                                }
                            ]
                        ]
                    }
                }
                    ,'ts-loader' 

                ],//要使用的loader


                //要排除的文件
                exclude: /node-modules/ 
            },
            //设置less文件的处理
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    //引入postcss
                    {
                        loader:"postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]

    },

    //配置webpack插件
    plugins:[
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            //使用的模板
            template:"./src/index.html"
        }),
    ],
    //设置引用模块
    resolve:{
        extensions:['.ts','.js']
    }
}