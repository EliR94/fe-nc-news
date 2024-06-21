import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getTopics } from "../api"


const NavBar = () => {
    const [topics, setTopics] = useState([])

    useEffect(()=>{
        getTopics().then((topicsFromApi) => {
            setTopics(topicsFromApi.data.topics)
        })
    }, [])

    return (
        <nav className="nav">
            <Link to="/" className="nav-item">Home</Link>
            {topics.map((topic) => <Link to={`/articles/${topic.slug}`} key={topic.slug} className={"nav-item" } >{topic.slug.slice(0, 1).toUpperCase() + topic.slug.slice(1, )}</Link>)}
        </nav>
    )
}

export default NavBar