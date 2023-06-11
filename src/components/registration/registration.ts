import html from './registration.html?inline';
import css from './registration.css?inline';
import { TemplateEngine } from '../../../lib/templateEngine';

const { template, style } = (new TemplateEngine(html, css)).compile({});

export { template, style };
