import {ViewController} from "./ViewController.js";

const noPostsView = document.querySelector("#no-posts")
const searchView = document.querySelector("#search-bar")
const postContainer = document.querySelector("#posts-list")
const errorContainer = document.querySelector("#error-container")
const retryButton = document.querySelector("#retry-button")
const errorMessage = document.querySelector("#error")
const loaderView = document.querySelector("#loader")

export function init(viewController = new ViewController()) {
    viewController.searchQuery.observe(onSearchQueryUpdated)
    viewController.isLoading.observe(onIsLoadingUpdated)
    viewController.posts.observe(onPostsUpdated)
    viewController.nothingFound.observe(onNothingFoundChanged)
    viewController.error.observe(onErrorChanged)

    searchView.addEventListener("input", evt => viewController.onQueryChanged(evt.target.value))
    window.addEventListener("scroll", () => {
        if (hasReachedBottom()) {
            viewController.onLoadMore()
        }
    });
    retryButton.addEventListener("click", viewController.onRetry)

    viewController.clearAndLoad()
}

function hasReachedBottom() {
    const contentHeight = postContainer.offsetHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    return scrollTop + windowHeight >= contentHeight
}

const onSearchQueryUpdated = (query) => searchView.value = query

function onErrorChanged(error) {
    setVisible(errorContainer, error !== null)
    if (error !== null) {
        errorMessage.textContent = error.toString()
        console.log("Caught error:", error)
    }
}

function onNothingFoundChanged(state) {
    setVisible(noPostsView, state)
}

function onIsLoadingUpdated(isLoading) {
    setVisible(loaderView, isLoading)
}

function setVisible(element, enabled) {
    element.style.display = enabled ? "flex" : "none";
}

function onPostsUpdated(posts) {
    postContainer.innerHTML = ""
    posts.map(createPost).forEach(postEl => postContainer.appendChild(postEl))
}

function createPost(post) {
    const fullName = post.getAuthor().getName()
    const phone = post.getAuthor().getPhone()
    const email = post.getAuthor().getEmail()

    const postEl = document.createElement("div")

    postEl.className = "post"
    postEl.innerHTML = `
        <h2>${post.getTitle()}</h2>
        <div class="spacer-sm"></div>
        <p>${post.getBody()}</p>
        <div class="spacer"></div>
        <div class="author">
            <i class="person-icon">
                <img src="./../public/person.svg" height="24" width="24" alt="person-icon">
            </i>
            <div class="person-info">
                <p class="person-name">${fullName}</p>
                <a href="tel:${phone}">${phone}</a>
                <a href="mailto:${email}">${email}</a>
            </div>
        </div>
    `

    return postEl
}
