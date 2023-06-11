import { TemplateEngine } from './../../../lib/templateEngine';
import template from './chat.html?inline';
import style from './chat.css?inline';

let t = (new TemplateEngine(template, style)).compile({ message: 'Последнее сообщение из ...', fullMessage: 'Полное сообщение' });

export { 
    t as template,
    style
};