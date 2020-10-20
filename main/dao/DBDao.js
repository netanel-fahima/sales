mysql = require('mysql');
asyncs = require('async');

class DBDao {

    table;
    escape;


    name() {
        return this.table;
    }

    connection;

    constructor(name) {
        this.table = name;
        this.escape = this.getPool()
    }

    getPool() {
        return mysql.createConnection({
            host: "localhost",//'remotemysql.com',
            user: 'root',
            password: 'natishu12',
            database: 'store',
            dateStrings: true
        });
    }


    exec(query, callback) {
        console.log(query);
        const con = this.getPool();
        return con.query(query, (error, results, fields) => {
            if (error) {
                /*throw new Error(error) ;*/
                callback(error);
                console.error(error)
            }
            callback(results);
            console.error(results)
            con.end();
        });
    }

    async es() {
        var con = this.getPool();
        return con.query;
    }

    execSync(query) {
        let res;
        asyncs.asyncify(this.es(query, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            res = results;
            console.log(res)

        }));

        console.log(res);
        return res;
    }

    list(call, where) {

        if (Array.isArray(where) && where.length > 0) {
            where = where.map(function (value) {
                if (value.constructor === Object && Object.keys(value).length > 2) {
                    return `${mysql.escapeId(value.key)} ${value.op} ${value.isNull ? null : mysql.escape(value.value)}`;
                }
                return mysql.escape(value);
            }).join(' and ');
        } else if (where != null && where.constructor === Object && Object.keys(where).length > 0) {
            where = mysql.escape(where).replace(",","and");
        } else {
            where = null;
        }


        return this.exec(`SELECT * FROM ${"`" + this.name()+ "`"} ${(!!where ? (` WHERE ` + where) : ``)}`, call);
    }


    delete(where, call) {
        return this.exec(`DELETE FROM ${"`"+ this.name()+"`"} WHERE ${this.extracted(where)} `, call);
    }

    insert(set, call) {
        let q = `INSERT INTO ${"`"+ this.name()+"`"} set  ${this.escape.escape(set)}`;
        return this.exec(q, call);
    }

    update(set, where, call) {
        return this.exec(`UPDATE ${"`"+ this.name()+"`"} SET ${this.escape.escape(set)} WHERE ${this.extracted(where)}`, call);
    }

    read(where, call) {
        return this.exec(`SELECT * FROM ${"`"+ this.name()+"`"} WHERE ${this.extracted(where)}`, call);
    }

    execute(exec, call) {
        this.exec(exec, call);
    }


    extractedInsert(body) {
        let values = "";
        let names = "";

        for (let i in body) {
            let id = body[i]
            if (typeof id == "object") {
                Object.keys(id).forEach(function (k, i) {
                    if (i > 0) {
                        names = names + " , ";
                        values = values + " , ";
                    }
                    names = names + k;
                    values = values + (id[k] == null ? null : (typeof id[k] == "string" ? "'" + id[k] + "'" : id[k]));

                });
            }
        }

        return " (" + names + ") values (" + values + ")";
    }

    extracted(id) {
        if (!id)
            return "";

        let where = "";
        if (typeof id == "object") {
            Object.keys(id).forEach(function (k, i) {
                if (i > 0)
                    where += " and ";
                where += k + "=" + (typeof id[k] == "string" ? "'" + id[k] + "'" : id[k]);
            });
        }
        return where;
    }

    extractedUpdate(id) {
        let set = "";
        if (typeof id == "object") {
            Object.keys(id).forEach(function (k, i) {
                if (i > 0)
                    set += " , ";
                set += k + "=" + (typeof id[k] == "string" ? "'" + id[k] + "'" : id[k]);
            });
        }
        return set;
    }
}

module.exports.DBDao = DBDao;

