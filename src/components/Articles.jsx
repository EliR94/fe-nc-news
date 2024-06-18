import { useEffect, useState } from "react"
import { getArticles } from "../api"

const Articles = () => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        console.log("useEffect triggered")
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
                const created = new Date(article.created_at)
                const formattedDate = `${created.getDate()}.${created.getMonth()}.${created.getFullYear()}`
                const time = created.toTimeString()
                const formattedTime = time.slice(0, 5)
                return <li key={article.article_id} className="article">
                    <img className="article-img" src={article.article_img_url} alt={article.title}/>
                    <h3>{article.title}</h3>
                    <p>By: {article.author} | Topic: {article.topic}</p>
                    <p>{formattedTime} {formattedDate} | Votes: {article.votes}</p> 
                    <button>Read the full article</button>
                </li>
            })}
        </ul>
    </>)
}

export default Articles