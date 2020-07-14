import {data} from "models/records";
import {usersModel} from "models/users.model";
import SessionController from "../controllers/Session.Controller";

export default class MainView extends SessionController{
	config(){
		let datatable = { view:"datatable", id:"datatable", autoConfig:true, css:"webix_shadow_medium" };
		let ui = {
			rows:[
				{ view:"button", value:"Загрузить данные по пользователям", click:() => this.getData('users') },
				datatable,
				{ view:"button", value:"Выйти", click:() => this.logout() },
				{}
			]
		}
		return ui;
	}
	getData(param){
		if(param === 'users'){
			usersModel.getData().then(
				res=>{
					$$('datatable').parse(res);
				},
				rej=>{
					webix.message({ type:"error", text:"Пользователь не авторизаван!" })
					this.logout()
				}
			)
		}
	}
	init(view){
		$$('datatable').parse(data);
	}
}