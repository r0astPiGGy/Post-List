import {UserRepository} from "./data/UserRepository.js";
import {PostRepository} from "./data/PostRepository.js";
import {GetPosts} from "./domain/useCases/GetPosts.js";
import {ViewController} from "./presentation/ViewController.js";
import {init} from './presentation/htmlRenderer.js'
import {MockPostRepository, MockUserRepository} from "./data/mock.js";

const postRepository = new MockPostRepository()
const userRepository = new MockUserRepository()

const getPosts = new GetPosts(postRepository, userRepository)
const viewController = new ViewController(getPosts)

init(viewController)

console.log(await getPosts.execute())