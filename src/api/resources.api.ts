import {HTTPTransport} from '../../utils/http';

export class ResourcesApi {
    private _url: string;
    private _http: HTTPTransport;
    constructor() {
        this._url = import.meta.env.VITE_API_URL + 'resources/';
        this._http = new HTTPTransport();
    }

    public getResource(path: string) {
        return this._http.get(this._url + path);
    }
}
