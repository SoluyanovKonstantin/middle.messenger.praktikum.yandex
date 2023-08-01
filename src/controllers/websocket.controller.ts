import { WebsocketApi } from '../api/websocket.api';

export class WebsocketController {
    private _websocketApi: WebsocketApi;

    constructor() {
        this._websocketApi = new WebsocketApi();
    }

    connectChat(userId: string, chatId: string, token: string) {
        return this._websocketApi.connectChat(userId, chatId, token);
    }

}
