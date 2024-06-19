import { useEffect, useState } from "react"
import { getArticles } from "../api"
import ArticleItem from "./ArticleItem"


const Articles = () => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        setIsLoading(true)
        getArticles().then((articlesFromAPI) => {
            setArticles(articlesFromAPI.data.articles)
            setIsLoading(false)
        })
    }, [])

    if(isLoading){
        return <p className="loading">Loading...</p>
    }
    return (<>
        <ul className="article-list">
            {articles.map((article) => {
                return <ArticleItem key={article.article_id} singleArticle={article}/>
            })}
        </ul>
    </>)
}

export default Articles