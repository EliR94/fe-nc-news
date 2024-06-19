import { useEffect, useState } from "react"
import ArticleItem from "./ArticleItem"
import { getArticleById } from "../api"
import { useParams } from "react-router-dom"
import Comments from "./Comments"

const SingleArticle = () => {
    const { article_id } = useParams();
    const [singleArticle, setSingleArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setIsLoading(true)
        getArticleById(article_id).then((articleFromAPI)=>{
            setSingleArticle(articleFromAPI.data.article)
            setIsLoading(false)
        })
    }, [article_id])

    if(isLoading){
        return <p className="loading">Loading...</p>
    }
    return (<>
        <article  className="single-article" >
            <ArticleItem article_id={article_id} singleArticle={singleArticle} setSingleArticle={setSingleArticle}/>
        </article>
        <Comments article_id={article_id}/>
    </>)
}

export default SingleArticle