const HtmlPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development", //设置打包模式 production:生产模式 development:开发模式

  //entry 配置打包时的入口文件
  // entry:'',            //指定打包时的入口文件，默认是./src/index.js（不建议修改）
  // entry:['','']        //通过数组指定多个入口文件打包成一个文件
  //通过对象指定多个入口文件打包成多个压缩文件
  // entry:{
  //     a:'',
  //     b:'',
  // }

  //output 配置打包后文件的存放路径
  output: {
    // filename:'',    //打包后的文件名
    clean: true,    //配置每次打包自动清理打包文件目录下的文件
    // path:''         //指定打包目录，必须为绝对路径，默认为项目下的dist目录
  },

  //loader
  /*
        webpack在默认情况下只会处理js文件，若需要处理其他类型文件，则可通过配置loader实现其他文件的处理
        - 例如：
            需要引入css文件，并进行打包，则可以引入 css-loader 
        - 使用步骤：
            1. 安装loader   yarn add css-loader -D
            2. 在webpack.config.js文件中配置loader
     */
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], //loader的执行顺序是从后往前的
      },
      {
        test: /\.(jpg|png|gif)$/,
        type: "asset/resource", //图片等直接资源类型的数据，可以指定type来处理
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },

  plugins:[
    new HtmlPlugin({
      // title:"hello world"
      template:"./src/index.html"
    })
  ],
  devtool:"inline-source-map"
};
