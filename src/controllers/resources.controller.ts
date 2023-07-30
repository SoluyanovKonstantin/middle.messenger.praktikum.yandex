import { ResourcesApi } from '../api/resources.api';

export class ResourcesController {
    private _resourcesApi: ResourcesApi;

    constructor() {
        this._resourcesApi = new ResourcesApi();
    }

    public getResource(path: string) {
        this._resourcesApi.getResource(path)
            .catch(err => console.error(err));
    }

}
