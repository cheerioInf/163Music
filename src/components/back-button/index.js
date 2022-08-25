import { useNavigate } from "react-router-dom"
import './index.css'

function BackButton () {
  const navigate = useNavigate()

  const goBackPage = () => {
    window.history.back()
  }

  const goToHome = () => {
    navigate('/')
  }

  return (
    <div className='button'>
      <div className='back-button' onClick={goBackPage}>
        <svg t="1661420653104" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2345" width="25" height="25"><path d="M622.650611 284.901749 447.745069 284.901749 447.745069 142.823869 63.980685 334.705038l383.76336 191.882192L447.744046 384.834762l189.391465 0c149.914358 0 224.855164 62.789045 224.855164 188.368158 0 129.928165-77.435627 194.876386-232.338602 194.876386L187.952184 768.079306l0 99.93199L634.146433 868.011296c211.184817 0 316.777737-95.104031 316.777737-285.311071C950.924169 384.178823 841.510224 284.901749 622.650611 284.901749z" p-id="2346" fill="#8a8a8a"></path></svg>
      </div>
      <div className='home-button' onClick={goToHome}>
        <svg t="1661420769263" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2943" width="20" height="20"><path d="M1024 438.857143L512 0 0 438.857143h82.651429v512a73.142857 73.142857 0 0 0 73.142857 73.142857h219.428571V585.142857h292.571429v438.857143h219.428571a73.142857 73.142857 0 0 0 73.142857-73.142857V438.857143z" p-id="2944" fill="#8a8a8a"></path></svg>
      </div>
    </div>
  )
}

export default BackButton