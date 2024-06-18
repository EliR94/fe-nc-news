import { useEffect, useState } from "react"
import { getComments } from "../api";
import CommentItem from "./CommentItem";

const Comments = ({article_id}) => {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getComments(article_id).then((commentsFromAPI) => {
            setComments(commentsFromAPI.data.comments)
            setIsLoading(false)
        })
    }, [])

    if(isLoading){
        return <p className="loading">Loading...</p>
    }
    return <ul className="comment-list">
        <h2>Comments</h2>
        {comments.map((comment) => {
            return <CommentItem key={comment.comment_id} comment={comment}/>
        })}
    </ul>
}

export default Comments