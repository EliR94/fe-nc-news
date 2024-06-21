import { useEffect, useState } from "react"
import { getArticles } from "../api"
import ArticleItem from "./ArticleItem"
import { useParams } from "react-router-dom"

const Articles = () => {
    const { topic } = useParams();
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        setIsLoading(true)
        getArticles(topic).then((articlesFromAPI) => {
            setArticles(articlesFromAPI.data.articles)
            setIsLoading(false)
        })
    }, [topic])

    if(isLoading){
        return <p className="loading">Loading...</p>
    }
    return (<>
        <h2 className="articles-subheader">{topic ? `${topic.slice(0, 1).toUpperCase()}${topic.slice(1)} Articles:` : "All Articles:"}</h2>
        <ul className="article-list">
            {articles.map((article) => {
                return <ArticleItem key={article.article_id} singleArticle={article}/>
            })}
        </ul>
    </>)
}

export default Articles