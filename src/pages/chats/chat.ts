import html from './chat.html?inline';
import style from './chat.css?inline';
import { Block } from '../../../utils/block';
import { ChatController } from '../../controllers/chats.controller';
import { InputComponent } from '../../components/input/input';
import { ButtonComponent } from '../../components/button/button';
import { UserController } from '../../controllers/user.controller';
import { IUserData } from '../../api/user.api';
import { WebsocketController } from '../../controllers/websocket.controller';
import { AuthController } from '../../controllers/auth.controller';
import router from '../../../utils/router';

class ChatComponent extends Block {
    private _chatController: ChatController;
    private _userController: UserController;
    private _authController: AuthController;
    private _webSocketController: WebsocketController;
    private _usersToChat: IUserData[] = [];
    private _userId: number | undefined;
    private _chats: { id: number }[] = [];
    private _messages: unknown[] = [];
    private _chatSocket: WebSocket | undefined;
    private _messageIndex = 0;
    private _chatTitle = ' ';
    private _chatId: number | undefined = undefined;
    private _chatUsers: unknown[] = [];

    constructor(events: Record<string, (event?: Event) => void> = {}) {
        let isControlPressed = false;
        events.click = async (ev) => {
            if ((ev?.target as HTMLElement)?.closest('#click-at-sandwich')) {
                const shadowWrapper: HTMLElement | null = document.querySelector('#left-side-menu-wrapper');
                const popup = document.querySelector('.add-users-chat-popup');
                const leftSideMenu = document.querySelector('.left-side-menu');
                if (leftSideMenu) {
                    (leftSideMenu as HTMLElement).style.display = 'flex';
                }
                if (shadowWrapper) {
                    shadowWrapper.style.display = 'flex';
                }
                if (popup) {
                    (popup as HTMLElement).style.display = 'none';
                }
            }
            if ((ev?.target as HTMLElement)?.closest('#shadow')) {
                const shadowWrapper: HTMLElement | null = document.querySelector('#left-side-menu-wrapper');
                const popup = document.querySelector('.add-users-chat-popup');

                if (shadowWrapper) {
                    shadowWrapper.style.display = 'none';
                }
                const createChatElement: HTMLElement | null = document.querySelector('.create-chat-popup');
                if (createChatElement) {
                    createChatElement.style.display = 'none';
                }
                if (popup) {
                    (popup as HTMLElement).style.display = 'none';
                }
            }

            if ((ev?.target as HTMLElement)?.closest('#create-chat')) {
                const createChatElement: HTMLElement | null = document.querySelector('.create-chat-popup');
                if (createChatElement) {
                    createChatElement.style.display = 'flex';
                }
            }

            if ((ev?.target as HTMLElement)?.closest('#settings-link')) {
                router.go('/settings');
            }

            if ((ev?.target as HTMLElement)?.closest('.remove-user')) {
                const el = (ev?.target as HTMLElement)?.closest('.remove-user') as HTMLElement;
                const userId =  el.dataset['id'];
                if (this._chatId && userId) {
                    this._chatController.deleteChatUsers(String(this._chatId), userId)
                        .then(res => {
                            el.parentElement?.remove();
                        });
                }
            }

            if ((ev?.target as HTMLElement)?.closest('#chat-settings')) {
                const popup = document.querySelector('.add-users-chat-popup');
                const shadowWrapper: HTMLElement | null = document.querySelector('#left-side-menu-wrapper');
                const leftSideMenu = document.querySelector('.left-side-menu');
                if (shadowWrapper) {
                    shadowWrapper.style.display = 'flex';
                }
                if (popup) {
                    (popup as HTMLElement).style.display = 'flex';
                }
                if (leftSideMenu) {
                    (leftSideMenu as HTMLElement).style.display = 'none';
                }
            }

            if ((ev?.target as HTMLElement)?.closest('.chat-preview')) {
                const chatId = (ev?.target as HTMLElement).dataset['id']?.split('-')[1];
                this._messages = [];

                if (this._chatSocket) {
                    this._chatSocket.close(1000);
                    this._chatSocket = undefined;
                }

                this._chatTitle = (ev?.target as HTMLElement)?.closest('.chat-preview')?.querySelector('.chat-preview__text--title')?.textContent || ' ';
                this._chatId = Number(chatId);

                if (chatId !== undefined && this._userId) {
                    this._getUsers(chatId);

                    const {token} = await this._chatController.getToken(String(chatId));
                    this._chatSocket = this._webSocketController.connectChat(String(this._userId), String(chatId), token);

                    this._chatSocket.onopen = (ev) => {
                        this._chatSocket?.send(JSON.stringify({
                            content: '0',
                            type: 'get old'
                        }));

                        this._messageIndex = 21;

                        const interval = setInterval(() => {
                            if (this._chatSocket) {
                                this._chatSocket.send(JSON.stringify({type: 'ping'}));
                            } else {
                                clearInterval(interval);
                            }
                        }, 5000);
                    };

                    this._chatSocket.addEventListener('message', (message) => {
                        if (JSON.parse(message.data).type === 'pong' || JSON.parse(message.data).type === 'user connected') return;
                        if (JSON.parse(message.data).type === 'message') {
                            const msg = {
                                content: JSON.parse(message.data).content,
                                class: JSON.parse(message.data).user_id === Number(this._userId) ? 'chat__message--left' : 'chat__message--right'  
                            };

                            this._messages.push(msg);
                        } else if (JSON.parse(message.data).length) {
                            const messages = (JSON.parse(message.data) as { user_id: number, class: string }[]).map(message => {
                                message.class = message.user_id === Number(this._userId) ? 'chat__message--left' : 'chat__message--right';
                                return message;
                            });
    
                            this._messages.push(...messages);

                            
                            this._chatSocket?.send(JSON.stringify({
                                content: this._messageIndex,
                                type: 'get old'
                            }));

                            this._messageIndex += 20;
                        }

                        this.setProps({ arrays: { messages: this._messages, chats: this._chats, chatUsers: this._chatUsers }, chatTitle: this._chatTitle });
                    });
                }
            }
        };

        events.keydown = (ev) => {
            if ((ev as KeyboardEvent).repeat) return;

            isControlPressed = Boolean((ev?.target as HTMLElement).closest('#chat-textarea') && (ev as KeyboardEvent).key === 'Control') || isControlPressed;
            const isEnterPressed = Boolean(!(ev as KeyboardEvent).repeat && (ev?.target as HTMLElement).closest('#chat-textarea') && (ev as KeyboardEvent).key === 'Enter');

            if (isControlPressed && isEnterPressed) {
                const message = ((ev?.target as HTMLElement).closest('#chat-textarea') as HTMLTextAreaElement)?.value;
                this._chatSocket?.send(JSON.stringify({
                    content: message,
                    type: 'message',
                }));
            }
        };

        events.keyup = (ev) => {
            isControlPressed = !((ev as KeyboardEvent).key === 'Control') && isControlPressed;
        };

        const variables = {
            fullMessage: 'Полное сообщение',
            message: 'Последнее сообщение из ...',
            chatTitle: ' ',
            events,
            arrays: {
                chats: [{
                    id: 202,
                    title: 'Чат'
                }],
                messages: [ {  } ],
            },
        };
        super('chat-component', variables, html, style);
        this.initComponents();

        this._chatController = new ChatController();
        this._userController = new UserController();
        this._authController = new AuthController();
        this._webSocketController = new WebsocketController();
        ChatComponent._style = InputComponent.getStyles() + style  + ButtonComponent.getStyles();

        this._chatController.getChats().then((res) => {
            const chats = res.map((chat, index) => {
                (chat as {index: number}).index = index;
                return chat;
            });
            this.setProps({ arrays: { chats }, chatTitle: this._chatTitle });
            this._chats = chats as {id: number}[];
        });

        this._authController.getUser().then(res => {
            this._userId = res.id;
        });
    }

