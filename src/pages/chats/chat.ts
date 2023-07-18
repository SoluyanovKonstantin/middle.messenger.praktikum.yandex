import html from './chat.html?inline';
import style from './chat.css?inline';
import { Block } from '../../../utils/block';

class ChatComponent extends Block {
    constructor(events = {}) {
        super('chat-component', { fullMessage: 'Полное сообщение', message: 'Последнее сообщение из ...', events, arrays: { messages: [ {text: 'Последнее сообщение из ...', class: 'chat__message--right"'} ] } }, html, style);
        ChatComponent._style = style;
    }
}

export { ChatComponent };
