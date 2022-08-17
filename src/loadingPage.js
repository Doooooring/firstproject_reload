import minjae from './minjaeremoved.png'
import './loadingPage.css'

export default function LoadingPage() {
  return (
    <div className="loading-container">
      <img
        src={minjae}
        height="300px"
        width="300px"
        className="minjaeloading"
      ></img>
      <br></br>
      <span className="dataloading">데이터를 받아오는 중</span>
      <span className="point point1">.</span>
      <span className="point point2">.</span>
      <span className="point point3">.</span>
    </div>
  )
}
