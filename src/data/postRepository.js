import {BASE_URL, POSTS_PER_PAGE} from "./const.js";
import {paramsOf} from "./utils.js";

export class PostRepository {

    getPosts = (
        page = 0,
        perPage = POSTS_PER_PAGE,
        titleQuery = null
    ) => {
        const params = paramsOf({
            "page": page,
            "perPage": perPage
        })

        if (titleQuery !== null) {
            params["title_like"] = titleQuery
        }

        return fetch(`${BASE_URL}?${params}`)
            .then(response => response.json())
    }

}