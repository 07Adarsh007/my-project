import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
