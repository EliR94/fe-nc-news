import axios from "axios"

const newsApi = axios.create({
    baseURL: 'https://nc-news-ms3a.onrender.com/api'
})

export const getArticles = () => {
    return newsApi.get('/articles')
}

export const getArticleById = (article_id) => {
    return newsApi.get(`/articles/${article_id}`)
}

export const patchArticleVotes = (article_id, inc_votes) => {
    return newsApi.patch(`/articles/${article_id}`, {inc_votes})
}

export const getComments = (article_id) => {
    return newsApi.get(`/articles/${article_id}/comments`)
}
