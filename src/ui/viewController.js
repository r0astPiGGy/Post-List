import {GetPosts} from "../domain/useCases/getPosts.js";
import {observableOf} from "./property/ObservableProperty.js";

export class ViewController {

    #getPosts

    #isLoading = observableOf(false)
    #searchQuery = observableOf(null)
    #posts = observableOf([])
    #page = 0

    constructor(getPosts = new GetPosts()) {
        this.#getPosts = getPosts
    }

    onQueryChanged = (searchQuery) => {
        this.#searchQuery.setValue(searchQuery)

        // TODO
    }

    onLoadMore = () => {

    }

    get isLoading() { return this.#isLoading.toImmutable() }

    get searchQuery() { return this.#searchQuery.toImmutable() }

    get posts() { return this.#posts.toImmutable() }

}
