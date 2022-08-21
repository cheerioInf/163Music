import { useSearchParams } from "react-router-dom"
import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './index.css'
import { v4 as uuid } from 'uuid'

function Answer () {
  const navigate = useNavigate()

  const [params] = useSearchParams()
  const keywords = params.get('keywords')

  const [data, setData] = useState([])
  const [msg, setMsg] = useState('')
  const [list, setList] = useState([])

  const Highlight = ({ text, keyword }) => text.split(keyword).flatMap((str) => [<span className="highlight" key={uuid()}>{keyword}</span>, str]).slice(1)

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
        `http://121.40.19.111:3000/search?keywords=${keywords}`,
      )
      setData(result.data)
      setList(result.data.result.songs)
    }
    fetchData()
  }, [keywords])

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
      {console.log(list)}
      {
        list.map((song, index) => (
          <div className="list-single-song" key={index} >
            <div className="rank">{list.indexOf(song) + 1}</div>
            <div className="song-inf">
              <div className="song-name"><Highlight text={song.name} keyword={keywords} /></div>
              <div className="song-creator">
                <span className={song.sq ? 'song-level-logo' : 'hidden'}>SQ</span>
                <Highlight text={song.artists.map(creator => creator.name).join('/')} keyword={keywords} />
                -{song.album.name}
              </div>
            </div>
            <div className="play">
              <svg t="1661075426221" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8960" width="40" height="40"><path d="M435.2 665.6V358.4l256 153.6z" p-id="8961" fill="#cdcdcd"></path><path d="M512 204.8c168.96 0 307.2 138.24 307.2 307.2s-138.24 307.2-307.2 307.2-307.2-138.24-307.2-307.2 138.24-307.2 307.2-307.2m0-51.2c-199.68 0-358.4 158.72-358.4 358.4s158.72 358.4 358.4 358.4 358.4-158.72 358.4-358.4-158.72-358.4-358.4-358.4z" p-id="8962" fill="#cdcdcd"></path></svg>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default Answer