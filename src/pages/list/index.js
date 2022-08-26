import { useSearchParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import './index.css'
import BackButton from "@/components/back-button/index"

function List () {
  const navigate = useNavigate()

  // 获取id
  const [params] = useSearchParams()
  const id = params.get('id')

  // 定义状态
  const [data, setData] = useState({})
  const [adm, setAdm] = useState({})
  const [list, setList] = useState([])

  // 跳转歌曲界面
  const goToSong = (id) => {
    navigate(`/song?id=${id}`)
    window.location.reload()
  }

  // 跳转歌单详细
  const goToMore = (id) => {
    navigate(`/listMore?id=${id}`)
  }

  // 网络请求
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://121.40.19.111:3000/playlist/detail?id=${id}`,
      )
      setData(result.data.playlist)
      setAdm(result.data.playlist.creator)
      setList(result.data.playlist.tracks)
    }
    fetchData()
  }, [id])

  return (
    <>
      <div className="background" style={{ background: `url(${data.coverImgUrl}) center fixed`, border: 'none' }}>
        <div className="header" > 歌单</div >
        <div className="vague-list">
          {/* 歌单信息 */}
          {console.log(data)}
          <div className="all-msg">
            <img src={data.coverImgUrl} alt="" className="list-img" />
            <div className="play-count">
              <svg t="1661512897415" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2427" width="20" height="20"><path d="M374.6 636.5c4.4 0 8.5-1.2 12.1-3.3l171.7-100c8-3.6 13.6-11.9 13.6-21.5 0-8.8-4.8-16.6-11.9-20.7l-167.8-97.8c-4.3-5-10.7-8.1-17.7-8.1-13.1 0-23.6 10.7-23.6 23.8v1.3l-0.3 0.2 0.4 199.8c-0.1 0.8-0.1 1.6-0.1 2.5 0 13.2 10.6 23.8 23.6 23.8z" fill="#ffffff" p-id="2428"></path><path d="M64.7 586.3a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" fill="#ffffff" p-id="2429"></path><path d="M960 398.3c0.1-1.6 0.2-3.2 0.2-4.8 0-35-28.5-63.3-63.6-63.3-11.7 0-22.7 3.2-32.2 8.7l-0.5-0.3-31.5 18.2v-64.7c-0.1-73.1-59.9-133-133.1-133H197.4c-73.1 0-133 59.8-133 133v165.8h0.2c0 17.7 14.4 32.1 32.2 32.1s32.2-14.4 32.2-32.1h0.2V287c0-35.2 28.8-64 64-64h510.2c35.2 0 64 28.8 64 64v448.9c0 35.2-28.8 64-64 64H193.3c-35.2 0-64-28.8-64-64v-21.4c0-17.7-14.4-32.1-32.2-32.1-17.8 0-32.2 14.4-32.2 32.1h-0.4v15.3c0 73.2 59.9 133 133 133h501.9c73.2 0 133-59.8 133-133v-64.1l33.1 19.1 0.1-0.1c9.2 5.1 19.8 8 31 8 35.1 0 63.6-28.4 63.6-63.3 0-1.6-0.1-3.2-0.2-4.8V398.3z m-63.6 205.1c-0.3 7.8-6.9 14.1-15 14.1-2.7 0-5.3-0.7-7.5-2l-41.5-23.7V430.1l40.9-23.2c2.3-1.5 5.1-2.3 8.1-2.3 8.3 0 15 6.6 15 14.6v184.2z" fill="#ffffff" p-id="2430"></path></svg>
              {(data.playCount / 100000000).toFixed(2)}
              <div>亿</div>
            </div>
            <div className="list-inf" onClick={() => goToMore(id)}>
              <div className="list-title-small">{data.name}</div>
              <div className="adm">
                <img src={adm.avatarUrl} alt="" className="adm-avatar" />
                <div className="adm-name">{adm.nickname}</div>
              </div>
              <div className="list-intro">{data.description}</div>
              <div>(Click and check more)</div>
            </div>
          </div>
          {/* 歌单列表 */}
          <div className="list-songs">
            {/* 播放全部 */}
            <div className="play-all" onClick={() => goToSong(list[0].id)}>
              <div className="play-logo">
                <svg t="1661075426221" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8960" width="40" height="40"><path d="M435.2 665.6V358.4l256 153.6z" p-id="8961" fill="#707070"></path><path d="M512 204.8c168.96 0 307.2 138.24 307.2 307.2s-138.24 307.2-307.2 307.2-307.2-138.24-307.2-307.2 138.24-307.2 307.2-307.2m0-51.2c-199.68 0-358.4 158.72-358.4 358.4s158.72 358.4 358.4 358.4 358.4-158.72 358.4-358.4-158.72-358.4-358.4-358.4z" p-id="8962" fill="#707070"></path></svg>
              </div>
              <div className="play-all-text">播放全部</div>
              <div className="songs-num">(共{list.length}首)</div>
            </div>
            {/* 列表 */}
            {
              list.map(song => (
                <div className="list-single-song" key={song.id} onClick={() => goToSong(song.id)}>
                  <div className="rank">{list.indexOf(song) + 1}</div>
                  <div className="song-inf">
                    <div className="song-name">{song.name}</div>
                    <div className="song-creator">
                      <span className={song.fee === 1 ? 'song-level-logo' : 'hidden'}>VIP</span>
                      <span className={song.sq ? 'song-level-logo' : 'hidden'}>SQ</span>
                      {song.ar.map(creator => (creator.name)).join('/')}-{song.al.name}
                    </div>
                  </div>
                  <div className="play">
                    <svg t="1661075426221" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8960" width="40" height="40"><path d="M435.2 665.6V358.4l256 153.6z" p-id="8961" fill="#cdcdcd"></path><path d="M512 204.8c168.96 0 307.2 138.24 307.2 307.2s-138.24 307.2-307.2 307.2-307.2-138.24-307.2-307.2 138.24-307.2 307.2-307.2m0-51.2c-199.68 0-358.4 158.72-358.4 358.4s158.72 358.4 358.4 358.4 358.4-158.72 358.4-358.4-158.72-358.4-358.4-358.4z" p-id="8962" fill="#cdcdcd"></path></svg>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <BackButton />
      </div>
    </ >
  )
}

export default List