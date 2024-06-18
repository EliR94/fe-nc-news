import { useEffect, useState } from "react"
import ArticleItem from "./ArticleItem"
import { getArticleById } from "../api"
import { useParams } from "react-router-dom"

const SingleArticle = () => {
    const { article_id } = useParams();
    const [singleArticle, setSingleArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        getArticleById(article_id).then((articleFromAPI)=>{
            setSingleArticle(articleFromAPI.data.article)
            setIsLoading(false)
        })
    }, [])

    if(isLoading){
        return <p className="loading">Loading...</p>
    }
    return (<article  className="single-article" >
        <ArticleItem key={singleArticle.article_id} article={singleArticle}/>
        
    </article>)
}

export default SingleArticle