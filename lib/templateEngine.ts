//(?:<[a-z]*>)(.*)(?:<\/[a-z]*>)
//https://stackoverflow.com/questions/32649704/how-to-generate-hash-from-timestamp

export class TemplateEngine {
    private template = '';
    private style = '';
    private components: Record<string, HTMLElement> = {};

    constructor(template: string, style: string, components: Record<string, HTMLElement> = {}) {
        this.template = template;
        this.style = style;
        this.components = components;
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

    compile(variables: { [key: string]: string  }) {
        const variableInTemplateRegExp = /\{\{.*?\}\}/g;
        
        let newTemplate = this.template;
        
        this.template.match(variableInTemplateRegExp)?.forEach(key => {
            const trimmedKeyWithoutBracket = key.replaceAll(/\{\{ | \}\}/g, '');
            newTemplate = this.template.replace(key, variables[trimmedKeyWithoutBracket]);
        });

        const div = document.createElement('div');
        div.innerHTML = newTemplate;
        const child = div.firstElementChild as HTMLElement;
        
        Object.keys(this.components).forEach(name => {
            const element = child.querySelector<HTMLElement>(name.toLowerCase());
            if (element) {
                element.innerHTML = '';
                this.components[name].classList.add(...element.classList.values());
                element.parentNode?.insertBefore(this.components[name], element);
                element.remove();
            }
        });

        return {template: child, style: this.style};
    }
}
