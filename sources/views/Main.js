import EntryController from "../controllers/Entry.Controller";
import {data} from "models/records";
import {tokenStorage} from "../storage/token";
import SessionController from "../controllers/Session.Controller";

export default class MainView extends SessionController{
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