export class WebsocketApi {
    private _url: string;
    constructor() {
        this._url = import.meta.env.VITE_WS_URL;
    }

    connectChat(userId: string, chatId: string, token: string) {
        return new WebSocket(`${this._url}chats/${userId}/${chatId}/${token}`);
    }
}
