import { Link } from "react-router-dom"

const ArticleItem = ({article}) => {
    const pathname = document.location.pathname
    const created = new Date(article.created_at)
    const formattedDate = `${created.getDate()}.${created.getMonth()}.${created.getFullYear()}`
    const time = created.toTimeString()
    const formattedTime = time.slice(0, 5)
    return (<li className="article">
        <img className="article-img" src={article.article_img_url} alt={article.title}/>
        <h3 className="article-title">{article.title}</h3>
        <p className="article-info">By: {article.author} | Topic: {article.topic}</p>
        <p className="article-data">Created: {formattedDate} {`(${formattedTime})`} | Votes: {article.votes}</p> 
        {pathname === "/" ?
            <Link to={`/${article.article_id}`}>
                <button>Read the full article</button>
            </Link> : 
            <><p className="article-body">{article.body}</p></>}
    </li>)
}

export default ArticleItem