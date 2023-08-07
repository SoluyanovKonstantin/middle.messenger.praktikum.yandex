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

    private _findClosingTagIndex(tag: string, startIndex: number, template: string) {
        let nestCount = 0;
        let string = '';
        const shift = template.slice(0,startIndex + tag.length + 2).length;
        for (let i = shift; i < template.length; i++) {
            if (tag[string.length] === template[i]) {
                string += template[i];
            } else {
                string = '';
            }
            const isClosingTag = tag === string && template[i - tag.length] === '/';
            const isOpeningTag = tag === string && template[i - tag.length] === '<';
            if (isClosingTag && !nestCount) {
                return i + 1;
            } else if (isClosingTag && nestCount) {
                nestCount--;
            } else if (isOpeningTag) {
                nestCount++;
            }
        }
        return null;
    }

    private _handleLoopsInTemplate(template: string, variables: Props) {
        const forInTemplateRegExp = /<.* for="let [a-zA-Z]* of [a-zA-Z]*".*>/g;
        let forInTemplate : RegExpExecArray | null;
        let newTemplate = template;

        do {
            forInTemplate = forInTemplateRegExp.exec(newTemplate);
            let tag = '';
            const stringAfterTagStart = forInTemplate?.[0].split('<')[1] || '';
            const arrayName = stringAfterTagStart.split('of ')?.[1]?.split('"')[0]?.trim();
            const arrayVariable = stringAfterTagStart.split('let ')?.[1]?.split(' of')[0].trim() || '';
            for (let i = 0; i < stringAfterTagStart.length; i++) {
                if (stringAfterTagStart[i] !== ' ' && stringAfterTagStart !== '>') {
                    tag += stringAfterTagStart[i];
                } else {
                    break;
                }
            }
            const startIndex = forInTemplate?.index;
            if (tag && startIndex !== undefined) {
                const closingTagIndex = this._findClosingTagIndex(tag, startIndex, newTemplate) || 0;
                const forTemplate = newTemplate.slice(startIndex, closingTagIndex + 1);
                let finalForTemplate = '';
                const array = variables.arrays?.[arrayName] || []; 
                
                for (let i = 0; i < array?.length; i++) {
                    if (typeof array[i] !== 'object') {
                        finalForTemplate += forTemplate.replaceAll(arrayVariable, String(array[i]));
                    } else {
                        let copyTemplateString = forTemplate;

                        Object.keys((array[i] as Record<string, unknown>)).forEach(key => {
                            copyTemplateString = copyTemplateString.replaceAll(new RegExp(`{{\\s*${arrayVariable}.${key}\\s*}}`, 'g'), String((array[i] as Record<string, unknown>)[key]));
                        });

                        finalForTemplate += copyTemplateString;
                    }
                }


                newTemplate = newTemplate.replace(forTemplate, finalForTemplate.replace(/for="let [a-zA-Z]* of [a-zA-Z]*"/, ''));
            }
        } while (forInTemplate);

        return newTemplate;
    }

    compile(variables: Props, components: Record<string, HTMLElement> = {}) {
        const variableInTemplateRegExp = /\{\{.*?\}\}/g;
        
        let newTemplate = this.template;
        
        newTemplate = this._handleLoopsInTemplate(newTemplate, variables);

        newTemplate.match(variableInTemplateRegExp)?.forEach(key => {
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
