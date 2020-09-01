class Login {


    static STATUS = {c: "CONNECT", d: "DISCONNECT", g: "GUEST"};

    userOpts = {status: Login.STATUS.g, start: null, end: null, machine: null};
    users = new Map();
    expireAfter = 3600000;


    constructor() {
        this.expire();
    }

    auto(machine, name, pass) {
        try {

            this.users.forEach((user, key) => {
                if (user.id === machine.name) {
                    this.users.delete(user.id)
                }
            });

            //get from DB
            var user = {name, pass};
            const opt = new this.userOpts;
            opt.status = Login.STATUS.c;
            opt.start = new Date();
            opt.machine = machine;
            this.users.set(user.id, opt);

        } catch (e) {
            console.error(name + " " + pass + " Fail to connect")
        }
    }

    guest(machine) {
        var found;

        for (let id in this.users) {
            var user = this.users[id];
            if (!user.machine &&
                user.machine.name === machine.name) {
                found = true;
            }
        }

        if (!found) {
            const opt = new this.userOpts;
            opt.start = new Date();
            this.users.set(user.id,opt)
        }
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

        }, 10000 , this);
    }

    getUser(id) {
        return this.users.get(id);
    }

}

module.exports = {
    Login
};