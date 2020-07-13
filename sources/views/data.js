import {JetView} from "webix-jet";
import {data} from "models/records";
import {tokenStorage} from "../storage/token";

export default class DataView extends JetView{
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
	logout(){
		tokenStorage.remove();
		this.app.show('/Auth')
	}
	init(view){
		$$('datatable').parse(data);
	}
}