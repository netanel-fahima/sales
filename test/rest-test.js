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


get = async function (url = "/", body, funcs = function () {
}) {

    options.path = url;
    console.log(url);
    options.method = "get";


    let promise = await new Promise((res, rej) => {

        var req = http.request(options, async function (response) {
            // Continuously update stream with data
            let body = '';

            response.on('data', function (data) {
                body += data;
            });

            response.on('end', function (e) {
                res(JSON.parse(body))
            });

            response.on("error",function (er) {
                throw  er
            })

        });

        req.end();
    });

// Make a request to the server

    return await promise;
};


post = async function (url = "/", body, funcs = function () {
}) {

    options.path = url;
    console.log(url);
    options.method = "post";
    options.headers = {body: JSON.stringify(body)};


    let promise = await new Promise((res, rej) => {

        var req = http.request(options, async function (response) {
            // Continuously update stream with data
            let body = '';

            response.on('data', function (data) {
                body += data;
            });

            response.on('end', function (e) {
                res(JSON.parse(body))
            });

        });

        req.end();
    });
// Make a request to the server
    return await promise;
};

get(`/product/list`);


get(`/user/list`);

/*post("/product_meta/insert", {
    productId: 1,
    "`key`": "img",
    content: "pp.png"
});*/


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
}).then(value => {
    post("/user/update", {
        set: {"firstName": "momo", "lastName": "koko"},
        where: {"firstName": "shimi", "lastName": "look"}
    }).then(update => {
        get(`/user/read/${value.insertId}`).then(user => {

            post("/category/insert", {
                title: "Mitpachat",
                metaTitle: "Mitpachat",
                slug: "KOKO",
                content: "sss"
            }).then(category => {

                post("/category/insert", {
                    parentId: category.insertId,
                    title: "Mitpachat sss",
                    metaTitle: "Mitpachat sss",
                    slug: "MOMO",
                    content: "asas"
                }).then(subc => {

                    post("/product/insert", {
                        userId: user[0].id,
                        title: "RIO",
                        metaTitle: "SOSO",
                        slug: "null",
                        type: 1,
                        sku: "sss",
                        price: 50.0,
                        discount: 2.0,
                        quantity: 20,
                        shop: 1,
                        createdAt:"2020-09-02T20:20:21"
                    }).then(pro1 => {
                        post("/product_category/insert", {
                            productId: pro1.insertId,
                            categoryId: subc.insertId,
                        }).then()
                    })

                });

            })


        });
    });
}).catch(reason => {
    console.log(reason)
});
