import { UserApi, IUserData } from '../api/user.api';


export class UserController {
    private _userApi: UserApi;

    constructor() {
        this._userApi = new UserApi();
    }

    searchUser(login: string) {
        return this._userApi.searchUser(login)
            .then(res => {
                return JSON.parse((res as XMLHttpRequest).response) as IUserData[];
            }).catch(err => console.error(err));
    }



}
