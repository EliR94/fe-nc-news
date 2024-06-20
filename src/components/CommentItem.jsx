import { useContext, useState } from 'react'
import { LoggedInUserContext } from '../contexts/LoggedInUser'
import { deleteComment } from '../api'

const CommentItem = ({comment, setComments, isPosting}) => {
    const [err, setErr] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const {loggedInUser, setLoggedInUser} = useContext(LoggedInUserContext)
    const created = new Date(comment.created_at)
    const formattedDate = `${created.getDate()}.${created.getMonth() + 1}.${created.getFullYear()}`
    const time = created.toTimeString()
    const formattedTime = time.slice(0, 5)
    const formattedCreatedAt = formattedDate + " " + formattedTime
    const handleDelete = (comment_id) => {
        setIsDeleting(true)
        setErr(null)
        deleteComment(comment_id)
        .then((response) => {
            setComments((currComments)=> currComments.filter(comment => comment.comment_id !== comment_id))
            setIsDeleting(false)
        })
        .catch((err) => {
            setErr("delete unsuccessful, please try again")
        })
    }
    return (
        <li className="comment">
            <h3 className="comment-author">{comment.author}:</h3>
            <p className="comment-created">{comment.created_at === undefined ? "Posting..." : formattedCreatedAt}</p>
            <p className="comment-body">{comment.body}</p>
            {comment.author === loggedInUser ? <button className='comment-delete-button' onClick={() => handleDelete(comment.comment_id, comment.key)} disabled={isDeleting ? true : false}>Delete</button> : null}
            {err ? <p className="delete-comment-err-msg">{err}</p> : null}
        </li>
    )
}

export default CommentItem