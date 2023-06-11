export class TemplateEngine {
    private template = '';
    private style = '';

    constructor(template: string, style: string) {
        this.template = template;
        this.style = style;
    }

    compile(variables: { [key: string]: string  }) {
        const regExp = /\{\{.*?\}\}/g;
        
        this.template.match(regExp)?.forEach(key => {
            const trimmedKeyWithoutBracket = key.replaceAll(/\{\{ | \}\}/g, '');
            this.template = this.template.replace(key, variables[trimmedKeyWithoutBracket]);
        })

        return this.template;
    }
}
