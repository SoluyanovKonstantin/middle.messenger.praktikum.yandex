import { TemplateEngine } from '../../../utils/templateEngine';
import html from './chat.html?inline';
import css from './chat.css?inline';

const { template, style } = (new TemplateEngine(html, css)).compile({ message: 'Последнее сообщение из ...', fullMessage: 'Полное сообщение' });

export { template, style };
