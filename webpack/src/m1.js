// import $ from 'jquery'
//在js中引入css
import "./style/index.css";
//引入图片
import haha from "./images/haha.jpg";

export default {
  setM1() {
    document.body.insertAdjacentHTML("beforeend", "<h1>前端模块1</h1>");
    // $("body").append('<h1>前端模块1</h1>');
    document.body.insertAdjacentHTML("beforeend", `<img src ="${haha}" /> `);
  },
};
