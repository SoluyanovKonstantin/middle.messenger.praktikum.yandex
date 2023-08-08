import { expect } from 'chai';
import { TemplateEngine } from './templateEngine.js';


describe('templateEngine', () => {

    it('check that templateEngine returns', () => {
        const templateEngine = new TemplateEngine('<div>{{ variable }}</div>', 'styles');

        const page = templateEngine.compile({variable: 'dqwdqwdqw dqwdqwd'}).template;
        expect(page instanceof HTMLElement).equal(true);
    });

    it('check variables in template engine', () => {
        const templateEngine = new TemplateEngine('<div>{{ variable }}</div>', 'styles');

        const page = templateEngine.compile({variable: 'dqwdqwdqw dqwdqwd'}).template;
        expect(page.textContent).equal('dqwdqwdqw dqwdqwd');
    });

    it('check loops in template engine', () => {
        const templateEngine = new TemplateEngine('<div for="let chat of chats" class="chat-preview">{{ chat.id }}</div>', 'styles');


        const page = templateEngine.compile({variable: 'dqwdqwdqw dqwdqwd', 
            arrays: {
                chats: [{
                    id: 202,
                    title: 'Чат'
                }],
            }}).template;
        expect(page.textContent).equal('202');
    });
});
