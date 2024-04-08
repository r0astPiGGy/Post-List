import {BASE_URL} from "./const";

export class UserRepository {

    getUserById = (id) => fetch(`${BASE_URL}/users/${id}`).then(r => r.json())

}