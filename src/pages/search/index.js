import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import BackButton from "@/components/back-button/index"
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

  const delLocal = () => {
    localStorage.removeItem('hs')
  }

  return (
    <>
      {/* Head */}
      <div className="header">网易云音乐</div>
      <BackButton />
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
      <div className='history-title'>
        <div>历史记录:</div>
        <div className={JSON.parse(localStorage.getItem('hs')) ? '' : 'hidden'} onClick={delLocal}>
          <svg t="1661451702396" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2484" width="20" height="20"><path d="M861.184 192.512q30.72 0 50.688 10.24t31.744 25.6 16.384 33.28 4.608 33.28q0 7.168-0.512 11.264t-0.512 7.168l0 6.144-67.584 0 0 537.6q0 20.48-8.192 39.424t-23.552 33.28-37.376 23.04-50.688 8.704l-456.704 0q-26.624 0-50.176-8.192t-40.448-23.04-26.624-35.84-9.728-47.616l0-527.36-63.488 0q-1.024-1.024-1.024-5.12-1.024-5.12-1.024-31.744 0-13.312 6.144-29.696t18.432-30.208 31.744-23.04 46.08-9.216l91.136 0 0-62.464q0-26.624 18.432-45.568t45.056-18.944l320.512 0q35.84 0 49.664 18.944t13.824 45.568l0 63.488q21.504 1.024 46.08 1.024l47.104 0zM384 192.512l320.512 0 0-64.512-320.512 0 0 64.512zM352.256 840.704q32.768 0 32.768-41.984l0-475.136-63.488 0 0 475.136q0 21.504 6.656 31.744t24.064 10.24zM545.792 839.68q17.408 0 23.552-9.728t6.144-31.232l0-475.136-63.488 0 0 475.136q0 40.96 33.792 40.96zM738.304 837.632q18.432 0 24.576-9.728t6.144-31.232l0-473.088-64.512 0 0 473.088q0 40.96 33.792 40.96z" p-id="2485" fill="#707070"></path></svg>
        </div>
      </div>
      <div className='history'>
        {JSON.parse(localStorage.getItem('hs')) ?
          JSON.parse(localStorage.getItem('hs')).map(item => <div className='history-item' onClick={() => goToAnswer(item)} key={uuid()}>{item}</div>) :
          <div className='history-tip'>暂无历史记录</div>
        }
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