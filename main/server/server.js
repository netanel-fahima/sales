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

    }

     getApp() {
        return app;
    }
}

module.exports = new server();
