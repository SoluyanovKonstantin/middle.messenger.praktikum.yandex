import { Block, Events } from './../../../lib/block';
import html from './button.html?inline';
import style from './button.css?inline';

class ButtonComponent extends Block {
    constructor(props = {}, events?: Events) {
        super('button-component', props, html, style, {}, events);

        ButtonComponent._style = style;

    }
}
export { ButtonComponent };
