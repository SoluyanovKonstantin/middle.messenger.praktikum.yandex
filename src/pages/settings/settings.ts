import html from './settings.html?inline';
import style from './settings.css?inline';
import { Block } from '../../../utils/block';
import { InputComponent } from '../../components/input/input';
import { ButtonComponent } from '../../components/button/button';
import { regExps } from '../../../utils/checkInput';
import { AuthController } from '../../controllers/auth.controller';
import { ChangePasswordData, IUserData, UpdateUserData } from '../../api/user.api';
import { UserController } from '../../controllers/user.controller';

class SettingsComponent extends Block {
    private _authController: AuthController;
    private _userController: UserController;

    constructor() {

        const events = {
            change: (ev: Event | undefined) => {
                console.log((ev?.target as HTMLInputElement)?.files);
                const files = (ev?.target as HTMLInputElement)?.files;
                if (files) {
                    const form = document.getElementById('avatar');
                    const formData = new FormData(form as HTMLFormElement);
                    console.log(formData.get('avatar'), files[0]);
                    this._userController.changeUserAvatar(formData);
                }
            }
        };
        super('chat-component', {events}, html, style);
        this._authController = new AuthController();
        this._userController = new UserController();

        this.initComponents();
        this._getUserInfo();
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

            if (type === 'data') {
                this._userController.changeUserData(obj as UpdateUserData)
                    .then(res => {
                        if (res?.status === 200) {
                            this._showMessage('Изменения сохранены');
                        }
                    });
            } else {
                this._userController.changeUserPassword(obj as ChangePasswordData)
                    .then(res => {
                        if (res?.status === 200) {
                            this._showMessage('Пароль изменен');
                        }
                    });
            }
        }
    }

    private _getUserInfo() {
        this._authController.getUser()
            .then((res: IUserData) => {
                (document.querySelector('input[name=first_name]') as HTMLInputElement).value = res.first_name;
                (document.querySelector('input[name=second_name]') as HTMLInputElement).value = res.second_name;
                (document.querySelector('input[name=display_name]') as HTMLInputElement).value = res.display_name;
                (document.querySelector('input[name=login]') as HTMLInputElement).value = res.login;
                (document.querySelector('input[name=email]') as HTMLInputElement).value = res.email || '';
                (document.querySelector('input[name=phone]') as HTMLInputElement).value = res.phone || '';
            });
    }

    private _showMessage(message: string) {
        const popup = document.createElement('div');
        popup.classList.add('alert-popup');
        popup.textContent = message;
        document.body.append(popup);

        setTimeout(() => {
            popup.remove();
        }, 5000);
    }
}


export { SettingsComponent };

