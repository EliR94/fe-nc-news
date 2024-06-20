import { useContext } from "react"
import { LoggedInUserContext } from '../contexts/LoggedInUser'

const Header = () => {
    const {loggedInUser, setLoggedInUser} = useContext(LoggedInUserContext)
    return (
        <header className="header">
            <h1 className="header-title">NC News</h1>
            <p className="header-username">Username: {loggedInUser}</p>
        </header>
    )
}

export default Header