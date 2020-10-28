server = require("./server");


const facade = require("../facade/UserFacade"),
    factory = require("../facade/Factory").factory;

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

server.getApp().post('/product/details', urlencodedParser, function (req, res) {
    factory("product").fullList(req.body, function (e) {
        send(res, e);
    });
});


server.getApp().post('/product/insert', urlencodedParser, function (req, res) {

    re = {};
    Object.entries(req.body).forEach(function (e) {
        if (e[0] !== "category")
            re[e[0]] = e[1];
    });

    factory("product").insert(re, function (e) {
        if (req.body.category) {
            if (Array.isArray(req.body.category)) {
                req.body.category.forEach((id) => {
                    factory("product_category").insert({productId: e.insertId, categoryId: id}, function (e1) {
                        console.log(e1)
                    });
                });
            } else {
                factory("product_category").insert({
                    productId: e.insertId,
                    categoryId: req.body.category
                }, function (e1) {
                    console.log(e1)
                });
            }
        }
        send(res, e);
    });
});


server.getApp().post('/product_category/update', urlencodedParser, function (req, res) {
    let data = req.body;
    factory("product").updateProductsCategory({categoryId: data.categoryId}, {productId: data.productId}, function (e) {
        send(res, e);
    });
});


server.getApp().post('/product_category/list', urlencodedParser, function (req, res) {
    factory("product").productsCategory(null, function (e) {
        send(res, e);
    });
});

/*server.getApp().post('/category/list', urlencodedParser, function (req, res) {
    factory("product").categories(req.body, function (e) {
        send(res, e);
    });
});*/

server.getApp().post('/category/:id/products', urlencodedParser, function (req, res) {
    factory("product").productsByCategory(req.params.id, function (e) {
        send(res, e);
    });
});

server.getApp().post('/category/insert', urlencodedParser, function (req, res) {
    factory("product").addCategory(req.body, function (e) {
        send(res, e);
    });
});

server.getApp().post('/product_category/insert', urlencodedParser, function (req, res) {
    factory("product").addToCategory(JSON.parse(req.headers.body), function (e) {
        send(res, e);
    });
});

server.getApp().post('/product_meta/insert', urlencodedParser, function (req, res) {
    factory("product").addMeta(JSON.parse(req.headers.body), function (e) {
        send(res, e);
    });
});


server.getApp().post('/product_review/insert', urlencodedParser, function (req, res) {
    factory("product").addReview(JSON.parse(req.headers.body), function (e) {
        send(res, e);
    });
});

server.getApp().post('/transaction/insert', urlencodedParser, function (req, res) {
    factory("product").addTransaction(JSON.parse(req.headers.body), function (e) {
        send(res, e);
    });
});


server.getApp().get('/:name/list', function (req, res) {
    factory(req.params.name).list(null, function (e) {
        send(res, e);
    });
});

server.getApp().get('/:name/:id', function (req, res) {
    factory(req.params.name).read({"id": req.params.id}, function (e) {
        send(res, e);
    });
});

server.getApp().post('/:name/list', urlencodedParser, function (req, res) {
    factory(req.params.name).list(req.body, function (e) {
        send(res, e);
    });
});

server.getApp().post('/:name/insert', urlencodedParser, function (req, res) {
    factory(req.params.name).insert(req.body, function (e) {
        send(res, e);
    });
});


server.getApp().post('/:name/update', urlencodedParser, function (req, res) {
    let data = req.body;
    factory(req.params.name).update(data, {id: data.id}, function (e) {
        send(res, e);
    });
});

server.getApp().get('/:name/delete/:id', function (req, res) {
    console.log(`${req.params.name}/delete/${req.params.id}`)
    factory(req.params.name).delete({"id": req.params.id}, function (e) {
        send(res, e);
    });
});

server.getApp().post('/:name/delete', urlencodedParser, function (req, res) {
    let data = JSON.parse(req.headers.body);
    factory(req.params.name).delete(data, function (e) {
        send(res, e);
    });
});

Login = require("../login/login").Login;
login = new Login();

server.getApp().post('/login', urlencodedParser, function (req, res) {
    login.auto(req.body.machine , req.body.name , req.body.password, function (e) {
        send(res, e);
    });
});

server.getApp().post('/register', urlencodedParser, function (req, res) {
    login.register(req.body.machine , req.body.user , function (e) {
        send(res, e);
    });
});


function send(res, e) {
    try {
        res.json(e);
    } catch (e) {
        console.error(e)
    }
}

server.getApp().use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});

let  s= server.getApp().listen(process.env.PORT,  function (req, res) {
    const host = s.address().address;
    const port = s.address().port;
    console.log(`Example app listening at http://${host}:${port}`)
});