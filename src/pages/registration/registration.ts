import html from './registration.html?inline';
import style from './registration.css?inline';
import { Block, Events } from '../../../utils/block';
import { InputComponent } from '../../components/input/input';
import { regExps } from '../../../utils/checkInput';
import { ButtonComponent } from '../../components/button/button';

class RegistrationComponent extends Block {
    constructor(props = {}, events?: Events) {
        super('registration-component', props, html, style, events);

        this.initComponents();

        RegistrationComponent._style = style + ButtonComponent.getStyles() + InputComponent.getStyles();
    }

    protected initComponents(): void {
        const loginComponent = new InputComponent({ placeholder: 'Логин', type: 'text', name: 'login', regExp: regExps.login }).getContent();
        const passwordComponent = new InputComponent({ placeholder: 'Пароль', type: 'password', name: 'password', regExp: regExps.password }).getContent();
        const emailComponent = new InputComponent({ placeholder: 'Почта', type: 'email', name: 'email', regExp: regExps.email }).getContent();
        const firstNameComponent = new InputComponent({ placeholder: 'Имя', type: 'text', name: 'first_name', regExp: regExps.name }).getContent();
        const lastNameComponent = new InputComponent({ placeholder: 'Фамилия', type: 'text', name: 'second_name', regExp: regExps.name }).getContent();
        const phoneComponent = new InputComponent({ placeholder: 'Телефон', type: 'phone', name: 'phone', regExp: regExps.phone }).getContent();
        const buttonComponent = new ButtonComponent({ text: 'Зарегистрироваться' }, { 'click': ev => this.onSubmit(ev as Event) }).getContent();
        
        this.components = { buttonComponent, loginComponent, passwordComponent, emailComponent, firstNameComponent, lastNameComponent, phoneComponent };
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

export { RegistrationComponent };
