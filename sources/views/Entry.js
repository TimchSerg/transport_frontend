import EntryController from "../controllers/Entry.Controller";
import {JetView} from "webix-jet";

export default class EntryView extends EntryController{
    config(){

        const registration_form = {
            view:"form", id:"registration_form", hidden:true,
            width:400, borderless:false, margin:10,
            elements:[
                { type:"header", template: 'VD.Транспорт' },
                { view:"text", name:"phone", label:"Контактный номер телефона:", labelPosition:"top" },
                { view:"text", name:"fio", label:"ФИО:", labelPosition:"top" },
                { view:"text", name:"inn", label:"ИНН организации:", labelPosition:"top", pattern: { mask:"####-######-##", allow:/[0-9]/g } },
                { view:"text", name:"organization", label:"Название организации:", labelPosition:"top"},
                { view:"text", name:"kpp", label:"КПП:", labelPosition:"top", hidden:true },
                {height: 10},
                { view:"button", value:"Оставить заявку", click:() => this.registration(), hotkey:"enter" },
                { view:"button", value:"Аторизоваться", click:() => this.auth_form() },
            ],
            rules:{
                phone:webix.rules.isNotEmpty,
                fio:webix.rules.isNotEmpty,
                inn:webix.rules.isNotEmpty,
                organization:webix.rules.isNotEmpty
            }
        };

        const login_form = {
            view:"form", id:"login_form",
            width:400, borderless:false, margin:10,
            elements:[
                { type:"header", template: 'VD.Транспорт' },
                { view:"text", name:"login", label:"Телефон:", labelPosition:"top" },
                { view:"text", type:"password", name:"pass", label:"Пароль:", labelPosition:"top" },
                {height: 10},
                { view:"button", value:"Авторизоваться", click:() => this.do_login(), hotkey:"enter" },
                { view:"button", value:"Регистрация", click:() => this.reg_form() },
            ],
            rules:{
                login:webix.rules.isNotEmpty,
                pass:webix.rules.isNotEmpty
            }
        };

        return {
            cols:[{}, { rows:[{}, login_form, registration_form, {}]}, {}]
        };
    }

    init(view){
        this.checkSession()

        view.$view.querySelector("input").focus();
    }
}