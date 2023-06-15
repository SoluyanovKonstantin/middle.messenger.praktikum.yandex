export class TemplateEngine {
    private template = '';
    private style = '';

    constructor(template: string, style: string) {
        this.template = template;
        this.style = style;
    }

    compile(variables: { [key: string]: string  }) {
        const variableInTemplateRegExp = /\{\{.*?\}\}/g;
        
        this.template.match(variableInTemplateRegExp)?.forEach(key => {
            const trimmedKeyWithoutBracket = key.replaceAll(/\{\{ | \}\}/g, '');
            this.template = this.template.replace(key, variables[trimmedKeyWithoutBracket]);
        });

        return {template: this.template, style: this.style};
    }
}
