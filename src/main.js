import {UserRepository} from "./data/userRepository.js";
import {PostRepository} from "./data/postRepository.js";
import {GetPosts} from "./domain/useCases/getPosts.js";
import {ViewController} from "./presentation/viewController.js";
import {init} from './presentation/htmlRenderer.js'
import {MockPostRepository, MockUserRepository} from "./data/mock.js";

const postRepository = new MockPostRepository()
const userRepository = new MockUserRepository()

const getPosts = new GetPosts(postRepository, userRepository)
const viewController = new ViewController(getPosts)

init(viewController)

console.log(await getPosts.execute())