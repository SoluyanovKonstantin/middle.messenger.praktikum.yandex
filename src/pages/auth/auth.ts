import { Block, Events, Props } from '../../../utils/block';
import html from './auth.html?inline';
import style from './auth.css?inline';
import { ButtonComponent } from '../../components/button/button';
import { InputComponent } from '../../components/input/input';
import { regExps } from '../../../utils/checkInput';
import router from '../../../utils/router';
import { AuthController } from '../../controllers/auth.controller';

class AuthComponent extends Block {
    private _authController: AuthController;

    constructor(props: Props = {}, events?: Events) {
        props.events = events;

        super('auth-component', props, html, style);

        this.initComponents();
        this._authController = new AuthController();
        AuthComponent._style = style + ButtonComponent.getStyles() + InputComponent.getStyles();
    }

    protected initComponents(): void {
        const loginComponent = new InputComponent({ placeholder: 'Логин', type: 'text', name: 'login', regExp: regExps.login }).getContent();
        const passwordComponent = new InputComponent({ placeholder: 'Пароль', type: 'password', name: 'password' , regExp: regExps.password}).getContent();
        const buttonComponent = new ButtonComponent({
            text: 'Войти',
            events: { 'click': ev => this.onSubmit(ev as Event) }
        }).getContent();
        const regisctrationButton = new ButtonComponent({
            text: 'Зарегистрироваться',
            events: { 'click': (ev) => { ev?.preventDefault(); router.go('/sign-up'); } }
        }).getContent();

        this.components = { buttonComponent, loginComponent, passwordComponent, regisctrationButton };
    }

    async onSubmit(ev: Event) {
        ev.preventDefault();

        if (this.components) {
            const obj = { login: '', password: '' };
            let isError = false;
            Object.values(this.components)?.forEach((component) => {
                const input = component.querySelector('input');
                if (input) {
                    input.focus();
                    input.blur();
                    if (input.classList.contains('input--alert')) {
                        isError = true;
                    }
                    obj[input.name as 'login' | 'password'] = input.value;
                }

            });

            if (!isError) {
                await this._authController.logout();
                const res = await this._authController.signIn(obj);

                if (res?.status === 200) {
                    router.go('/messenger');
                }
            }
        }
    }
}

export { AuthComponent };

