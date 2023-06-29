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
function queryStringify(data: object) {
    // Можно делать трансформацию GET-параметров в отдельной функции
    let str = '?';
    Object.keys(data).forEach(key => {
        str += `${key}=${Array.isArray(data[key]) ? data[key].join(',') : data[key]}&`;
    });

    str = str.replace(/&$/, '');

    return str;
}

type Options = { headers?: object, data?: object, timeout?: number}

class HTTPTransport {
    get = (url, options: Options = {}) => {

        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    };

    put = (url, options: Options = {}) => {

        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    post = (url, options: Options = {}) => {

        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    delete = (url, options: Options = {}) => {

        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    request = (url: string, options: { headers?: object, data?: object, method: METHODS }, timeout = 5000) => {

        return new Promise((res, rej) => {

            const { method, data } = options;
            const xhr = new XMLHttpRequest();

            if (method === 'GET' && data) {
                xhr.open(method, url + queryStringify(data));
            } else {
                xhr.open(method, url);
            }

            xhr.setRequestHeader('Content-Type', 'text/plain');

            xhr.onload = function () {
                console.log(xhr);
                res(xhr);
            };

            const handleError = err => {
                console.log(err);
                rej(err);
            };
          
            xhr.timeout = timeout;

            xhr.onabort = handleError;
            xhr.onerror = handleError;
            xhr.ontimeout = handleError;

            if (method === 'GET' || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });

    };
}

export {HTTPTransport};
