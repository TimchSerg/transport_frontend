import AuthController from "../controllers/Auth.Controller";

export default class LoginView extends AuthController{
    config(){

        const registration_form = {
            view:"form", id:"registration_form", hidden:true,
            width:400, borderless:false, margin:10,
            rows:[
                { type:"header", template: 'VD.Транспорт' },
                { view:"text", name:"inn", label:"ИНН:", labelPosition:"top" },
                { view:"text", name:"organization", label:"Название организации:", labelPosition:"top"},
                { view:"fieldset", label:"Контактные данные", body:{
                        rows:[
                            { view:"text", name:"phone", label:"Номер телефона:", labelPosition:"top" },
                            { view:"text", name:"fio", label:"ФИО:", labelPosition:"top" },
                        ]
                    }},
                { view:"text", name:"kpp", label:"КПП:", labelPosition:"top", hidden:true },
                {height: 10},
                { view:"button", value:"Оставить заявку", click:() => this.registration(), hotkey:"enter" },
                { view:"button", value:"Аторизоваться", click:() => this.auth_login() },
            ],
            rules:{
                login:webix.rules.isNotEmpty,
                pass:webix.rules.isNotEmpty
            }
        };

        const login_form = {
            view:"form", id:"login_form",
            width:400, borderless:false, margin:10,
            rows:[
                { type:"header", template: 'VD.Транспорт' },
                { view:"text", name:"login", label:"Логин", labelPosition:"top" },
                { view:"text", type:"password", name:"pass", label:"Пароль", labelPosition:"top" },
                {height: 10},
                { view:"button", value:"Авторизоваться", click:() => this.do_login(), hotkey:"enter" },
                { view:"button", value:"Регистрация", click:() => this.reg_login() },
            ],
            rules:{
                login:webix.rules.isNotEmpty,
                pass:webix.rules.isNotEmpty
            },
            animate:{ type:"flip", subtype:"vertical" },
        };

        return {
            cols:[{}, { rows:[{}, login_form, registration_form, {}]}, {}]
        };
    }

    init(view){
        this.checkSession();
        view.$view.querySelector("input").focus();
    }
}