import {ViewController} from "./viewController.js";

const searchView = document.querySelector("#search-bar")

export function init(viewController = new ViewController()) {
    viewController.searchQuery.observe(onSearchQueryUpdated)
    viewController.isLoading.observe(onIsLoadingUpdated)
    viewController.posts.observe(onPostsUpdated)

    searchView.addEventListener("input", evt => viewController.onQueryChanged(evt.target.value))
}

const onSearchQueryUpdated = (query) => searchView.value = query

function onIsLoadingUpdated(isLoading) {

}

function onPostsUpdated(posts) {

}
