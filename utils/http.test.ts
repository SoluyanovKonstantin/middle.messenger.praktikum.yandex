/* eslint-disable @typescript-eslint/ban-ts-comment */
import sinon, { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from 'sinon';
import { expect } from 'chai';
import {HTTPTransport} from './http';

describe('http', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let instance: HTTPTransport;
    const requests: SinonFakeXMLHttpRequest[] = [];
    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();

        // @ts-expect-error
        global.XMLHttpRequest = xhr;

        xhr.onCreate = (req) => {
            requests.push(req);
        };

        instance = new HTTPTransport();
    });

    afterEach(() => {
        requests.length = 0;
        xhr.restore();
    });

    it('Method get() should be called with GET method', () => {
        instance.get('/');

        const [request] = requests;

        expect(request.method).to.equal('GET');
    });

    it('Method post() should be called with POST method', () => {
        instance.post('/');

        const [request] = requests;

        expect(request.method).to.equal('POST');
    });

    it('Method patch() should be called with PUT method', () => {
        instance.put('/');

        const [request] = requests;

        expect(request.method).to.equal('PUT');
    });

    it('Method get() with body', () => {
        instance.get('/', { data: { mock: true } });

        const [request] = requests;

        expect(request.url).to.equal('/?mock=true');
    });

    it('Request with path', () => {
        instance.post('/path', { data: { mock: true } });

        const [request] = requests;
        expect(request.url).to.equal('/path');
    });
});
