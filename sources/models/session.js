import {tokenStorage} from "../storage/token";

export const Session = {
    status(){
        console.log('status')
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
// function status(){
//     return new Promise((resolve, rej)=>{
//         resolve({log:true})
//     });
// }
//
// function login(user, pass){
//     return webix.ajax().post(`${base_url}/threeraza/admin/login`, {
//         user, pass
//     }).then(a =>{
//         return a.json();
//     } );
// }
//
// function logout(){
//     return webix.ajax().post(`${base_url}/threeraza/admin/logout`)
//         .then(a =>{
//             return a.json();
//         } );
// }