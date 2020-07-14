import SessionController from "./Session.Controller";
import RegController from "./Reg.Controller";

export default class EntryController extends SessionController{
    constructor(app, name){
        super(app, name);
        this.RegController = new RegController();
    }
    auth_form(){
        $$('registration_form').hide();
        $$('login_form').show();
    }
    reg_form(){
        $$('login_form').hide();
        $$('registration_form').show();
    }
    registration(){
        if($$('registration_form').validate()){
            const data = $$('registration_form').getValues();
            this.RegController.sendStatement(data);
        }
    }
    do_login(){
        const form = $$("login_form");

        if (form.validate()){
            const data = form.getValues();
            this.login(data).catch(()=>{
                webix.html.removeCss(form.$view, "invalid_login");
                form.elements.pass.focus();
                webix.delay(function(){
                    webix.html.addCss(form.$view, "invalid_login");
                });
            })
        }
    }
}