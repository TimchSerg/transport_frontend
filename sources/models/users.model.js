import {tokenStorage} from "../storage/token";

export const usersModel = {
    getData(){
        const token = tokenStorage.get();

        return webix.ajax().headers({
            "Authorization":"Bearer " + token
        }).get("/server/users");
    },
    saveData(id, operation, data){
        if(tokenStorage.get()){
            const token = tokenStorage.get();
            const ajax = webix.ajax().headers({
                "Authorization":"Bearer " + token
            })

            if(operation === "update"){
                return ajax.post("/server/users", data);
            }

            if(operation === "add"){
                return ajax.post("/server/users", data);
            }

            if(operation === "delete"){
                return ajax.delete("/server/users", id);
            }

        }
    }
};