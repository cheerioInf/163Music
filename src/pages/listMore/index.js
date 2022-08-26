import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import BackButton from "@/components/back-button/index"
import './index.css'

function ListMore () {
  const [params] = useSearchParams()
  const id = params.get('id')

  const [data, setData] = useState({})
  const [pic, setPic] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://121.40.19.111:3000/playlist/detail?id=${id}`,
      )
      setData(result.data.playlist)
      setPic(result.data.playlist.coverImgUrl)
    }
    fetchData()
  })

  return (
    <div className="background" style={{ background: `url(${pic}) center fixed` }}>
      {/* {console.log(data)} */}
      <div className="vague-list">
        <div className="contain">
          <div className="header" >歌单</div >
          <BackButton />
          <img className="list-more-img" src={pic} alt="" />
          <div className="list-more-name">{data.name}</div>
          <div className="list-more-des">{data.description}</div>
        </div>
      </div>
    </div>
  )
}

export default ListMore