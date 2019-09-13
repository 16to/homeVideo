//引入express中间件
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require("fs");
 
function findSync(startPath) {
    let result=[];
    function finder(filepath) {
        let files=fs.readdirSync(filepath);
        files.forEach((val,index) => {
            let fPath=path.join(filepath,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()){
                finder(fPath);
                return;
            }
            if(stats.isFile()) {
                result.push(
                    {
                        "src":fPath,
                        "name":val,
                        "type":path.extname(val),
                    }
                );
            }
        });

    }
    finder(startPath);
    return result;
}

app.use(express.static(path.join(__dirname,'/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/list",(req,res)=>{
    const arr = findSync(path.join(__dirname,'/uc'));
    res.send(JSON.stringify(arr));
});

//监听端口为8080
const server = app.listen(8080, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});