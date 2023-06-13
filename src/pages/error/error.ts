import html from './error.html?inline';
import css from './error.css?inline';
import { TemplateEngine } from '../../../lib/templateEngine';

const urlParams = new URLSearchParams(window.location.search);
const errorCode = urlParams.get('errorCode') ?? '500';

const { template, style } = (new TemplateEngine(html, css)).compile({ errorCode });

export { template, style };
