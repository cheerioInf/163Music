import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/home/index'
import Search from '@/pages/search/index'
import List from '@/pages/list/index'
import Answer from '@/pages/answer/index'

function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/list' element={<List />}></Route>
          <Route path='/answer' element={<Answer />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
