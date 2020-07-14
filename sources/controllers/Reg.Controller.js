export default class RegController{
    sendStatement(data){
        console.log(data)
        return true;

        // return webix.ajax().post(`/server/statement`, data).then(
        //     resolve => {
        //         return resolve.json();
        //     },
        //     reject => webix.message({ type:"error", text:"Сервер временно не доступен! <br> Приносим свои извинения!" })
        // );
    }
}