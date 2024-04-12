import {GetPosts} from "../domain/useCases/GetPosts.js";
import {observableOf} from "./property/ObservableProperty.js";
import {observableListOf} from "./property/ObservableList.js";
import {debounce} from "./utils.js";

const DEBOUNCE_TIMEOUT_MILLIS = 500

export class ViewController {

    #getPosts

    #isLoading = observableOf(false)
    #searchQuery = observableOf(null)
    #posts = observableListOf([])
    #page = 0

    #noMorePages = false

    constructor(getPosts = new GetPosts()) {
        this.#getPosts = getPosts
        this.#loadPosts()
    }

    onQueryChanged = (searchQuery) => {
        this.#searchQuery.setValue(searchQuery)
        this.#loadFilteredPosts(searchQuery)
    }

    #loadFilteredPosts = debounce(searchQuery => {
        this.#page = 0
        this.#noMorePages = false
        this.#posts.setValue([])
        this.#loadPosts(searchQuery)
    }, DEBOUNCE_TIMEOUT_MILLIS)

    onLoadMore = () => {
        if (this.isLoading.getValue()) return

        this.#loadPosts(this.searchQuery.getValue())
    }

    #loadPosts = (searchQuery) => {
        if (this.isLoading.getValue() || this.#noMorePages) return

        this.#isLoading.setValue(true)

        this.#getPosts
            .execute(this.#page, searchQuery)
            .then(this.#onPostsLoaded)
            .finally(() => this.#isLoading.setValue(false))
    }

    #onPostsLoaded = (posts) => {
        if (posts.length === 0) {
            this.#noMorePages = true
            return
        }

        this.#posts.append(posts);
        this.#page++
    }

    get isLoading() { return this.#isLoading.toImmutable() }

    get searchQuery() { return this.#searchQuery.toImmutable() }

    get posts() { return this.#posts.toImmutable() }

}
