//引入express中间件
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,'/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/list",(req,res)=>{
    console.log(123);
    const arr = [{"src":"/uc/1.mp4"},{"src":"/uc/2.mp4"}]; 
    res.send(JSON.stringify(arr));
});

//监听端口为8080
const server = app.listen(8080, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});