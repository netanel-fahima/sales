const ansyc = require("../utils/Ansyc");
const {Facade} = require("./Facade");
let dao = require("../dao/DBDao").DBDao;

class CategoryFacade extends Facade {

    dao = new dao("category");
    resource = new dao("resource");

    constructor() {
        super();
    }

    getDao() {
        return this.dao;
    }

    list(where, call) {
        let _slf = this;
        let counter = new ansyc(1, call);
        this.dao.list(function (categories) {
            if (Array.isArray(categories))
                categories.forEach(function (c, i) {
                    _slf.resource.list(function (imgs) {
                        c.images = imgs;
                        if (i === categories.length - 1)
                            counter.event(categories)
                    }, {type: "category", type_id: c.id})

                });
            counter.event(categories)
        }, where);
    }
}

module.exports = CategoryFacade;

