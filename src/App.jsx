import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from "../src/components/Header"
import NavBar from './components/NavBar'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'

function App() {
  return (
    <div className='app'>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Articles />}></Route>
        <Route path="/articles/:topic" element={<Articles />}></Route>
        <Route path="/:article_id" element={<SingleArticle />}></Route>
      </Routes>
    </div>
  )
}

export default App
