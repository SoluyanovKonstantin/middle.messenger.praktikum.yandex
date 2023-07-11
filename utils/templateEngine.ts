//(?:<[a-z]*>)(.*)(?:<\/[a-z]*>)
//https://stackoverflow.com/questions/32649704/how-to-generate-hash-from-timestamp

import { Props } from './block';

export class TemplateEngine {
    private template = '';
    private style = '';

    constructor(template: string, style: string) {
        this.template = template;
        this.style = style;
    }

    parseTemplate() {
        const tagsInTemplateRegExp = /(<[^/][\s\S]*?>)/g;
        const regExpResult = tagsInTemplateRegExp.exec(this.template);
        const templateCopy = this.template;
        const index = regExpResult?.index;
        const endOfTagIndex = Number(index) + Number(regExpResult?.[1]?.length);
        let templateAfterTag = templateCopy.slice(endOfTagIndex);
        const templateAfterTagCopy = templateAfterTag;
        const tag = regExpResult?.[1].slice(1,-1).split(' ').filter(el => el !== '\n' && el !== '');
        const closingTagRegExp = new RegExp(`</${tag?.[0]}>`);
        let isContinue = true;
        let templateInsideTag = '';
        let shift = 0;
        while (isContinue) {
            const closingTag = closingTagRegExp.exec(templateAfterTag);
            templateInsideTag = templateAfterTagCopy.slice(0, Number(closingTag?.index) + shift);
            const reg = new RegExp(`<${tag?.[0]}>`, 'g');
            if (!templateAfterTag.match(reg)?.length) {
                isContinue = false;
            } else {
                shift = Number(closingTag?.index) + Number(closingTag?.[0].length);
                templateAfterTag =  templateAfterTag.slice(shift);
            }
        }

        if (tag) {
            const el = document.createElement(tag[0]);
            tag.slice(1).forEach(attr => {
                const [ key, value = '' ] = attr.split('=');
                el.setAttribute(key, value);
            });
        }
    }


    compile(variables: Props, components: Record<string, HTMLElement> = {}) {
        const variableInTemplateRegExp = /\{\{.*?\}\}/g;
        
        let newTemplate = this.template;
        
        this.template.match(variableInTemplateRegExp)?.forEach(key => {
            const trimmedKeyWithoutBracket = key.replaceAll(/\{\{ | \}\}/g, '');
            const variable = variables[trimmedKeyWithoutBracket];
            if (variable && typeof variable === 'string') {
                newTemplate = newTemplate.replaceAll(key, variable);
            }
        });

        const div = document.createElement('div');
        div.innerHTML = newTemplate;
        const child = div.firstElementChild as HTMLElement;
        
        Object.keys(components).forEach(name => {
            const elements = child.querySelectorAll<HTMLElement>(name.toLowerCase());
            if (elements.length) {
                elements.forEach(element => {
                    const newEl = components[name] as HTMLElement;
                    newEl.classList.add(...element.classList.values());
                    element.parentNode?.insertBefore(newEl, element);
                    element.remove();
                });
            }
        });

        return {template: child, style: this.style};
    }
}
