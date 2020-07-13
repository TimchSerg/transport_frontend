import {JetView} from "webix-jet";
import TerminateJWTController from "./Terminate.JWT.Controller";
import {tokenStorage} from "../storage/token";

export default class AuthController extends JetView{
    constructor(app, name){
        super(app, name);
        this.JWTController = new TerminateJWTController();
    }
    checkSession(){
        if(tokenStorage.get()){
            const token = tokenStorage.get().token;
            this.app.show('/Main');
            return;
        }

        this.logout();
    }
    auth_login(){
        $$('registration_form').hide();
        $$('login_form').show();
    }
    reg_login(){
        $$('login_form').hide();
        $$('registration_form').show();
    }
    registration(data){
        console.log(data, 'registration')
    }
    do_login(){
        const form = $$("login_form");

        if (form.validate()){
            const data = form.getValues();
            this.JWTController.authorization(data.login, data.pass).then(
                res=>{
                    tokenStorage.put(res)

                    this.checkSession();
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
    logout(){
        tokenStorage.remove();

        this.app.show('/Auth')
    }
}