import { useContext, useState } from "react"
import { LoggedInUserContext } from '../contexts/LoggedInUser'
import Comments from "./Comments"
import { postComment } from "../api"

const CommentForm = ({setNewComments, article_id}) => {
    const [err, setErr] = useState(null)
    const {loggedInUser, setLoggedInUser} = useContext(LoggedInUserContext)
    const [commentInput, setCommentInput] = useState("")
    const handleNewComment = (event) => {
        event.preventDefault()
        setErr(null)
        setNewComments((currNewComments) => 
            [...currNewComments, {key: currNewComments.length+1, body: commentInput, author: loggedInUser, created_at: new Date()} ]    
        )
        setCommentInput("")
        postComment(article_id, loggedInUser, commentInput)
        .catch((err)=> {
            setNewComments([])
            setErr("please try again")
        })
    }
    const handleCommentInputChange = (event) => {
        setCommentInput(event.target.value)
    }
    return (<>
        <form onSubmit={handleNewComment}>
            <label>
                <input className="comment-input" onChange={handleCommentInputChange} type="text" value={commentInput} placeholder="new comment..." required/>
            </label>
            <button>Add Comment</button>
            {err ? <p className="new-comment-err-msg">{err}</p> : null}
        </form>
    </>)
}

export default CommentForm