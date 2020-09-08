const http = require('http')
    , https = require('https')
    , express = require('express')
    , app = express();


class server {
    static getApp() {
        return app;
    }
}

let s = app.listen(8081, "localhost", function (req,res) {
    const host = s.address().address;
    const port = s.address().port;
    console.log(`Example app listening at http://${host}:${port}`)


});

app.get('/', function (req, res) {
    res.end("Nodejs Server Load ")
});



module.exports = server;