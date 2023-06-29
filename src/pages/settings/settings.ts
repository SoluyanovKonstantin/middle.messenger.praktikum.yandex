import html from './settings.html?inline';
import style from './settings.css?inline';
import { Block } from '../../../utils/block';
import { InputComponent } from '../../components/input/input';
import { ButtonComponent } from '../../components/button/button';
import { regExps } from '../../../utils/checkInput';

class SettingsComponent extends Block {
    constructor() {
        super('chat-component', {}, html, style);

        this.initComponents();

        SettingsComponent._style = style + InputComponent._style + ButtonComponent._style;
    }

    protected initComponents(): void {
        const firstNameComponent = new InputComponent({ placeholder: 'Имя', type: 'text', name: 'first_name', regExp: regExps.name }).getContent();
        const lastNameComponent = new InputComponent({ placeholder: 'Фамилия', type: 'text', name: 'second_name', regExp: regExps.name }).getContent();
        const displayNameComponent = new InputComponent({ placeholder: 'Отображаемое имя', type: 'text', name: 'display_name', regExp: regExps.name }).getContent();
        const loginComponent = new InputComponent({ placeholder: 'Логин', type: 'text', name: 'login', regExp: regExps.login }).getContent();
        const emailComponent = new InputComponent({ placeholder: 'Почта', type: 'email', name: 'email', regExp: regExps.email }).getContent();
        const phoneComponent = new InputComponent({ placeholder: 'Телефон', type: 'phone', name: 'phone', regExp: regExps.phone }).getContent();
        const saveDataButtonComponent = new ButtonComponent({ text: 'Сохранить', events: { 'click': ev => this.onSubmit(ev as Event, 'data') } }, ).getContent();

        const oldPasswordComponent = new InputComponent({ placeholder: 'Пароль', type: 'password', name: 'oldPassword', regExp: regExps.password }).getContent();
        const newPasswordComponent = new InputComponent({ placeholder: 'Пароль', type: 'password', name: 'newPassword', regExp: regExps.password }).getContent();
        const savePasswordButtonComponent = new ButtonComponent({ text: 'Сохранить', events: { 'click': ev => this.onSubmit(ev as Event, 'password') } }, ).getContent();
        this.components = { saveDataButtonComponent, savePasswordButtonComponent, loginComponent, oldPasswordComponent, newPasswordComponent, emailComponent, firstNameComponent, lastNameComponent, phoneComponent, displayNameComponent };
    }

    onSubmit(ev: Event, type: 'data' | 'password') {
        ev.preventDefault();

        if (this.components) {
            const obj: Record<string, string> = {};
            Object.values(this.components)?.forEach((component) => {
                const input = component.querySelector('input');
                if (input && (type === 'password' && input.type === type || type === 'data' && input.type !== 'password')) {
                    input.focus();
                    input.blur();
                    obj[input.name] = input.value;
                }
            });

            console.log(obj);
        }
    }
}


export { SettingsComponent };

