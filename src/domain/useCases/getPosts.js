import {PostRepository} from "../../data/postRepository.js";
import {UserRepository} from "../../data/userRepository.js";

export class GetPosts {

    #postRepository
    #userRepository

    constructor(
        postRepository = new PostRepository(),
        userRepository = new UserRepository()
    ) {
        this.#postRepository = postRepository
        this.#userRepository = userRepository
    }

    execute = (page = 1) => {

    }

}