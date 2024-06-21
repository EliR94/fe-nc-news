import { Link } from "react-router-dom"
import { patchArticleVotes } from "../api"
import { useState } from "react"

const ArticleItem = ({article_id, singleArticle, setSingleArticle}) => {
    const pathname = document.location.pathname
    const created = new Date(singleArticle.created_at)
    const formattedDate = `${created.getDate()}.${created.getMonth() + 1}.${created.getFullYear()}`
    const time = created.toTimeString()
    const formattedTime = time.slice(0, 5)

    const [err, setErr] = useState(null)

    const handleVoteIncrease = () => {
        setSingleArticle({...singleArticle, votes: singleArticle.votes += 1})
        setErr(null)
        patchArticleVotes(article_id, 1).catch((err) => {
            setSingleArticle({...singleArticle, votes: singleArticle.votes -= 1})
            setErr("please try again")
        })
    }
    const handleVoteDecrease = () => {
        setSingleArticle({...singleArticle, votes: singleArticle.votes -= 1})
        setErr(null)
        patchArticleVotes(article_id, -1).catch((err) => {
            setSingleArticle({...singleArticle, votes: singleArticle.votes += 1})
            setErr("please try again")
        })
    }

    return (<li className="article">
        <img className="article-img" src={singleArticle.article_img_url} alt={singleArticle.title}/>
        <h3 className="article-title">{singleArticle.title}</h3>
        <p className="article-info">By: {singleArticle.author} | Topic: {singleArticle.topic} <br /> Votes: {singleArticle.votes} | Total comments: {singleArticle.comment_count}</p>
        <p className="article-data">Posted: {formattedDate} {`(${formattedTime})`}</p> 
        <p className="article-body">{singleArticle.body}</p>
        {pathname !== `/${singleArticle.article_id}` ?
            <Link to={`/${singleArticle.article_id}`}>
                <button>Read the full article</button>
            </Link> : 
            <>
                <div className="vote-buttons">
                    <p className="article-votes">Votes: {singleArticle.votes}</p>
                    <button onClick={handleVoteIncrease} className="article-like-button">👍🏻</button>
                    <button onClick={handleVoteDecrease} className="article-dislike-button">👎🏻</button>
                    {err ? <p className="vote-err-msg">{err}</p> : null}
                </div>
            </>
        }
    </li>)
}

export default ArticleItem