import {tokenStorage} from "../storage/token";

export const SessionController = {
    status(){
        const token = tokenStorage.get() ? tokenStorage.get().token : '';
        return new webix.ajax().post(`/server/status`, {token}).then(resolve => {
            const res = resolve.json();
            if(res.access){
                return true;
            }
            throw new Error("Disconnect")
        });
    },
    login(user, password){
        const user_data = {
            user: user,
            password: password
        };
        const client_data = {
            grant_type: 'password',
            client_id: 5,
            client_secret: 'SDas65sdSS54',
        };
        const data = Object.assign(user_data, client_data);

        return webix.ajax().post(`/server/authorization`, data).then(a =>{
            const json = a.json();
            const code_data = Object.assign(json, client_data);
                webix.ajax().post(`/server/getToken`, code_data).then(resolve => {
                    const token = resolve.json();
                    tokenStorage.put(token)
                    return true;
                })
        } );
    },
    logout(){
        tokenStorage.remove();
        return new Promise((resolve, rej)=>{
           resolve(true)
        });
    }
}
