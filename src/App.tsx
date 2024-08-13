import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import { Main } from './pages/Main/Main.tsx'
import { Login } from './pages/Login.tsx'
import { Navbar } from './components/Navbar.tsx'
import { CreatePost } from './pages/CreatePost/CreatePost.tsx'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
