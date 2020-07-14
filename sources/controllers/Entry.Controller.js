import SessionController from "./Session.Controller";

export default class EntryController extends SessionController{
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
            this.registration(data)
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