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