import html from './input.html?inline';
import style from './input.css?inline';
import { Block } from '../../../utils/block';

class InputComponent extends Block {
    constructor(props = {}, events = {}) {
        super('input-component', props, html, style, events);

        InputComponent._style = style;
    }
}

export {InputComponent} ;
