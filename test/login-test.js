Login = require("../main/login/login").Login
login = new Login();

login.guest({name: "machina"},function (e) {
    console.log(e)

    login.auto({name: "machina"} ,"momo" , "asaas",function (e) {
        console.log(e)
    });
});

login.guest({name: "COMP"},function (e) {
    console.log(e)

    login.auto({name: "MOMO"} ,"sason" , "sss",function (e) {
        console.log(e)
    });
});

