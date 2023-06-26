import { Block } from './../../../lib/block';
import html from './auth.html?inline';
import style from './auth.css?inline';
import button from '../../components/button/button';

button.setProps({ text: 'Войти' });

const buttonComponent = button.getContent();

const block = new Block('auth-component', { }, html, style, { buttonComponent });

const template = block.getContent();

const stylesWholePage = style + button.getStyles();

export { template, stylesWholePage as style };
