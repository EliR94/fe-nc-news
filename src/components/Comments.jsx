import { useEffect, useState } from "react"
import { getComments } from "../api";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const Comments = ({article_id}) => {
    const [comments, setComments] = useState([])
    const [isPosting, setIsPosting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getComments(article_id).then((commentsFromAPI) => {
            setComments(commentsFromAPI.data.comments)
            setIsLoading(false)
        })
    }, [article_id])
    if(isLoading){
        return <p className="loading">Loading...</p>
    }
    return (<>
        <ul className="comment-list">
            <h2>Comments</h2>
            <CommentForm article_id={article_id} isPosting={isPosting} setIsPosting={setIsPosting} setComments={setComments} comments={comments}/>
            {isPosting ? <p className="posting-msg">Posting...</p> : null}
            {comments.map((comment) => {
                return <CommentItem key={comment.comment_id} comment={comment} setComments={setComments} isPosting={isPosting}/>
            })}
        </ul>
    </>)
}

export default Comments