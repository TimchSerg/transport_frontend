import {JetView} from "webix-jet";
import {Session} from "../models/session";

export default class LoginView extends JetView{
    config(){

        const registration_form = {
            view:"form", id:"registration_form", hidden:true,
            width:400, borderless:false, margin:10,
            rows:[
                { type:"header", template: 'VD.Транспорт' },
                { view:"text", name:"phone", label:"Номер телефона:", labelPosition:"top" },
                { view:"text", name:"fio", label:"ФИО:", labelPosition:"top" },
                { view:"text", name:"inn", label:"ИНН:", labelPosition:"top" },
                { view:"text", name:"kpp", label:"КПП:", labelPosition:"top" },
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
        // Session.status().then(
        //     res=>this.app.show('/data'),
        //     rej=>this.app.show('/Auth')
        // );
        view.$view.querySelector("input").focus();
    }
    auth_login(){
        $$('registration_form').hide();
        $$('login_form').show();
    }
    reg_login(){
        $$('login_form').hide();
        $$('registration_form').show();
    }
    registration(){

    }
    do_login(){
        const form = $$("login_form");

        if (form.validate()){
            const data = form.getValues();
            Session.login(data.login, data.pass).then(
                res=>{
                    this.show('/data');
                },
                rej=>{
                    webix.html.removeCss(form.$view, "invalid_login");
                    form.elements.pass.focus();
                    webix.delay(function(){
                        webix.html.addCss(form.$view, "invalid_login");
                    });
                }
            )
        }
    }
}