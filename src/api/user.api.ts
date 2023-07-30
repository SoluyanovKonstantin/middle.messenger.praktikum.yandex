import {HTTPTransport} from '../../utils/http';

export interface IAddUserToChatData {
    users: Array<number>,
    chatId: number
}

export interface IUserData {
    id: string,
    login: string,
    first_name: string,
    second_name: string,
    display_name: string,
    email: string,
    phone: string,
    avatar: string
}

export type UpdateUserData = Omit<IUserData, 'id' | 'avatar'>

export type ChangePasswordData = {
    oldPassword: string,
    newPassword: string
}

export class UserApi {
    private _url: string;
    private _http: HTTPTransport;
    constructor() {
        this._url = import.meta.env.VITE_API_URL + 'user/';
        this._http = new HTTPTransport();
    }

    searchUser(login: string) {
        return this._http.post(this._url + 'search', { data: { login } });
    }

    changeUserData(data: UpdateUserData) {
        return this._http.put(this._url + 'profile', { data });
    }

    changeUserPassword(data: ChangePasswordData) {
        return this._http.put(this._url + 'password', { data });
    }

}
