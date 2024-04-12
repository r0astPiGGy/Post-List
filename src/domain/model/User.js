export class User {

    #name
    #phone
    #email

    constructor(name, phone, email) {
        this.#name = name
        this.#phone = phone
        this.#email = email
    }

    getName = () => this.#name

    getPhone = () => this.#phone

    getEmail = () => this.#email

}