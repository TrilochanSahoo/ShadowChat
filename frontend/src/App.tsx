
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Landing } from './components/Landing'
import { Room } from './components/Room'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>} ></Route>
      <Route path="/room" element={<Room/>} ></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