    protected initComponents(): void {
        const createChatInputComponent = new InputComponent({ placeholder: 'Название чата', type: 'text', name: 'create-chat'}).getContent();
        const createChatButtonComponent = new ButtonComponent({
            text: 'Создать чат',
            events: { 'click': async ev => {
                const chatName = (document.querySelector('.create-chat-name input') as HTMLInputElement).value;
                const chat: {id: number} = await this._chatController.createChat(chatName) as {id: number};
                await this._chatController.addUserToChat({ users: this._usersToChat.map(user => Number(user.id)), chatId: chat.id });
            } }
        }).getContent();

        const addUserToChatButtonComponent = new ButtonComponent({
            text: 'Добавить пользователей',
            events: { 'click': async ev => {
                if (this._chatId) {
                    await this._chatController.addUserToChat({ users: this._usersToChat.map(user => Number(user.id)), chatId: this._chatId});
                }
            } }
        }).getContent();
        const exitButton = new ButtonComponent({
            text: 'Выйти',
            class: 'button--exit',
            events: { 'click': async ev => {
                this._authController.logout()
                    .then(res => {
                        router.go('/');
                    });
            } }
        }).getContent();
        
        const addUserToChatBeforeCreateChatComponent = new InputComponent({ placeholder: 'Найти пользователя', type: 'text', events: {
            input: (ev) => {
                const login = (ev?.target as HTMLInputElement)?.value;
                this._addUsers((ev?.target as HTMLInputElement).closest('.popup-with-users') as HTMLElement, login);
            }
        } }).getContent();

        const addUserToChatComponent = new InputComponent( {placeholder: 'Найти пользователя', type: 'text', events: {
            input: (ev) => {
                const login = (ev?.target as HTMLInputElement).value;
                this._addUsers((ev?.target as HTMLInputElement).closest('.popup-with-users') as HTMLElement, login);
            }
        }} ).getContent();
        this.components = { createChatButtonComponent, createChatInputComponent, addUserToChatBeforeCreateChatComponent, exitButton, addUserToChatComponent, addUserToChatButtonComponent };
    }

    private _addUsers(parentElement: HTMLElement, login: string) {
        this._userController.searchUser(login).then(val => {
            const usersElement = parentElement?.querySelector('.users-for-chat');
            if (val && usersElement) {
                usersElement.textContent = '';
                const elements: Node[] = [];
                val.forEach((user, index) => {
                    const el = document.createElement('li');
                    el.classList.add('clickable');
                    el.textContent = user.login;
                    el.dataset['id'] = String(index);
                    el.addEventListener('click', (ev) => {
                        this._usersToChat.push(user);
                        const newEl = document.createElement('li');
                        newEl.classList.add('clickable', 'users-in-chat__item');
                        newEl.textContent = user.login;
                        const removeEl = document.createElement('span');
                        removeEl.textContent = 'Убрать';
                        newEl.append(removeEl);

                        parentElement.querySelector('.users-in-chat')?.append(newEl);
                    });
                    elements.push(el);
                });

                usersElement.append(...elements);
            }

        });
    }

    private _getUsers(chatId: string) {
        this._chatController.getUsers(chatId)
            .then(res => {
                this._chatUsers = res;
            });
    }
}

export { ChatComponent };
