/*
* app.js 入口模块
* 职责;
*   创建服务
*   做一些服务相关的配置
*        模板引擎
*        body-parser 解析表单 post 请求体
*   挂载路由
*   监听端口启动服务
*/  

var express = require('express');
var path = require('path');
var router = require('./router.js');
var bodyParser = require('body-parser');

var app = express(); 

app.use(express.static(path.join(__dirname,'./public')));//公开 public 文件路径

//配置 body-parser 中间件(插件，专门用来解析表单post请求体)[需要安装 body-parser 包]
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// 把路由容器挂载到 app 服务中
app.use(router);

app.listen(3030,function(){
    console.log('监听了端口：3030.');
})
