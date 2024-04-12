import {BASE_URL, POSTS_PER_PAGE} from "./const.js";
import {paramsOf} from "./utils.js";

export class PostRepository {

    getPosts = (
        titleQuery = null,
        page = 0,
        perPage = POSTS_PER_PAGE
    ) => {
        const paramObj = {
            "_page": page,
            "_perPage": perPage
        }

        if (titleQuery !== null && titleQuery !== "") {
            paramObj["title_like"] = titleQuery
        }

        const params = paramsOf(paramObj)

        return fetch(`${BASE_URL}/posts?${params}`)
            .then(response => response.json())
    }
}