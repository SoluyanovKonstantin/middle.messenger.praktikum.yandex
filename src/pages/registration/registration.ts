import html from './registration.html?inline';
import style from './registration.css?inline';
import { Block } from '../../../utils/block';
import { InputComponent } from '../../components/input/input';
import { regExps } from '../../../utils/checkInput';
import { ButtonComponent } from '../../components/button/button';
import { AuthController } from '../../controllers/auth.controller';
import { ISignUpData } from '../../api/auth.api';
import router from '../../../utils/router';

class RegistrationComponent extends Block {
    private _authController: AuthController;
    constructor(props = {}) {
        super('registration-component', props, html, style);

        this.initComponents();

        this._authController = new AuthController();
        RegistrationComponent._style = style + ButtonComponent.getStyles() + InputComponent.getStyles();
    }

    protected initComponents(): void {
        const loginComponent = new InputComponent({ placeholder: 'Логин', type: 'text', name: 'login', regExp: regExps.login }).getContent();
        const passwordComponent = new InputComponent({ placeholder: 'Пароль', type: 'password', name: 'password', regExp: regExps.password }).getContent();
        const emailComponent = new InputComponent({ placeholder: 'Почта', type: 'email', name: 'email', regExp: regExps.email }).getContent();
        const firstNameComponent = new InputComponent({ placeholder: 'Имя', type: 'text', name: 'first_name', regExp: regExps.name }).getContent();
        const lastNameComponent = new InputComponent({ placeholder: 'Фамилия', type: 'text', name: 'second_name', regExp: regExps.name }).getContent();
        const phoneComponent = new InputComponent({ placeholder: 'Телефон', type: 'phone', name: 'phone', regExp: regExps.phone }).getContent();
        const buttonComponent = new ButtonComponent({ text: 'Зарегистрироваться', events: { 'click': ev => this.onSubmit(ev as Event) } }).getContent();
        
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

            if (this.isSignUpData(obj)) {
                this._authController.signUp(obj).then(res => {
                    if ((res as Response).status === 200) {
                        router.go('/chat');
                    }
                });
            }
            console.log(obj);
        }
    }

    private isSignUpData(data: object | ISignUpData): data is ISignUpData {
        return !!(data as ISignUpData)?.['first_name'] &&
               !!(data as ISignUpData)?.['second_name'] &&
               !!(data as ISignUpData)?.['login'] &&
               !!(data as ISignUpData)?.['email'] &&
               !!(data as ISignUpData)?.['password'] &&
               !!(data as ISignUpData)?.['phone'];
    }
}

export { RegistrationComponent };
