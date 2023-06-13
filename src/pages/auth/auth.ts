import html from './auth.html?inline';
import css from './auth.css?inline';
import { TemplateEngine } from '../../../lib/templateEngine';

const { template, style } = (new TemplateEngine(html, css)).compile({});

export { template, style };
