import { useContext, useState } from "react"
import { LoggedInUserContext } from '../contexts/LoggedInUser'
import { postComment } from "../api"

const CommentForm = ({comments, setComments, article_id, setIsPosting, isPosting}) => {
    const [err, setErr] = useState(null)
    const {loggedInUser, setLoggedInUser} = useContext(LoggedInUserContext)
    const [commentInput, setCommentInput] = useState("")
    const handleNewComment = (event) => {
        setIsPosting(true)
        event.preventDefault()
        setErr(null)
        setCommentInput("")
        postComment(article_id, loggedInUser, commentInput)
        .then(({data}) => {
            const postedComment = data.comment
            setComments((currComments) => [postedComment, ...currComments])
            setIsPosting(false)
        })
        .catch((err)=> {
            console.log(err)
            setIsPosting(false)
            setErr("please try again")
        })
    }
    const handleCommentInputChange = (event) => {
        setCommentInput(event.target.value)
        setErr(false)
    }
    return (<>
        <form onSubmit={handleNewComment}>
            <label>
                <input className="comment-input" onChange={handleCommentInputChange} type="text" value={commentInput} placeholder="new comment..." required/>
            </label>
            <button disabled={isPosting ? true : false}>{isPosting ? "Posting" : "Submit"}</button>
            {err ? <p className="new-comment-err-msg">{err}</p> : null}
        </form>
    </>)
}

export default CommentForm