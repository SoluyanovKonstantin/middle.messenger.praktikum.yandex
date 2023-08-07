import { expect } from 'chai';
import router from './router.js';
import { Block } from './block.js';

class MockClass extends Block {
    constructor() {
        super('mock', {}, '', '');
    }
}

class MockTwoClass extends Block {
    constructor() {
        super('mock-two', {}, '<div>second mock test</div>', '');
    }
}


describe('router', () => {
    it('Should start with empty url', () => {

        router
            .use('/', MockClass)
            .use('/sign-up', MockClass)
            .use('/auth', MockClass)
            .use('/messenger', MockTwoClass)
            .use('/error', MockClass)
            .use('/settings', MockClass)
            .start();

        expect(window.location.href).to.equal('http://localhost:5173/');
    });

    it ('count of routes equals six', () => {
        expect(router.routes.length).to.equal(6);
    });

    it('should change page to auth', () => {
        router.go('/auth');

        expect(window.location.href).to.equal('http://localhost:5173/auth');
    });

    it('should render page', () => {
        router.go('/messenger');

        expect(document.querySelector('#app')?.textContent).to.equal('second mock test');
    });
});
