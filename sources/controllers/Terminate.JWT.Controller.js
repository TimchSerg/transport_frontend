export default class TerminateJWTController{
    authorization(login, password){
        return new Promise((resolve, reject)=>{
            if(login === "admin" && password === "admin"){
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

                resolve(token);
            }

            reject("Error")
        })
    }

    check(response){
        if(typeof response === 'string' && response.length != 0){
            return true;
        }

        return false;
    }
}