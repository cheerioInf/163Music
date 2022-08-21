import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import './index.css'

function Search () {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [msg, setMsg] = useState('')

  const changeHandler = (e) => {
    setMsg(e.target.value)
  }

  const keyHandler = (e) => {
    if (e.keyCode === 13) {
      navigate(`/answer?keywords=${e.target.value}`)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://121.40.19.111:3000/search/hot/detail',
      )
      setData(result.data.data)
    }
    fetchData()
  }, [])

  return (
    <>
      {/* Head */}
      <div className="header">网易云音乐</div>
      {/* 搜索 */}
      <div>
        <input
          value={msg}
          onChange={changeHandler}
          onKeyUp={keyHandler}
          className='search-input'
          type="text"
          placeholder='搜索' />
      </div>
      <div className='list-title'>热搜榜</div>
      {console.log(data)}
      {
        Array.from(data).map(item => (
          <div className='list-rank' key={uuid()}>
            <div className={data.indexOf(item) < 3 ? 'rank-red' : 'rank'}>{data.indexOf(item) + 1}</div>
            <div className='rank-msg'>
              <div className={item.content === '' ? 'search-title-large' : 'search-title'}>{item.searchWord}{item.iconType === 1 ? <span className='hot'>HOT</span> : ''}</div>
              <div className={item.content === '' ? 'hidden' : 'search-msg'}>{item.content}</div>
            </div>
            <div className='score-num'>{item.score}</div>
          </div>
        ))
      }
    </>
  )
}

export default Search