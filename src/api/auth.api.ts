import {HTTPTransport} from '../../utils/http';

export interface ISignInData {
    login: string,
    password: string
}

export interface ISignUpData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export class AuthApi {
    private _url: string;
    private _http: HTTPTransport;
    constructor() {
        this._url = import.meta.env.VITE_API_URL + 'auth/';
        this._http = new HTTPTransport();
    }

    signIn({ login, password }: ISignInData) {
        return this._http.post(this._url + 'signin', { data: { login, password } });
    }

    signUp(data: ISignUpData) {
        return this._http.post(this._url + 'signup', { data });
    }
}
