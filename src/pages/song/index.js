import React, { useEffect, useState } from "react"
import { useSearchParams, Link, useNavigate } from "react-router-dom"
import { v4 as uuid } from 'uuid'
import axios from "axios"
import BackButton from "@/components/back-button/index"
import './index.css'

function Song () {
  const navigate = useNavigate()

  // 获取歌曲id
  const [params] = useSearchParams()
  const songId = params.get('id')

  // 定义状态
  const [pic, setPic] = useState({})
  const [name, setName] = useState('')
  const [songMp3, setSongMp3] = useState('')
  const [related, setRelated] = useState([])
  const [comment, setComment] = useState([])
  const [level, setLevel] = useState('')
  const [pause, setPause] = useState('')
  const [lyric, setLyric] = useState('')
  const [afterLyric, setAfterLyric] = useState([])
  const [afterTime, setAfterTime] = useState([])
  const [currentTime, setCurrentTime] = useState('')
  const [offsetTop, setOffsetTop] = useState('')
  const [firstId, setFirstId] = useState('')

  // 获取标签
  const myMp3 = React.createRef()
  const pauseButton = React.createRef()
  const pauseIcon = React.createRef()
  const startIcon = React.createRef()
  const lycBox = React.createRef()
  const highLine = React.createRef()

  // 跳转歌曲页面
  const goToSong = (id) => {
    navigate(`/song?id=${id}`)
    window.location.reload()
  }

  // 设置暂停按钮
  const pauseMusic = () => {
    if (myMp3.current.paused === true) {
      myMp3.current.play()
      setPause(false)
      judgePause()
    } else {
      myMp3.current.pause()
      setPause(true)
      judgePause()
    }
  }

  // 获取歌词
  useEffect(() => {
    let box = document.querySelector('.lyc-box')
    box.scrollTop = 0
    setOffsetTop(0)
    const lineStrings = lyric.split("\n")
    const lycTime = lineStrings.map((item) => {
      let m = Number(item.substring(item.indexOf("[") + 1, item.indexOf("]")).split(':')[0])
      let s = Number(item.substring(item.indexOf("[") + 1, item.indexOf("]")).split(':')[1])
      let t = parseInt(m * 60 + s)
      return t
    })
    const lycContent = lineStrings.map((item) => {
      let content = item.substring(item.indexOf("]") + 1, item.length)
      return content
    })
    setAfterTime(lycTime)
    setAfterLyric(lycContent)
  }, [songId, songMp3, lyric])

  // 暂停
  const judgePause = () => {
    if (!pause) {
      pauseButton.current.className = "song-pic song-pic-pause"
      pauseIcon.current.className.baseVal = 'pause-button hidden'
      startIcon.current.className.baseVal = 'pause-button'
    } else {
      pauseButton.current.className = "song-pic song-pic-active"
      pauseIcon.current.className.baseVal = 'pause-button'
      startIcon.current.className.baseVal = 'pause-button hidden'
    }
  }

  // 网络请求
  useEffect(() => {
    const fetchData = async () => {
      const result1 = await axios(`http://121.40.19.111:3000/song/detail?ids=${songId}`)
      const result2 = await axios(`http://121.40.19.111:3000/simi/song?id=${songId}`)
      const result3 = await axios(`http://121.40.19.111:3000/comment/music?id=${songId}&limit=10`)
      const result4 = await axios(`http://121.40.19.111:3000/song/url?id=${songId}`)
      const result5 = await axios(`http://121.40.19.111:3000/lyric?id=${songId}`)
      setName(result1.data.songs[0].name)
      setPic(result1.data.songs[0].al.picUrl)
      setSongMp3(result1.data[0])
      setLevel(result1.data.songs[0].fee)
      setComment(result3.data.hotComments)
      setRelated(result2.data.songs)
      setSongMp3(result4.data.data[0].url)
      setLyric(result5.data.lrc.lyric)
      setFirstId(result2.data.songs[0].id)
    }
    fetchData()
  }, [songId])

  // 歌词滚动
  useEffect(() => {
    let top = document.querySelector('.lyc-high-light')
    let box = document.querySelector('.lyc-box')
    if (top) {
      setOffsetTop(top.offsetTop)
      if (offsetTop > 580) {
        let scrollFun = () => {
          if (box.scrollTop >= offsetTop - 510) {
            return
          } else {
            let speed = 15
            box.scrollTop += speed
            requestAnimationFrame(scrollFun)
          }
        }
        requestAnimationFrame(scrollFun)
      }
    }
  }, [currentTime, offsetTop])

  return (
    <>
      <div className="background" style={{ background: `url(${pic}) fixed center` }} >
        {/* 头部标题 */}
        <div className="header">
          <div className="song-header-name">{name}</div>
        </div>
        <BackButton />
        <div className="vague-song">
          <div className="title-name">
            <img alt="" className="title-avatar" src="http://p1.music.126.net/fL9ORyu0e777lppGU3D89A==/109951167206009876.jpg" />
            <div className="title-content">网易云音乐</div>
          </div>
          {/* 音源标签 */}
          <audio src={songMp3} autoPlay="autoplay" ref={myMp3}
            onTimeUpdate={() => {
              setCurrentTime(myMp3.current.currentTime)
            }}
            onEnded={() => {
              setPause(true)
              judgePause()
            }}
          ></audio>

          {/* 判断是否为vip歌曲 */}
          {level === 1 ? <div className="vip-tip">(为收费歌曲，仅播放试听片段)</div> : <div></div>}

          {/* 专辑封面以及暂停按钮 */}
          <div>
            <img src={pic} alt="" className="song-pic song-pic-active" ref={pauseButton} />
            <div className="album-back"></div>
            <svg t="1661247079915" onClick={pauseMusic} className="pause-button" ref={pauseIcon} viewBox="0 0 1032 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7304" width="15vw" height="15vw">
              <path d="M655.370377 266.246918a68.269549 68.269549 0 0 1 68.269549 68.269549v354.967066a68.269549 68.269549 0 1 1-136.539098 0v-354.967066a68.269549 68.269549 0 0 1 68.269549-68.269549z m-286.719136 0a68.269549 68.269549 0 0 1 68.269549 68.269549v354.967066a68.269549 68.269549 0 1 1-136.539098 0v-354.967066a68.269549 68.269549 0 0 1 68.269549-68.269549z" p-id="7305" fill="#ffffff"></path>
              <path d="M512 1024C229.236953 1024 0 794.784665 0 512 0 229.236953 229.236953 0 512 0c282.763047 0 512 229.236953 512 512 0 282.763047-229.215335 512-512 512z m0-27.303496c267.695322 0 484.696504-217.001182 484.696504-484.674886 0-267.71694-217.001182-484.718122-484.674886-484.718122-267.71694 0-484.718122 217.001182-484.718122 484.696504s217.001182 484.696504 484.696504 484.696504z" p-id="7306" fill="#ffffff"></path>
            </svg>
            <svg t="1661247079915" onClick={pauseMusic} className="pause-button hidden" ref={startIcon} viewBox="0 0 1032 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7304" width="15vw" height="15vw">
              <path d="M713.825367 560.856612l-300.273602 150.115183a54.606992 54.606992 0 0 1-79.035298-48.856612V361.884817a54.606992 54.606992 0 0 1 79.035298-48.856612l300.273602 150.136801a54.606992 54.606992 0 0 1 0 97.713224z" p-id="1398" fill="#ffffff"></path>
              <path d="M512 1024C229.236953 1024 0 794.784665 0 512 0 229.236953 229.236953 0 512 0c282.763047 0 512 229.236953 512 512 0 282.763047-229.215335 512-512 512z m0-27.303496c267.695322 0 484.696504-217.001182 484.696504-484.674886 0-267.71694-217.001182-484.718122-484.674886-484.718122-267.71694 0-484.718122 217.001182-484.718122 484.696504s217.001182 484.696504 484.696504 484.696504z" p-id="1399" fill="#ffffff"></path>
            </svg>
          </div>

          {/* 渲染歌词 */}
          <div className="lyc-box" ref={lycBox}>
            {afterTime.map((time, index) => {
              if (currentTime >= time && currentTime < afterTime[index + 1]) {
                return <div className="lyc-high-light" key={uuid()} ref={highLine} >
                  {afterLyric[index]}
                </div>
              } else {
                return <div className="lyc" key={uuid()}>
                  {afterLyric[index]}
                </div>
              }
            })}
          </div>

          <div className="more-tip">
            在网易云音乐查看更多歌词
          </div>

          <div className="share-tip">
            分享给微信好友
          </div>

          {/* 相关歌曲 */}
          <div className="alsoLike">
            {/* 头部标题以及一键收听 */}
            <div className="also-like-header">
              <div className="header-title">
                <svg t="1661414929851" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="892" width="30" height="30"><path d="M478.4 768.64a32 32 0 0 1 0-45.216l222.4-222.4-222.4-222.4a32 32 0 1 1 45.248-45.248L768.672 478.4a32 32 0 0 1 0 45.248L523.648 768.672a32 32 0 0 1-45.248 0z" fill="#ffffff" p-id="893"></path></svg>
                <span>喜欢这首歌的人也听</span>
              </div>
              {/* <Link to={`/song?id=${firstId}`} replace rel="preload" className="header-play"
              //  onClick={() => goToSong(related[0].id)}
              >一键收听</Link> */}
              <div className="header-play"
                onClick={() => goToSong(related[0].id)}
              >一键收听</div>
            </div>
            {/* 如果为空，则暂无推荐
            {related.length === 0 ? <div className="related-none">暂无推荐</div> :
              // 不为空，渲染歌曲列表
              <div className="also-like-list">
                {related.map(song => (
                  // <Link to={`/song?id=${song.id}`} replace className="related-song" key={song.id}>
                  //   <img src={song.album.picUrl} alt="" className="related-pic" />
                  //   <div className="related-msg">
                  //     <div className="related-song-name">{song.name}</div>
                  //     <div className="related-song-creator">
                  //       {song.artists.map(creator => creator.name).join('/')}-{song.album.name}
                  //     </div>
                  //   </div>
                  //   <div className="play">
                  //     <svg t="1661075426221" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8960" width="40" height="40"><path d="M435.2 665.6V358.4l256 153.6z" p-id="8961" fill="#cdcdcd"></path><path d="M512 204.8c168.96 0 307.2 138.24 307.2 307.2s-138.24 307.2-307.2 307.2-307.2-138.24-307.2-307.2 138.24-307.2 307.2-307.2m0-51.2c-199.68 0-358.4 158.72-358.4 358.4s158.72 358.4 358.4 358.4 358.4-158.72 358.4-358.4-158.72-358.4-358.4-358.4z" p-id="8962" fill="#cdcdcd"></path></svg>
                  //   </div>
                  // </Link>
                  <div className="related-song" key={song.id} onClick={goToSong(song.id)}>
                    <img src={song.album.picUrl} alt="" className="related-pic" />
                    <div className="related-msg">
                      <div className="related-song-name">{song.name}</div>
                      <div className="related-song-creator">
                        {song.artists.map(creator => creator.name).join('/')}-{song.album.name}
                      </div>
                    </div>
                    <div className="play">
                      <svg t="1661075426221" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8960" width="40" height="40"><path d="M435.2 665.6V358.4l256 153.6z" p-id="8961" fill="#cdcdcd"></path><path d="M512 204.8c168.96 0 307.2 138.24 307.2 307.2s-138.24 307.2-307.2 307.2-307.2-138.24-307.2-307.2 138.24-307.2 307.2-307.2m0-51.2c-199.68 0-358.4 158.72-358.4 358.4s158.72 358.4 358.4 358.4 358.4-158.72 358.4-358.4-158.72-358.4-358.4-358.4z" p-id="8962" fill="#cdcdcd"></path></svg>
                    </div>
                  </div>
                ))}
              </div>
            } */}
            {related.length === 0 ? <div className="related-none">暂无推荐</div> :
              // 不为空，渲染歌曲列表
              <div className="also-like-list">
                {related.map(song => (
                  <div className="related-song" key={song.id} onClick={() => {
                    goToSong(song.id)
                  }}>
                    <img src={song.album.picUrl} alt="" className="related-pic" />
                    <div className="related-msg">
                      <div className="related-song-name">{song.name}</div>
                      <div className="related-song-creator">
                        {song.artists.map(creator => creator.name).join('/')}-{song.album.name}
                      </div>
                    </div>
                    <div className="play">
                      <svg t="1661075426221" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8960" width="40" height="40"><path d="M435.2 665.6V358.4l256 153.6z" p-id="8961" fill="#cdcdcd"></path><path d="M512 204.8c168.96 0 307.2 138.24 307.2 307.2s-138.24 307.2-307.2 307.2-307.2-138.24-307.2-307.2 138.24-307.2 307.2-307.2m0-51.2c-199.68 0-358.4 158.72-358.4 358.4s158.72 358.4 358.4 358.4 358.4-158.72 358.4-358.4-158.72-358.4-358.4-358.4z" p-id="8962" fill="#cdcdcd"></path></svg>
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>

          {/* 相关评论 */}
          <div className="comment">
            {/* 头部标题 */}
            <div className="header-title">
              <svg t="1661414929851" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="892" width="30" height="30"><path d="M478.4 768.64a32 32 0 0 1 0-45.216l222.4-222.4-222.4-222.4a32 32 0 1 1 45.248-45.248L768.672 478.4a32 32 0 0 1 0 45.248L523.648 768.672a32 32 0 0 1-45.248 0z" fill="#ffffff" p-id="893"></path></svg>
              精彩评论
            </div>
            {/* 如果为空，则暂无评论 */}
            {comment.length === 0 ? <div className="related-none">暂无评论</div> :
              // 不为空，渲染评论列表
              <div className="comment-list">
                {console.log(comment)}
                {comment.map(comment => (
                  <div key={comment.commentId}>
                    <div className="adm-msg">
                      <div className="adm">
                        <img src={comment.user.avatarUrl} alt="" className="comment-pic" />
                        <div className="adm-all">
                          <div className="adm-name">
                            <div className="nickname">{comment.user.nickname}</div>
                            {comment.user.vipType ? <div className="black-vip"> 黑胶会员 </div> : null}
                          </div>
                          <div className="adm-time">{comment.timeStr}</div>
                        </div>
                      </div>
                      <div className="adm-like">
                        {comment.likedCount}
                        <svg t="1661174294436" className="like-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2457" width="20" height="20"><path d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z" p-id="2458" fill="rgb(200, 200, 200)"></path></svg>
                      </div>
                    </div>
                    <div className="comment-msg">
                      {comment.content}
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>
          <div className="comment-tip">下载网易云音乐查看更多精彩评论</div>
        </div>
      </div>
    </>
  )
}

export default Song