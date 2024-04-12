import {ViewController} from "./ViewController.js";

const searchView = document.querySelector("#search-bar")
const postContainer = document.querySelector("#posts-list")
const loader = document.querySelector("#loader")

export function init(viewController = new ViewController()) {
    viewController.searchQuery.observe(onSearchQueryUpdated)
    viewController.isLoading.observe(onIsLoadingUpdated)
    viewController.posts.observe(onPostsUpdated)

    searchView.addEventListener("input", evt => viewController.onQueryChanged(evt.target.value))

    window.addEventListener("scroll", () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            viewController.onLoadMore()
        }
    });
}

const onSearchQueryUpdated = (query) => searchView.value = query

function onIsLoadingUpdated(isLoading) {
    loader.style.display = isLoading ? "block" : "none";
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
