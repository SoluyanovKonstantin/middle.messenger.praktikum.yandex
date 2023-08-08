import { expect } from 'chai';
import { ButtonComponent } from './button.ts';

describe('button', () => {
    it('button props is empty', () => {
        const btn = new ButtonComponent();
        expect(Object.keys(btn.props).length).equal(0);
    });

    it('button variable is test string', () => {
        const btn = new ButtonComponent({ variable: 'test' });
        expect(btn.props['variable']).equal('test');
    });

    it('change button prop', () => {
        const btn = new ButtonComponent({ variable: 'test' });
        btn.setProps({variable: 'new Mock'});
        expect(btn.props['variable']).equal('new Mock');
    });
});
