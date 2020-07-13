export const tokenStorage = {
    get(){
        let data = webix.storage.local.get("accessToken");
        return data;
    },
    put(data){
        console.log(data)
        webix.storage.local.put("accessToken", data);
    },
    remove(){
        webix.storage.local.remove("accessToken");
    }
}