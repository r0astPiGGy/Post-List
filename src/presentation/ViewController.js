import {GetPosts} from "../domain/useCases/GetPosts.js";
import {observableOf} from "./property/ObservableProperty.js";
import {observableListOf} from "./property/ObservableList.js";

export class ViewController {

    #getPosts

    #isLoading = observableOf(false)
    #searchQuery = observableOf(null)
    #posts = observableListOf([])
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

        this.#loadPosts()
    }

    #loadPosts = () => {
        if (this.isLoading.getValue()) return

        this.#isLoading.setValue(true)

        this.#getPosts
            .execute(this.#page++, this.searchQuery.getValue())
            .then(posts => this.#posts.append(posts))
            .finally(() => this.#isLoading.setValue(false))
    }

    get isLoading() { return this.#isLoading.toImmutable() }

    get searchQuery() { return this.#searchQuery.toImmutable() }

    get posts() { return this.#posts.toImmutable() }

}
