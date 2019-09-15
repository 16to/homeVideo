//引入express中间件
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require("fs");

function findSync(startPath) {
    let result = [];
    function finder(filepath) {
        let files = fs.readdirSync(filepath);
        files.forEach((val, index) => {
            let fPath = path.join(filepath, val);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) {
                finder(fPath);
                return;
            }
            if (stats.isFile()) {
                const ext = path.extname(val);
                if (ext === ".mp4" || ext === ".MP4") {
                    result.push(
                        {
                            "src": fPath,
                            "name": path.basename(val, ext),
                            "type": ext,
                        }
                    );
                }
            }
        });

    }
    finder(startPath);
    return result;
}


app.get("/api/list", (req, res) => {
    const arr = findSync('./uc');
    res.send(JSON.stringify(arr));
});

// app.get("/uc/*", (req, res) => {
//     console.log(req);
//     readBigFileEntry(path.join(__dirname, req.url), res);
// });

app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//监听端口为8080
const server = app.listen(8080, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});


function readBigFileEntry(filename, response) {
    var readStream = fs.ReadStream(filename);
    var contentType = 'none';
    var ext = path.extname(filename);
    switch (ext) {
        case ".flv":
            contentType = "video/flv";
            break;
        case ".mp4":
            contentType = "video/mp4";
            break;
    }

    response.writeHead(200, {
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
        'Server': 'nodejs',
        'X-Powered-By': 'nodejs'
    });
    readStream.on('close', function () {
        response.end();
        console.log("Stream finished.");
    });
    console.log(response);
    readStream.pipe(response);
}