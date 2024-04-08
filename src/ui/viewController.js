import {GetPosts} from "../domain/useCases/getPosts.js";

const ViewState = (isLoading = true) => ({
    isLoading: isLoading,
    posts: [],
    page: 0,
    searchQuery: null
})

export class ViewController {

    #viewStateUpdatedListener
    #getPosts

    #state = ViewState()

    constructor(getPosts = new GetPosts()) {
        this.#getPosts = getPosts
    }

    #fireViewStateUpdated = () => {
        if (this.#viewStateUpdatedListener === null) return

        this.#viewStateUpdatedListener(this.#state)
    }

    setViewStateUpdatedListener = (listener) => this.#viewStateUpdatedListener = listener

    onQueryChanged = (searchQuery) => {

    }

    onLoadMore = () => {

    }

}
