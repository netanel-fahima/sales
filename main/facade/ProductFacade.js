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

    fullList(where, call) {

        let counter = new ansyc(2, call);

        let self = this;
        //add reviews
        this.getDao().list(function (products) {
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

    addToCategory(where, call) {
        this.productCategoryDao.insert(where, call);
    }

    categories(where, call) {
        let self = this;
        this.categoryDao.list(function (categories) {
            categories.forEach(function (cat, i) {
                self.categoryDao.list(function (sub) {
                    cat.categories = sub;
                    if (i === categories.length - 1)
                        call(categories)
                }, {parentId: cat.id});
            })

        }, where);
    }

    productsByCategory(id, call) {
        let self = this;
        this.productCategoryDao.list(function (pcs) {
            /*create products ids by category*/
            let ids = "";

            for (let i in pcs ){
                if (i > 0) ids += ",";
                ids += pcs[i].productId
            }
            /*set all products by id - in callback */
            self.productDao.exec(`SELECT * FROM product WHERE id in (${ids})`, function (products) {
                call(products);
            });

        }, {categoryId: id});
    }

}

module.exports = ProductFacade;