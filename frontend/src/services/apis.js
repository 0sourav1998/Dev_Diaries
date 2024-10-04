const BASE_URL = import.meta.env.VITE_BASE_URL;

export const userEndpoints = {
    SIGN_UP : `${BASE_URL}/api/v1/user/register`,
    LOGIN : `${BASE_URL}/api/v1/user/login`,
    GET_ALL_AUTHORS : `${BASE_URL}/api/v1/user/getAuthors`
}

export const blogEndPoints = {
    FETCH_ALL_BLOGS : `${BASE_URL}/api/v1/blog/all`,
    GET_MY_BLOGS : `${BASE_URL}/api/v1/blog/myBlogs`,
    CREATE_BLOG : `${BASE_URL}/api/v1/blog/post`,
    FETCH_LATEST_BLOGS : `${BASE_URL}/api/v1/blog/latestBlogs`
}