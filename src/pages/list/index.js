import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import './index.css'

function List () {
  const [params] = useSearchParams()
  const id = params.get('id')
  const [data, setData] = useState({})
  const [adm, setAdm] = useState({})
  const [list, setList] = useState([])

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
    <div className="list-background"
    // style={{
    //   backgroundImage: `url(${data.coverImgUrl})`,
    // }}
    >
      {console.log(data)}
      <div className="header" > 歌单</div >
      <div className="all-msg">
        <img src={data.coverImgUrl} alt="" className="list-img" />
        <div className="list-inf">
          <div className="list-title-small">{data.name}</div>
          <div className="adm">
            <img src={adm.avatarUrl} alt="" className="adm-avatar" />
            <div className="adm-name">{adm.nickname}</div>
          </div>
          <div className="list-intro">{data.description}</div>
        </div>
      </div>
      <div className="list-songs">
        <div className="play-all">
          <div className="play-logo">
            <svg t="1661075426221" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8960" width="40" height="40"><path d="M435.2 665.6V358.4l256 153.6z" p-id="8961" fill="#707070"></path><path d="M512 204.8c168.96 0 307.2 138.24 307.2 307.2s-138.24 307.2-307.2 307.2-307.2-138.24-307.2-307.2 138.24-307.2 307.2-307.2m0-51.2c-199.68 0-358.4 158.72-358.4 358.4s158.72 358.4 358.4 358.4 358.4-158.72 358.4-358.4-158.72-358.4-358.4-358.4z" p-id="8962" fill="#707070"></path></svg>
          </div>
          <div className="play-all-text">播放全部</div>
          <div className="songs-num">(共{list.length}首)</div>
        </div>
        {
          list.map(song => (
            <div className="list-single-song" key={song.id}>
              <div className="rank">{list.indexOf(song) + 1}</div>
              <div className="song-inf">
                <div className="song-name">{song.name}</div>
                <div className="song-creator">
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
    </div >
  )
}

export default List