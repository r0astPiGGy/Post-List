import {GetPosts} from "../domain/useCases/getPosts.js";

export class ViewController {

    #getPosts

    constructor(getPosts = new GetPosts()) {
        this.#getPosts = getPosts
    }



}