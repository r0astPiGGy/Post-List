import {GetPosts} from "../domain/useCases/GetPosts.js";
import {observableOf} from "./property/ObservableProperty.js";
import {observableListOf} from "./property/ObservableList.js";
import {debounce, isNotEmpty} from "./utils.js";

const DEBOUNCE_TIMEOUT_MILLIS = 500

export class ViewController {

    #getPosts

    #isLoading = observableOf(false)
    #searchQuery = observableOf(null)
    #posts = observableListOf([])
    #nothingFound = observableOf(false)
    #error = observableOf(null)
    #page = 0

    #noMorePages = false

    constructor(getPosts = new GetPosts()) {
        this.#getPosts = getPosts
    }

    onLoadMore = () => {
        if (this.isLoading.getValue()) return

        this.#loadPosts(this.searchQuery.getValue())
    }

    onQueryChanged = (searchQuery) => {
        this.#searchQuery.setValue(searchQuery)
        this.#loadByQueryDebounced(searchQuery)
    }

    #loadByQueryDebounced = debounce(() => this.clearAndLoad(), DEBOUNCE_TIMEOUT_MILLIS)

    clearAndLoad = (searchQuery = null) => {
        this.#page = 0
        this.#noMorePages = false
        this.#posts.setValue([])
        this.#loadPosts(searchQuery)
    }

    onRetry = () => this.#loadPosts(this.searchQuery.getValue())

    #loadPosts = (searchQuery) => {
        this.#error.setValue(null)

        if (this.isLoading.getValue() || this.#noMorePages) return

        this.#isLoading.setValue(true)
        this.#nothingFound.setValue(false)

        this.#getPosts
            .execute(this.#page, searchQuery)
            .then(this.#onPostsLoaded)
            .catch(e => this.#error.setValue(e))
            .finally(() => this.#isLoading.setValue(false))
    }

    #onPostsLoaded = (posts) => {
        this.#nothingFound.setValue(
            posts.length === 0 &&
            isNotEmpty(this.searchQuery.getValue()) &&
            this.#page === 0
        )

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

    get nothingFound() { return this.#nothingFound.toImmutable() }

    get error() { return this.#error.toImmutable() }

}
