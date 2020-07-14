import {tokenStorage} from "../storage/token";
import TerminateJWTController from "./Terminate.JWT.Controller";
import {JetView} from "webix-jet";

export default class SessionController extends JetView{
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
    login(data){
        return this.JWTController.authorization(data.login, data.pass).then(
            resolve => {
                tokenStorage.put(resolve)

                this.checkSession();
            }
        )
    }
    logout(){
        tokenStorage.remove();

        this.app.show('/Entry')
    }
}