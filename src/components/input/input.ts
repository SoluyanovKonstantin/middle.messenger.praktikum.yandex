import html from './input.html?inline';
import style from './input.css?inline';
import { Block } from '../../../lib/block';

class InputComponent extends Block {
    constructor(props = {}, ) {
        super('input-component', props, html, style);

        InputComponent._style = style;
    }
}

export {InputComponent} ;
