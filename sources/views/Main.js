import AuthController from "../controllers/Auth.Controller";
import {data} from "models/records";
import {tokenStorage} from "../storage/token";

export default class MainView extends AuthController{
	config(){
		let datatable = { view:"datatable", id:"datatable", autoConfig:true, css:"webix_shadow_medium" };
		let ui = {
			rows:[
				datatable,
				{ view:"button", value:"Выйти", click:() => this.logout() },
				{}
			]
		}
		return ui;
	}
	init(view){
		$$('datatable').parse(data);
	}
}