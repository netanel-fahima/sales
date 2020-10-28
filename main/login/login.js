let UserFacade = require("../facade/UserFacade");
let async = require("async");
let mysql = require('mysql');

class Login {

    static STATUS = {c: "CONNECT", d: "DISCONNECT", g: "GUEST"};

    userOpts = {status: Login.STATUS.g, start: null, end: null, machine: null};
    users = new Map();
    expireAfter = 3600000;
    userFacade = new UserFacade();

    async getUsers() {
        let self = this;
        let promise = await new Promise((res, rej) => {
            this.userFacade.list(null, function (users) {
                res(users)
            })
        });
        return await promise;
    }

    constructor() {
        //this.expire();
    }

    auto(machine, name, pass, call) {
        let self = this;
        this.getUsers().then(users => {
            try {

                let date = mysql.format("?", [new Date()], true, "UTC")
                    .replace("'", "").replace("'", "");

                this.userFacade.read({email: name/*, passwordHash: pass*/}, function (autoUser) {
                    if (autoUser.length === 0) {
                        call("FAILED");
                    } else {
                        //get from DB
                        self.userFacade.update(
                            {
                                "lastLogin": date,
                                "intro": machine.name,
                                "profile": "USER"
                            }, {
                                "id": autoUser[0].id
                            }
                            , function (e) {
                                users.forEach((user, key) => {
                                    if (user.intro === machine.name && user.profile === "GEST") {
                                        self.userFacade.delete({id: user.id}, function (d) {
                                            console.log(autoUser[0].firstName)
                                        })
                                    }
                                });
                                call(autoUser[0]);
                            })
                    }

                });

            } catch (e) {
                call("FAILED");
                console.error(name + " " + pass + " Fail to connect")
            }
        });
    }

    guest(machine, call) {
        let self = this;
        let date = mysql.format("?", [new Date()], true, "UTC")
            .replace("'", "").replace("'", "");
        this.getUsers().then(users => {

            for (let usersKey in users) {
                let user = users[usersKey]
                if (user.intro === machine.name && user.profile === "GEST") {
                    self.userFacade.update(
                        {
                            "lastLogin": date,
                            "intro": machine.name,
                        }, {"id": user.id,}
                        , function (res) {
                            call(user);
                        });
                    return true;
                }
            }


            self.userFacade.insert({
                "firstName": "GEST-" + new Date().getTime(),
                "middleName": null,
                "lastName": "GEST",
                "mobile": null,
                "email": null,
                "passwordHash": "1234",
                "admin": 0,
                "vendor": 0,
                "registeredAt": date,
                "lastLogin": date,
                "intro": machine.name,
                "profile": "GEST"
            }, call)

        });
    }


    disconnect(id) {
        let user = this.getUser(id);
        user.status = Login.STATUS.d;
        user.end = new Date();
    }

    expire() {
        setInterval(function (self) {
            self.users.forEach((user, key) => {
                var delta = new Date() - user.start.getTime();
                if (delta > self.expireAfter)
                    self.users.delete(id)
            });

        }, 10000, this);
    }

    getUser(id) {
        return this.users.get(id);
    }

    register(machine, user, call) {
        let self = this;
        let date = mysql.format("?", [new Date()], true, "UTC")
            .replace("'", "").replace("'", "");

        this.getUsers().then(users => {
            try {

                let date = mysql.format("?", [new Date()], true, "UTC")
                    .replace("'", "").replace("'", "");

                this.userFacade.read({email: user.email}, function (autoUser) {
                    if (!!autoUser.errno){
                        call("FAILED");
                        return;
                    }


                    if (autoUser.length === 0) {

                        self.userFacade.insert(
                            {
                                firstName: user.name,
                                email: user.email,
                                passwordHash: "1234",
                                "lastLogin": date,
                                "intro": machine.name,
                                "profile": "USER",
                                "registeredAt": date
                            }
                            , function (e) {
                                users.forEach((u, key) => {
                                    if (u.intro === machine.name && u.profile === "GEST") {
                                        self.userFacade.delete({id: u.id}, function (d) {
                                            console.log(autoUser[0].firstName)
                                        })
                                    }
                                });
                                call(user);
                            })

                    } else {
                        //get from DB
                        self.userFacade.update(
                            {
                                "lastLogin": date,
                                "intro": machine.name,
                                "profile": "USER",
                            }, {
                                "id": autoUser[0].id
                            }
                            , function (e) {
                                users.forEach((user, key) => {
                                    if (user.intro === machine.name && user.profile === "GEST") {
                                        self.userFacade.delete({id: user.id}, function (d) {
                                            console.log(autoUser[0].firstName)
                                        })
                                    }
                                });

                                call(user);

                            })

                    }

                });

            } catch (e) {
                call("FAILED");
                console.error(name + " " + pass + " Fail to connect")
            }
        });
    }

}

module.exports = {
    Login
};