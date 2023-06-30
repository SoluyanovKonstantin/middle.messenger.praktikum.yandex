import { Block, Props } from '../../../utils/block';
import html from './button.html?inline';
import style from './button.css?inline';

class ButtonComponent extends Block {
    constructor(props: Props = {}) {
        super('button-component', props, html, style);

        ButtonComponent._style = style;

    }
}
export { ButtonComponent };
