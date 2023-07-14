import { AuthApi, ISignInData, ISignUpData } from '../api/auth.api';

export class AuthController {
    private _authApi: AuthApi;

    constructor() {
        this._authApi = new AuthApi();
    }

    signIn(data: ISignInData) {
        return this._authApi.signIn(data)
            .then(res => {
                console.log(res);
                return res;
            }).catch(err => console.error(err));
    }

    signUp(data: ISignUpData) {
        return this._authApi.signUp(data)
            .then(res => {
                console.log(res);
                return res;
            })
            .catch(err => console.error(err));
    }
}
