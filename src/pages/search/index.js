import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import './index.css'

function Search () {
  const navigate = useNavigate()

  // 设置状态
  const [data, setData] = useState([])
  const [msg, setMsg] = useState('')

  // 获取标签
  const searchInput = React.createRef()

  // 受控input
  const changeHandler = (e) => {
    setMsg(e.target.value)
  }

  // 回车键搜索跳转
  const keyHandler = (e) => {
    if (e.keyCode === 13) {
      navigate(`/answer?keywords=${e.target.value}`)
    }
  }

  // 热搜点击跳转
  const goToAnswer = (content) => {
    navigate(`/answer?keywords=${content}`)
  }

  // 网络请求
  useEffect(() => {
    searchInput.current.focus()
    const fetchData = async () => {
      const result = await axios(
        'http://121.40.19.111:3000/search/hot/detail',
      )
      setData(result.data.data)
    }
    fetchData()
  }, [searchInput])

  return (
    <>
      {/* Head */}
      <div className="header">网易云音乐</div>
      {/* 搜索栏 */}
      <div>
        <svg t="1661103888840" className="search-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2387" width="20" height="20"><path d="M882.030272 974.530557l-141.416183-141.416183a454.95573 454.95573 0 1 1 92.005007-92.005008l141.357915 141.474451a65.026972 65.026972 0 0 1-91.946739 91.94674zM142.902014 468.473882a325.134858 325.134858 0 1 0 325.134859-325.134858 325.134858 325.134858 0 0 0-325.076591 325.018322l-0.058268 0.116536z" p-id="2388" fill="#bfbfbf"></path></svg>
        <input
          value={msg}
          ref={searchInput}
          onChange={changeHandler}
          onKeyUp={keyHandler}
          className='search-input'
          type="text"
          placeholder='搜索' />
      </div>
      {/* 热搜榜 */}
      <div className='list-title'>热搜榜</div>
      {
        // 渲染热搜
        Array.from(data).map(item => (
          <div className='list-rank' key={uuid()} onClick={() => goToAnswer(item.searchWord)}>
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