const CommentItem = ({comment}) => {
    const created = new Date(comment.created_at)
    const formattedDate = `${created.getDate()}.${created.getMonth() + 1}.${created.getFullYear()}`
    const time = created.toTimeString()
    const formattedTime = time.slice(0, 5)
    return (
        <li className="comment">
            <h3 className="comment-author">{comment.author}:</h3>
            <p className="comment-created">{formattedDate} {`(${formattedTime})`}</p>
            <p className="comment-body">{comment.body}</p>
        </li>
    )
}

export default CommentItem