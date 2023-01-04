# 构建工具

- 当习惯了在node中编写代码的方式后，再回到前端编写html、css、js这些东西 会感觉到各种的不便
  - 例如：
    - 不能放心的使用模块化规范（浏览器兼容性问题）
    - 即使可以使用模块化规范，也会面临模块过多时的加载问题
- 通过构建工具可以对代码进行打包，将多个模块打包成一个文件。
  - 这样既解决了浏览器兼容性问题，又解决了模块过多的问题
  - 通过构建工具可以将使用ESM（ES模块化）规范编写的代码转换为旧的js语法，这样可以使得所有的浏览器都可以兼容



# webpack

- 目前大部分前端框架都已经配置好了webpack，故在框架中使用webpack十分简单

- webpack官方文档 [概念 | webpack 中文文档 | webpack 中文文档 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/concepts/)

- 使用步骤

  1. 初始化项目 `yarn init -y`

  2. 安装依赖 `webpack`、`webpack-cli

     - webpack-cli 是一个webpack的一个命令行工具，安装webpack-cli可以通过输入命令使用webpack（webpack-cli的安装是可选的）

     > ```bash
     >  yarn add -D webpack 
     >  yarn add -D webpack-cli
     > ```
     >
     > `-D` 表示安装的是开发依赖

  3. 在项目中创建src目录，编写代码

  4. 对写好的代码进行打包，命令如下

     ```bash
     npx webpack
     yarn webpack
     ```

     - 通过命令行进行打包需要安装 webpack-cli

     - 打包完成后出现一个dist目录，项目文件被压缩到这个目录下，最终执行的是该目下被压缩的文件

     - webpack会将要执行的代码进行打包，没有执行的代码不会进行打包

       ```js
       //配置运行webpack的脚本，通过 yarn build 运行
         "scripts": {
           "build":"webpack"
         }
       ```

- webpack的配置文件

  - 配置文件为 `webpack.config.js`
- webpack 是由node运行的，所以在webpack的配置文件中应遵循node的模块化规范（commonJs规范）
  
```js
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

```

## babel 

- babel可以将新的js语法转为旧的js语法，以提高代码的兼容性

- 如果需要在webpack中使用babel，则在webpack的配置文件中引入babel的loader即可

- 使用步骤

  1. 安装

     ```bash
     yarn add -D babel-loader @babel/core @babel/preset-env
     ```

  2. 引入loader

     ```js
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
     ```

  3. 在package.json中设置兼容性浏览器列表，具体配置可在github中搜索**browserslist**，网站：[browserslist/browserslist: 🦔 Share target browsers between different front-end tools, like Autoprefixer, Stylelint and babel-preset-env (github.com)](https://github.com/browserslist/browserslist)

     ```json
       "browserslist": [
         "defaults"
       ]
     ```

## 插件（plugin）

- 插件用来为webpack扩展功能

- HtmlWebpackPlugin

  - 用于在打包文件后创建html页面

  - 使用步骤

    1. 安装

       ```bash
       yarn add -D html-webpack-plugin
       ```

    2. 在`webpack.config.js`文件中引入插件并配置

       - 引入插件包：

         ```js
         const HtmlPlugin = require("html-webpack-plugin")
         ```

       - 配置插件：

         ```js
           plugins:[
             new HtmlPlugin({
               // title:"hello world"
               template:"./src/index.html"
             })
           ]
         ```

## 设置开发服务器

- 过多的手动构建项目会导致开发效率降低，通过设置开发服务器后，修改代码后会自动构建代码，从而减少不必要的手动构建

- 两种自动构建项目方式

  1.  监听文件变化自动构建项目（**不常用**）
     
     ```bash
yarn webpack --watch
     ```
     
  2.  webpack 开发服务器
  
     ```bash
     ## 1. 添加依赖
     yarn add -D webpack-dev-server
   
     ## 2. 运行webpack-dev-server，--open 表示自动打开浏览器页面
   yarn webpack server --open
     ```
  
- 设置到package.json文件的脚本命令

  ````json
    "scripts": {
      "build": "webpack",
      "watch": "webpack --watch",
      "dev": "webpack server --open"
    }
  ````

- 常用的cil命令行工具会配置好webpack开发服务器以及相关功能

- 注意，使用服务器开发后，会将项目代码打包在服务器里面，项目运行的是服务器中的代码，并不是运行打包在dist目录下的代码，所以在项目部署前，最好手动构建一次代码，以保证服务器中部署代码是最新的，运行的代码也是最新的

## 设置inline-source-map开发工具，便于代码调试

- 在`webpack.config.js`文件中加入以下配置，可设置打包后的代码与源代码的映射，便于调试

  ```json
  devtool:"inline-source-map"
  ```

- 设置好了以后，可以对打包代码对应的源代码进行调试，运行的依然是打包后的代码

# Vite

- vite 也是前端的构建工具

- 当项目过于庞大时，使用webpack打包代码会很慢，相较于webpack，vite采用了不同的运行方式

  >webpack:
  >
  >- 打包后再运行，会导致性能比较差
  >
  >vite：
  >
  >- 在开发时，并不对代码进行打包，而是采用ESM（ES模块化）的方式来运行项目
  >- 在项目部署时，再对项目进行打包

- 除了打包速度快，vite使用起也很方便

  - 安装

    ```bash
    ## 安装vite，安装后无需再安装vite的命令行工具，vite中集成了命令行工具
    yarn add -D vite
    ```

  - 引入模块

    > index.html
    >
    > ```html
    > <!-- type="module" 表示使用es模块化规范 -->
    > <script type="module" src="./index.js"></script>
    > ```
    >
    > index.js
    >
    > ```js
    > //引入js
    > import m1 from "./m1"  
    > //引入css
    > import "./style/index.css"
    > ```

  - 启动开发服务器

    ```bash
    yarn vite
    ```

  - 打包项目

    ```bash
    ## 打包后也会有dist目录
    yarn vite build
    ```

  - 启动打包后的项目

    ```bash
    ## vite打包后的代码只能通过部署在服务器来运行
    yarn vite preview #预览打包后的代码
    ```

  - 在package.json文件中添加scripts

    ```json
      "scripts": {
        "dev":"vite",
        "build":"vite build",
        "preview":"vite preview"
      }
    ```

  - 快速创建一个基于的vite构建的项目

    ```bash
    npm create vite@latest
    
    yarn create vite
    
    pnpm create vite
    ```

- vite的配置文件`vite.config.js`

  - 安装插件 @vitejs/plugin-legacy（类似于babel的一个插件,用于处理浏览器兼容性）

    ```
    yarn add -D @vitejs/plugin-legacy
    ```

  - 安装terser（压缩代码的工具）

    ```shell
    yarn add -D terser
    ```

  - `vite.config.js`配置

    ```js
    //defineConfig  在编写配置文件时给与提示
    import { defineConfig } from "vite";
    import legacy from '@vitejs/plugin-legacy'
    
    export default defineConfig({
      plugins: [
        legacy({
          targets: ["defaults", "IE 11"],
        }),
      ],
    });
    
    ```

# 其他

``` html
<!-- defer表示延迟加载：会在页面加载完成以后加载js -->
    <script defer src="./main.js"></script>
```

- 在js中可能会操作dom，如果在html中引入js的位置或时机太早，会导致操作dom失败
  - 解决方式
    - 1.可以加入在script标签中加入``` defer``` 
    - 2.可以将script标签放到后面引入