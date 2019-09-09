//引入express中间件
const express = require('express');
const app = express();

app.use(express.static('/'));

//监听端口为8080
const server = app.listen(8080, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});