//proptypes
//req request end emit
//get sync mysql
//get sync response
//handel async call in node.js

let http = require('http');
let events = require('events');

// Options to be used by request
var options = {
    host: 'localhost',
    port: '8081',
    path: '/'
};


get = function (url = "/", funcs = function () {
}) {
    options.path = url;
    console.log(url);
    options.method = "get";
    // Make a request to the server
    var req = http.request(options, function (response) {

        // Continuously update stream with data
        var body = '';

        response.on('data', function (data) {
            body += data;
        });

        response.on('end', function (e) {
            console.log(body);
            funcs(body)
        });

    });

    req.end();

};

post = function (url = "/", body, funcs = function () {
}) {

    options.path = url;
    console.log(url);
    options.method = "post";
    options.headers = {body: JSON.stringify(body)};

// Make a request to the server
    var req = http.request(options, function (response) {

        // Continuously update stream with data
        var body = '';

        response.on('data', function (data) {
            body += data;
        });

        response.on('end', function (e) {
            funcs(body)
        });

    });

    req.end();

};

get("/");
get("/user/list");

post("/user/insert", {
    "firstName": "yoni",
    "middleName": null,
    "lastName": "david",
    "mobile": null,
    "email": null,
    "passwordHash": "asaas",
    "admin": 1,
    "vendor": 1,
    "registeredAt": "2020-09-02T20:20:21",
    "lastLogin": "2020-09-01T20:20:32",
    "intro": "",
    "profile": ""
}, function (body) {
    get(`/user/delete/${JSON.parse(body).insertId}`);
});

post("/user/insert", {
    "firstName": "shimi",
    "middleName": null,
    "lastName": "look",
    "mobile": null,
    "email": null,
    "passwordHash": "asaas",
    "admin": 1,
    "vendor": 1,
    "registeredAt": "2020-09-02T20:20:21",
    "lastLogin": "2020-09-01T20:20:32",
    "intro": "",
    "profile": ""
}, function (data) {
    post("/user/update", {
        set: {"firstName": "momo"},
        where: {"firstName": "shimi", "lastName": "look"}
    }, function (data) {
        post("/user/delete", {"firstName": "momo"});
    });
});



