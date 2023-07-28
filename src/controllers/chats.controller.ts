import { ChatApi, IAddUserToChatData } from '../api/chat.api';

export class ChatController {
    private _chatApi: ChatApi;

    constructor() {
        this._chatApi = new ChatApi();
    }

    createChat(title: string) {
        return this._chatApi.createChat(title)
            .then(res => {
                console.log(res);
                return JSON.parse((res as XMLHttpRequest).response);
            }).catch(err => console.error(err));
    }

    getChats() {
        return this._chatApi.getChats()
            .then(res => {
                return JSON.parse((res as XMLHttpRequest).response) as unknown[];
            })
            .catch(err => {
                console.error(err);
                return [];
            });
    }

    addUserToChat(data: IAddUserToChatData) {
        return this._chatApi.addUserToChat(data)
            .catch(err => console.error(err));
    }

    getToken(chatId: string): Promise<{token: string}> {
        return this._chatApi.getToken(chatId)
            .then(res => JSON.parse(res.response));
    }
}
