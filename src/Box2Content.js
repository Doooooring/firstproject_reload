import './Box2Content.css'
import loading from './minjaeremoved.png'
export default function Box2Content({
  state,
  box2Contents,
  newsContentLoading,
}) {
  if (state === 'vacant') {
    return <div className="boxDefault"> 왼쪽에서 골라 보자 </div>
  } else {
    if (newsContentLoading == false) {
      const { id, title, summary, A, B, linkList } = box2Contents
      return (
        <div className="newsBox">
          <span className="newsTitle"> {'' + title + '..?'} </span>
          <div className="newsContent">
            <div className="summary">{summary}</div>
            <div className="A">좌 : {A}</div>
            <div className="B">{B} : 우</div>
          </div>
          <div className="borderLine">{' - - - - - - - - - - - - - - - '}</div>
          <div className="linkBox">
            <span className="explaintext">더 알고 싶다면 ?</span>
            {linkList.map((link) => {
              return (
                <a href={link[1]} target="_blank" className="linkToNews">
                  <p>{link[0]}</p>
                </a>
              )
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div className="newsBox 음">
          준비가 되지 않았어요!<br></br>
          <img className="loading" src={loading}></img>
        </div>
      )
    }
  }
}
