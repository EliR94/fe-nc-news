import { useEffect, useState } from "react"
import { getArticles } from "../api"
import ArticleItem from "./ArticleItem"
import { useParams, useSearchParams } from "react-router-dom"

const Articles = () => {
    const { topic } = useParams();
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    
    const sortBy = searchParams.get("sort_by");
    const order = searchParams.get("order");

    useEffect(() => {
        setIsLoading(true)
        getArticles(topic, sortBy, order).then((articlesFromAPI) => {
            setArticles(articlesFromAPI.data.articles)
            setIsLoading(false)
        })
    }, [topic, sortBy, order])

    const newParams = new URLSearchParams(searchParams);

    const handleSortByChange = (event) => {
        newParams.set("sort_by", event.target.value)
        setSearchParams(newParams)
    }

    const handleOrderChange = (event) => {
        newParams.set("order", event.target.value)
        setSearchParams(newParams)
    }

    if(isLoading){
        return <p className="loading">Loading...</p>
    }
    return (<>
        <h2 className="articles-subheader">{topic ? `${topic.slice(0, 1).toUpperCase()}${topic.slice(1)} Articles:` : "All Articles:"}</h2>
            <label className="sort-by">Sort articles by:
                <select onChange={handleSortByChange} value={sortBy ? sortBy : "created_at"}>
                    <option value="created_at">Date</option>
                    <option value="votes">Votes</option>
                    <option value="comment_count">Comments</option>
                </select>
            </label>
            <label className="order">Order of articles:
                <select onChange={handleOrderChange} value={order ? order : "DESC"}>
                    <option value="DESC">Descending</option>
                    <option value="ASC">Ascending</option>
                </select>
            </label>
        <ul className="article-list">
            {articles.map((article) => {
                return <ArticleItem key={article.article_id} singleArticle={article}/>
            })}
        </ul>
    </>)
}

export default Articles