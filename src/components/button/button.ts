import { Block, Props } from '../../../utils/block.ts';
import html from './button.html';
import style from './button.css';

class ButtonComponent extends Block {
    constructor(props: Props = {}) {
        super('button-component', props, html, style);

        ButtonComponent._style = style;

    }
}
export { ButtonComponent };
