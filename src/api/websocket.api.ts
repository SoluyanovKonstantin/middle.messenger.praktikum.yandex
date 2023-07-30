import { HTTPTransport } from '../../utils/http';

export class WebsocketApi {
    private _url: string;
    private _http: HTTPTransport;
    constructor() {
        this._url = import.meta.env.VITE_WS_URL;
        this._http = new HTTPTransport();
    }

    connectChat(userId: string, chatId: string, token: string) {
        return new WebSocket(`${this._url}chats/${userId}/${chatId}/${token}`);
    }
}
