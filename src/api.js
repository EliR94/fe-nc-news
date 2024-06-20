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

export const postComment = (article_id, loggedInUser, commentInput) => {
    return newsApi.post(`/articles/${article_id}/comments`, {
        username: loggedInUser,
        body: commentInput,
    })
}

export const deleteComment = (comment_id) => {
    return newsApi.delete(`/comments/${comment_id}`)
}