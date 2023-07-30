import { UserApi, IUserData, UpdateUserData, ChangePasswordData } from '../api/user.api';


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

    changeUserData(data: UpdateUserData) {
        return this._userApi.changeUserData(data)
            .catch(err => console.error(err));
    }

    changeUserPassword(data: ChangePasswordData) {
        return this._userApi.changeUserPassword(data)
            .catch(err => console.error(err));
    }

}
