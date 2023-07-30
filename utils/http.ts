enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

/**
* Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
* На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
* На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/
function queryStringify(data: Record<string, string | Array<string>>) {
    // Можно делать трансформацию GET-параметров в отдельной функции
    let str = '?';
    Object.keys(data).forEach(key => {
        str += `${key}=${Array.isArray(data[key]) ? (data[key] as string[]).join(',') : data[key]}&`;
    });

    str = str.replace(/&$/, '');

    return str;
}

type Options = { headers?: object, data?: unknown, timeout?: number, ContentType?: string}

class HTTPTransport {
    get = (url: string, options: Options = {}) => {

        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    };

    put = (url: string, options: Options = {}) => {

        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    post = (url: string, options: Options = {}) => {

        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    delete = (url: string, options: Options = {}) => {

        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    request = (url: string, options: { headers?: object, data?: unknown, method: METHODS, ContentType?: string }, timeout = 5000): Promise<XMLHttpRequest> => {

        return new Promise((res, rej) => {

            const { method, data } = options;
            const xhr = new XMLHttpRequest();

            if (method === 'GET' && data) {
                xhr.open(method, url + queryStringify(data as Record<string, string | string[]>));
            } else {
                xhr.open(method, url);
            }

            if (!(data instanceof FormData)) {
                xhr.setRequestHeader('Content-Type', options.ContentType || 'application/json');
            }
            xhr.withCredentials = true;
            let formData = data;

            if (options.ContentType === 'application/json' || !options.ContentType && !(data instanceof FormData)) {
                formData = JSON.stringify(data);
            }

            xhr.onload = function () {
                res(xhr);
            };

            const handleError = (err: ProgressEvent) => {
                rej(err);
            };
          
            xhr.timeout = timeout;

            xhr.onabort = handleError;
            xhr.onerror = handleError;
            xhr.ontimeout = handleError;

            if (method === 'GET' || !data) {
                xhr.send();
            } else {
                xhr.send(formData as XMLHttpRequestBodyInit);
            }
        });

    };
}

export {HTTPTransport};
