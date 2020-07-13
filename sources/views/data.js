import {JetView} from "webix-jet";
import {data} from "models/records";

export default class DataView extends JetView{
	config(){

		return { view:"datatable", id:"datatable", autoConfig:true, css:"webix_shadow_medium" };
	}
	init(view){
		$$('datatable').parse(data);
	}
}