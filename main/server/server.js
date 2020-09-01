var s = require("../login/login.js")
var http = require("http");
http.createServer(function (request, response) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});
    new s.Login();
    // Send the response body as "Hello World"
    response.end("Hello world");

}).listen(8083);

// Console will print the message
console.log('Server running at http://127.0.0.1:8083');