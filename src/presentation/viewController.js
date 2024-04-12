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
        this.#loadPosts()
    }

    onQueryChanged = (searchQuery) => {
        this.#searchQuery.setValue(searchQuery)

        // TODO
    }

    onLoadMore = () => {
        if (this.isLoading.getValue()) return
    }

    #loadPosts = () => {
        if (this.isLoading.getValue()) return

        this.#isLoading.setValue(true)

        this.#getPosts.execute()
            .then(posts => {
                this.#posts.setValue(posts)
                this.#isLoading.setValue(false)
            })
    }

    get isLoading() { return this.#isLoading.toImmutable() }

    get searchQuery() { return this.#searchQuery.toImmutable() }

    get posts() { return this.#posts.toImmutable() }

}
