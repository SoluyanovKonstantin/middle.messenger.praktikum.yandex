import { Block } from './../../../lib/block';
import html from './auth.html?inline';
import style from './auth.css?inline';
import { ButtonComponent } from '../../components/button/button';
import { InputComponent } from '../../components/input/input';

const login = new InputComponent({ text: 'Логин' });
const password = new InputComponent({ text: 'Пароль' }, );
const button = new ButtonComponent({
    text: 'Войти'
}, { 'click': ev => {console.log('hello', ev); } });

const buttonComponent = button.getContent();
const loginComponent = login.getContent();
const passwordComponent = password.getContent();


const block = new Block('auth-component', {}, html, style, {
    buttonComponent,
    loginComponent,
    passwordComponent,
});



const template = block.getContent();
button.setProps({text: 'Войти2'});

const stylesWholePage =
    style + ButtonComponent.getStyles() + InputComponent.getStyles();

export { template, stylesWholePage as style };
