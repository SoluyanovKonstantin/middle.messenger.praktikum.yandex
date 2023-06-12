import html from './settings.html?inline';
import css from './settings.css?inline';
import { TemplateEngine } from '../../../lib/templateEngine';

const { template, style } = (new TemplateEngine(html, css)).compile({});

export { template, style };
