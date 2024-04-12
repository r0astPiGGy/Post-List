import {User} from "./User.js";

export class Post {

    #title
    #body
    #author

    constructor(title, body, author) {
        if (!(author instanceof User)) throw new Error("Author must be a user.")

        this.#title = title.toString()
        this.#body = body.toString()
        this.#author = author
    }

    getTitle = () => this.#title

    getBody = () => this.#body

    getAuthor = () => this.#author

}