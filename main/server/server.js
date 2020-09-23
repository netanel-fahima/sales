const http = require('http')
    , https = require('https')
    , express = require('express')
    , app = express(),
    bodyParser = require('body-parser');


class server {

    constructor() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.all("/*", function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
            next();
        });

        app.get("/", (req, res) => {
            throw new Error("went wrong!");
        });


        let s = app.listen(8081, "localhost", function (req, res) {
            const host = s.address().address;
            const port = s.address().port;
            console.log(`Example app listening at http://${host}:${port}`)
        });

    }

     getApp() {
        return app;
    }
}

module.exports = new server();
