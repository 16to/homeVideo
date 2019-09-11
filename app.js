//引入express中间件
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,'/')));

//监听端口为8080
const server = app.listen(8080, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});