import { init } from './ui/htmlRenderer.js'
import { ViewController } from "./ui/viewController.js";
import {GetPosts} from "./domain/useCases/getPosts.js";

const getPosts = new GetPosts()
const viewController = new ViewController()

init(viewController)

console.log(await getPosts.execute())
