import {HTTPTransport} from '../../utils/http';

export interface IAddUserToChatData {
    users: Array<number>,
    chatId: number
}

export class ChatApi {
    private _url: string;
    private _http: HTTPTransport;
    constructor() {
        this._url = import.meta.env.VITE_API_URL + 'chats/';
        this._http = new HTTPTransport();
    }

    createChat(title: string) {
        return this._http.post(this._url, { data: { title } });
    }

    getChats() {
        return this._http.get(this._url);
    }

    addUserToChat(data: IAddUserToChatData) {
        return this._http.put(this._url + 'users', { data });
    }

    getToken(chatId: string) {
        return this._http.post(this._url + 'token/' + chatId);
    }

    getUsers(chatId: string) {
        return this._http.get(this._url + chatId + '/users');
    }

    deleteChatUser(chatId:string, userId: string) {
        return this._http.delete(this._url + 'users', {data: { users: [userId], chatId }});
    }

}
