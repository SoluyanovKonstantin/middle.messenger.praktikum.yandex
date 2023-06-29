import html from './input.html?inline';
import style from './input.css?inline';
import { Block, Props } from '../../../utils/block';
import { checkInput } from '../../../utils/checkInput';

class InputComponent extends Block {
    constructor(props: Props = {}) {
        super('input-component', props, html, style, { focusout: (event: Event | undefined) => { 
            checkInput((this.props['regExp'] as RegExp), (event?.target as HTMLInputElement)); 
        }});

        InputComponent._style = style;
    }
}

export {InputComponent} ;
