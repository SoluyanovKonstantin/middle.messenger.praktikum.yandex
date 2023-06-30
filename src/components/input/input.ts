import html from './input.html?inline';
import style from './input.css?inline';
import { Block, Props } from '../../../utils/block';
import { checkInput } from '../../../utils/checkInput';

class InputComponent extends Block {
    constructor(props: Props = {}) {
        props.events = { focusout: (event: Event | undefined) => { 
            const input = event?.target as HTMLInputElement;
            const checkResult = checkInput((this.props['regExp'] as RegExp), input);
            const inputName = this.props.name;

            if (!checkResult) {
                input.classList.add('input--alert');
                input.parentElement?.classList.add(`input-wrapper--alert-${inputName}`);
            } else {
                input.classList.remove('input--alert');
                input.parentElement?.classList.remove(`input-wrapper--alert-${inputName}`);
            }
        }};

        super('input-component', props, html, style);

        InputComponent._style = style;
    }
}

export {InputComponent} ;
