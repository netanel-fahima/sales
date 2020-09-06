const ansyc = require("../utils/Ansyc");
const dao = require("../dao/DBDao").DBDao;
const {Facade} = require("./Facade");

class ProductFacade extends Facade {

    categoryDao = new dao("category");
    productDao = new dao("product");
    productCategoryDao = new dao("product_category");
    productReviewDao = new dao("product_review");
    productMetaDao = new dao("product_meta");

    getDao() {
        return this.productDao;
    }

    list(call, where,) {

        let counter = new ansyc(2, call );

        let self = this;
        super.list(where, function (products) {
            //add reviews
            products.forEach(function (product, i) {

                self.productReviewDao.list(function (reviews) {
                    product.reviews = reviews;
                    if (i === products.length - 1)
                        counter.event(products);
                }, {productId: product.id});
                //add meta
                self.productMetaDao.list(function (metas) {
                    product.metas = metas;
                    if (i === products.length - 1)
                        counter.event(products);
                }, {productId: product.id});

            });
            if (products.length === 0)
                counter.end(products);

        });
    }

    addMeta(where, call) {
        this.productMetaDao.insert(where, call);
    }

    addReview(where, call) {
        this.productReviewDao.insert(where, call);
    }


    //Category
    addCategory(where, call) {
        this.categoryDao.insert(where, call);
    }

    categories(where, call) {
        let self = this;
        this.categoryDao.list(function (categor) {
            self.categoryDao.list(function (sub) {
                categor.categories = sub;
                call(categor)
            }, {parentId: categor.id});
        }, where);
    }

    productsByCategory(id, call) {
        let self = this;
        this.productCategoryDao.list(function (pcs) {
            /*create products ids by category*/
            let ids = "";
            pcs.forEach(function (i, pc) {
                if (i > 0) ids += ",";
                ids += pc.productId
            });
            /*set all products by id - in callback */
            self.read({id: "in (" + ids + ")"}, function (products) {
                call(products);
            });

        }, {categoryId: id});
    }

}

module.exports = ProductFacade;