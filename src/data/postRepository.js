import {BASE_URL, POSTS_PER_PAGE} from "./const.js";
import {paramsOf} from "./utils.js";

export class PostRepository {

    getPosts = (
        titleQuery = null,
        page = 0,
        perPage = POSTS_PER_PAGE
    ) => {
        const params = paramsOf({
            "_page": page,
            "_perPage": perPage
        })

        if (titleQuery !== null) {
            params["title_like"] = titleQuery
        }

        return fetch(`${BASE_URL}/posts?${params}`)
            .then(response => response.json())
    }
}