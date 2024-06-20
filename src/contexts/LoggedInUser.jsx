import { createContext, useState } from "react";

export const LoggedInUserContext = createContext();

export const LoggedInUserProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState("jessjelly")
    
    return (<LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>{children}</LoggedInUserContext.Provider>)
}