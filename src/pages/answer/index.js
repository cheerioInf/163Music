import { useSearchParams, useNavigate } from "react-router-dom"
import { React, useEffect, useState } from 'react'
import axios from 'axios'
import './index.css'
import SearchInput from '@/components/search-input/index'
import BackButton from "@/components/back-button/index"
import { v4 as uuid } from 'uuid'

function Answer () {
  const navigate = useNavigate()

  // 获取关键词
  const [params] = useSearchParams()
  const keywords = params.get('keywords')

  // 定义状态
  const [list, setList] = useState([])

  // 跳转歌曲界面
  const goToSong = (id) => {
    navigate(`/song?id=${id}`)
  }

  // 批注高光
  const Highlight = ({ text, keyword }) => text.split(keyword).flatMap((str) => [<span className="highlight" key={uuid()}>{keyword}</span>, str]).slice(1)

  // 网络请求
  useEffect(() => {
    const fetchData = async () => {
      const result1 = await axios(
        `http://121.40.19.111:3000/search?keywords=${keywords}`,
      )
      // const result2 = await axios(
      //   `http://121.40.19.111:3000/song/detail?ids=347230`
      // )
      setList(result1.data.result.songs)
    }
    fetchData()
  }, [keywords])

  return (
    <>
      {/* Head */}
      <div className="header">网易云音乐</div>
      <BackButton />
      {/* 搜索 */}
      <SearchInput url={`/answer?keywords=${keywords}`} />
      {
        list.map((song, index) => (
          <div className="list-single-song" key={index} onClick={() => goToSong(song.id)}>
            <div className="rank">{list.indexOf(song) + 1}</div>
            {console.log(song)}
            <div className="song-inf">
              <div className="song-name"><Highlight text={song.name} keyword={keywords} /></div>
              <div className="song-creator">
                <span className={song.fee === 1 ? 'song-level-logo' : 'hidden'}>VIP</span>
                <Highlight text={song.artists.map(creator => creator.name).join('/')} keyword={keywords} />
                -
                <Highlight text={song.album.name} keyword={keywords} />
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