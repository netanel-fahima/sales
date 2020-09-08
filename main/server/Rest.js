server = require("./server");

const facade = require("../facade/UserFacade"),
    factory = require("../facade/Factory").factory

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

server.getApp().get('/category/list', urlencodedParser, function (req, res) {
    factory("product").categories(null, function (e) {
        res.json(e);
    });
});

server.getApp().get('/category/:id/products', urlencodedParser, function (req, res) {
    factory("product").productsByCategory(req.params.id, function (e) {
        res.json(e);
    });
});

server.getApp().post('/category/insert', urlencodedParser, function (req, res) {
    factory("product").addCategory(JSON.parse(req.headers.body), function (e) {
        res.json(e);
    });
});

server.getApp().post('/product_category/insert', urlencodedParser, function (req, res) {
    factory("product").addToCategory(JSON.parse(req.headers.body), function (e) {
        res.json(e);
    });
});

server.getApp().post('/product_meta/insert', urlencodedParser, function (req, res) {
    factory("product").addMeta(JSON.parse(req.headers.body), function (e) {
        res.json(e);
    });
});


server.getApp().post('/product_review/insert', urlencodedParser, function (req, res) {
    factory("product").addReview(JSON.parse(req.headers.body), function (e) {
        res.json(e);
    });
});

server.getApp().post('/transaction/insert', urlencodedParser, function (req, res) {
    factory("product").addTransaction(JSON.parse(req.headers.body), function (e) {
        res.json(e);
    });
});


server.getApp().get('/:name/list', function (req, res) {
    factory(req.params.name).list(null, function (e) {
        res.json(e);
    });
});

server.getApp().get('/:name/read/:id', function (req, res) {
    factory(req.params.name).read({"id": req.params.id}, function (e) {
        res.json(e);
    });
});

server.getApp().post('/:name/insert', urlencodedParser, function (req, res) {
    factory(req.params.name).insert(JSON.parse(req.headers.body), function (e) {
        res.json(e);
    });
});

server.getApp().post('/:name/update', urlencodedParser, function (req, res) {
    let data = JSON.parse(req.headers.body)
    factory(req.params.name).update(data.set, data.where, function (e) {
        res.json(e);
    });
});

server.getApp().get('/:name/delete/:id', function (req, res) {
    console.log(`${req.params.name}/delete/${req.params.id}`)
    factory(req.params.name).delete({"id": req.params.id}, function (e) {
        res.json(e);
    });
});


server.getApp().post('/:name/delete', urlencodedParser, function (req, res) {
    let data = JSON.parse(req.headers.body)
    factory(req.params.name).delete(data, function (e) {
        res.json(e);
    });
});