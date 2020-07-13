export class JWTController{
    authorization(login, password){
        return webix.ajax().post(`/auth/authorization`, {
            login, password
        }).then(
            resolve => {
            const token = resolve.json();
                if(this.check(token)){

                    return token;
                }

                throw new Error("The user is not identified")
            }
        );
    }
    check(response){
        if(typeof response === 'string' && response.length != 0){
            return true;
        }

        return false;
    }
}