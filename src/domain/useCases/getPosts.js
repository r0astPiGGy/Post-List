import {PostRepository} from "../../data/postRepository.js";
import {UserRepository} from "../../data/userRepository.js";
import {Post} from "../model/post.js";
import {User} from "../model/user.js";
import {distinct} from "../utils.js";

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

    execute = async (page = 0, searchQuery = null) => {
        const postDtoList = await this.#postRepository.getPosts(searchQuery, page)
        const userIds = distinct(postDtoList.map(it => it.userId))

        const userDtoList = await Promise.all(
            userIds.map(userId => this.#userRepository.getUserById(userId))
        )

        const usersById = userDtoList.reduce((acc, dto) => {
            acc[dto.id] = this.#toUser(dto)
            return acc
        }, {})

        return postDtoList.map(dto => this.#toPost(dto, usersById[dto.userId]))
    }

    #toPost = (dto, author) => new Post(dto.title, dto.body, author)

    #toUser = (dto) => new User(dto.name, dto.phone, dto.email)

}