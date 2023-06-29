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
