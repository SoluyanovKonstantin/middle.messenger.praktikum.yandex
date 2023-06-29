import html from './error.html?inline';
import style from './error.css?inline';
import { Block } from '../../../utils/block';

class ErrorComponent extends Block {
    constructor(events = {}) {
        const urlParams = new URLSearchParams(window.location.search);
        const errorCode = urlParams.get('errorCode') ?? '500';

        super('chat-component', { errorCode }, html, style, events);
        ErrorComponent._style = style;
    }
}

export { ErrorComponent };
