import html from './chat.html?inline';
import style from './chat.css?inline';
import { Block } from '../../../utils/block';

class ChatComponent extends Block {
    constructor(events = {}) {
        super('chat-component', { fullMessage: 'Полное сообщение', message: 'Последнее сообщение из ...' }, html, style, events);
        ChatComponent._style = style;
    }
}


export { ChatComponent };
