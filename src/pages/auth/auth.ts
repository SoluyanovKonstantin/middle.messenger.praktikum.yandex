import { Block, Events } from '../../../utils/block';
import html from './auth.html?inline';
import style from './auth.css?inline';
import { ButtonComponent } from '../../components/button/button';
import { InputComponent } from '../../components/input/input';
import { regExps } from '../../../utils/checkInput';

class AuthComponent extends Block {
    constructor(props = {}, events?: Events) {
        super('auth-component', props, html, style, events);

        this.initComponents();

        AuthComponent._style = style + ButtonComponent.getStyles() + InputComponent.getStyles();
    }

    protected initComponents(): void {
        const loginComponent = new InputComponent({ placeholder: 'Логин', type: 'text', name: 'login', regExp: regExps.login }).getContent();
        const passwordComponent = new InputComponent({ placeholder: 'Пароль', type: 'password', name: 'password' , regExp: regExps.password}).getContent();
        const buttonComponent = new ButtonComponent({
            text: 'Войти'
        }, { 'click': ev => this.onSubmit(ev as Event) }).getContent();

        this.components = { buttonComponent, loginComponent, passwordComponent };
    }

    onSubmit(ev: Event) {
        ev.preventDefault();

        if (this.components) {
            const obj: Record<string, string> = {};

            Object.values(this.components)?.forEach((component) => {
                const input = component.querySelector('input');
                if (input) {
                    input.focus();
                    input.blur();
                    obj[input.name] = input.value;
                }
            });

            console.log(obj);
        }
    }
}

export { AuthComponent };
