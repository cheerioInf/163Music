import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SearchInput = ({ url }) => {
  const navigate = useNavigate()
  const [msg, setMsg] = useState('')
  const changeHandler = (e) => {
    setMsg(e.target.value)
  }

  const keyHandler = (e) => {
    if (e.keyCode === 13) {
      navigate(`/answer?keywords=${e.target.value}`)
    }
  }

  return (
    <div>
      <svg t="1661103888840" className="search-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2387" width="20" height="20"><path d="M882.030272 974.530557l-141.416183-141.416183a454.95573 454.95573 0 1 1 92.005007-92.005008l141.357915 141.474451a65.026972 65.026972 0 0 1-91.946739 91.94674zM142.902014 468.473882a325.134858 325.134858 0 1 0 325.134859-325.134858 325.134858 325.134858 0 0 0-325.076591 325.018322l-0.058268 0.116536z" p-id="2388" fill="#bfbfbf"></path></svg>
      <input
        value={msg}
        onChange={changeHandler}
        onKeyUp={keyHandler}
        className='search-input'
        type="text"
        placeholder='搜索'
        onClick={() => navigate(url)}
      />
    </div>
  )
}

export default SearchInput