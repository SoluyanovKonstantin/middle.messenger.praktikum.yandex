import html from './registration.html?inline';
import style from './registration.css?inline';
import { Block, Events } from '../../../utils/block';
import { InputComponent } from '../../components/input/input';
import { checkInput, regExps } from '../../../utils/checkInput';
import { ButtonComponent } from '../../components/button/button';

class RegistrationComponent extends Block {
    constructor(props = {}, events?: Events) {
        super('registration-component', props, html, style, events);

        this.initComponents();

        RegistrationComponent._style = style + ButtonComponent.getStyles() + InputComponent.getStyles();
    }

    protected initComponents(): void {
        const login = new InputComponent({ placeholder: 'Логин', type: 'text', name: 'login' }, { focusout: (ev: Event) => { 
            checkInput(regExps.login, (ev.target as HTMLInputElement)); 
        }});
        const password = new InputComponent({ placeholder: 'Пароль', type: 'password', name: 'password' }, { focusout: (ev: Event) => {
            checkInput(regExps.password, ev.target as HTMLInputElement);
        } });
        const email = new InputComponent({ placeholder: 'Почта', type: 'email', name: 'email' }, { focusout: (ev: Event) => {
            checkInput(regExps.email, ev.target as HTMLInputElement);
        } });
        const firstName = new InputComponent({ placeholder: 'Имя', type: 'text', name: 'first_name' }, { focusout: (ev: Event) => {
            checkInput(regExps.name, ev.target as HTMLInputElement);
        } });
        const lastName = new InputComponent({ placeholder: 'Фамилия', type: 'text', name: 'second_name' }, { focusout: (ev: Event) => {
            checkInput(regExps.name, ev.target as HTMLInputElement);
        } });
        const phone = new InputComponent({ placeholder: 'Телефон', type: 'phone', name: 'phone' }, { focusout: (ev: Event) => {
            checkInput(regExps.phone, ev.target as HTMLInputElement);
        } });
        const button = new ButtonComponent({
            text: 'Зарегистрироваться'
        }, { 'click': ev => this.onSubmit(ev as Event) });
        
        const buttonComponent = button.getContent();
        const loginComponent = login.getContent();
        const passwordComponent = password.getContent();
        const emailComponent = email.getContent();
        const firstNameComponent = firstName.getContent();
        const lastNameComponent = lastName.getContent();
        const phoneComponent = phone.getContent();

        this.components = { buttonComponent, loginComponent, passwordComponent, emailComponent, firstNameComponent, lastNameComponent, phoneComponent };
    }

    onSubmit(ev: Event) {
        ev.preventDefault();
        console.log(ev);

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
