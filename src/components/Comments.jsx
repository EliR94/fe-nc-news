import { useEffect, useState } from "react"
import { getComments } from "../api";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const Comments = ({article_id}) => {
    const [comments, setComments] = useState([])
    const [newComments, setNewComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getComments(article_id).then((commentsFromAPI) => {
            setComments(commentsFromAPI.data.comments)
            setIsLoading(false)
        })
        setNewComments([])
    }, [article_id])
    if(isLoading){
        return <p className="loading">Loading...</p>
    }
    return (<>
        <ul className="comment-list">
            <h2>Comments</h2>
            <CommentForm article_id={article_id} setNewComments={setNewComments}/>
            {newComments.map((newComment) => {
                return <CommentItem key={newComment.key} comment={newComment}/>
            })}
            {comments.map((comment) => {
                return <CommentItem key={comment.comment_id} comment={comment}/>
            })}
        </ul>
    </>)
}

export default Comments