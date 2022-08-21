import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import './index.css'
import axios from 'axios'

function Home () {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  const goToSongList = (id) => {
    navigate(`/list?id=${id}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://121.40.19.111:3000/toplist/detail',
      )
      setData(result.data.list)
    }
    fetchData()
  }, [])

  return (
    <>
      {/* Head */}
      <div className="header">网易云音乐</div>
      {/* 搜索 */}
      <div>
        <input className='search-input' type="text" placeholder='搜索' onClick={() => navigate('/search')} />
      </div>
      {/* 榜单列表 */}
      {console.log(data)}
      <div>
        {
          Array.from(data).slice(0, 4).map(item => (
            <div className='song-list' key={item.id} onClick={() => goToSongList(item.id)}>
              <img className='song-list-img' src={item.coverImgUrl} alt='' />
              <div className='up-date'>{item.updateFrequency}</div>
              <div className='list-more'>
                <ol className='songs'>
                  {
                    Array.from(item.tracks).map(song => (
                      <li key={uuid()} className='singleSong'>{song.first}-{song.second}</li>
                    ))
                  }
                </ol>
              </div>
            </div>
          ))
        }
      </div>
      <div className='footer'>点击了解<a href="https://baidu.com">《隐私保护指引》</a></div>
    </>
  )
}

export default Home