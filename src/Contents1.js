import './Contents1.css'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import BoxComponent from './boxComponent.js'
import axios from 'axios'
import Box2Content from './Box2Content.js'
import KeywordBoxComponent from './keywordbox.js'

export default function Contents1(props) {
  const ip = props.ip
  const [hotKeyWordLoading, setHotKeyWordLoading] = useState(false)
  const [hotKeyWordListContinue, getHotKeyWordListContinue] = useState([])
  const [hotKeyWordListEnd, getHotKeyWordListEnd] = useState([])
  const [keysError, setError] = useState(null)
  const [keyLoading, setLoading] = useState(false)
  const [keyList, setKeys] = useState([])
  const [boxComponentList, setBoxComponentList] = useState([])
  const [curClicked, handleCurClicked] = useState(null)
  const [vacant, changeFilled] = useState('vacant')
  const [newsContentLoading, setNewsContentLoading] = useState(false)
  const [ItemError, setItemError] = useState(null)
  const [box2Contents, setBox2Contents] = useState('')
  const [keywordClicked, handleKeywordClicked] = useState('none')
  const [contentState, handleContentState] = useState('')
  const [keywordExplanation, handleKeywordExplanation] = useState('')
  const boxref = useRef()

  async function getHotKeyWord() {
    try {
      setHotKeyWordLoading(true)
      const response = await axios.get('http://localhost:3000/hotkeyword')
      const [hotKeyWordsContinue, hotKeyWordEnd] = await response.data
      console.log(response.data)
      getHotKeyWordListContinue(hotKeyWordsContinue)
      getHotKeyWordListEnd(hotKeyWordEnd)
      setHotKeyWordLoading(false)
    } catch (e) {
      setError(e)
    }
  }

  useEffect(() => {
    getHotKeyWord()
  }, [])

  if (hotKeyWordLoading) {
    return (
      <div className="default1">
        <div className="hotLoading">ㄱ ㄷ</div>
      </div>
    )
  } else {
    if (keywordClicked == 'none') {
      return (
        <div className="grid-container">
          <h2 className="grid-title">지금 HOT 정치 키워드</h2>
          <div className="gridbox">
            {hotKeyWordListContinue.map((comp) => (
              <KeywordBoxComponent
                comp={comp}
                setBoxComponentList={setBoxComponentList}
                setHotKeyWordLoading={setHotKeyWordLoading}
                handleKeyWordClicked={handleKeywordClicked}
                handleKeyWordExplanation={handleKeywordExplanation}
              />
            ))}
          </div>
          <h2 className="grid-title">지난 키워드</h2>
          <div className="gridbox">
            {hotKeyWordListEnd.map((comp) => (
              <KeywordBoxComponent
                comp={comp}
                setBoxComponentList={setBoxComponentList}
                setHotKeyWordLoading={setHotKeyWordLoading}
                handleKeyWordClicked={handleKeywordClicked}
                handleKeyWordExplanation={handleKeywordExplanation}
              />
            ))}
          </div>
        </div>
      )
    } else {
      return (
        <div className="default1">
          <button
            onClick={() => {
              handleKeywordClicked('none')
            }}
            className="back-to-keyword-list"
          >
            뒤로가기
          </button>
          <div className="c1box1">
            <div className="keyword-explanation">
              <span className="keyword-explanation-title">
                {keywordClicked}
              </span>
            </div>
            <div className="c1subbox2">
              {boxComponentList.map((comp) => (
                <li key={comp.title} className="contentBox">
                  <BoxComponent
                    item={comp}
                    vacant={vacant}
                    changeFilled={changeFilled}
                    setNewsContentLoading={setNewsContentLoading}
                    setItemError={setItemError}
                    setBox2Contents={setBox2Contents}
                    handleContentState={handleContentState}
                  />
                </li>
              ))}
            </div>
          </div>
          <div className="c1box2">
            <Box2Content
              state={vacant}
              box2Contents={box2Contents}
              newsContentLoading={newsContentLoading}
              ip={ip}
              contentState={contentState}
            />
          </div>
        </div>
      )
    }
  }
}

/** 
ㅂ
function KeyWordBox({ keyName, keynum }) {
  const keyBoxSizing = {
    1: ['200px', '200px', '30px'],
    2: ['175px', '175px', '22px'],
    3: ['150px', '150px', '20px'],
    4: ['125px', '125px', '15px'],
    5: ['100px', '100px', '13px'],
  }
  const [boxWidth, boxHeight, boxFontSize] = keyBoxSizing[keynum]
  const boxRadius = (Number(boxWidth.slice(0, 3)) / 2).toString() + 'px'
  const style = {
    width: boxWidth,
    height: boxHeight,
    borderRadius: boxRadius,
    fontSize: boxFontSize,
  }
  function subhandleCurClicked(knum) {
    let componentStyle = boxref.current.style
    if (curClicked !== null) {
      setBoxComponentList([])
      handleCurClicked(null)
      componentStyle.height = '400px'
      boxref.current.style.paddingTop = '2%'
    } else {
      componentStyle.height = '300px'
      componentStyle.overflow = 'hidden'
      if (knum == 1) {
        boxref.current.style.paddingTop = '8%'
      } else if (knum <= 3) {
        boxref.current.style.paddingTop = '11%'
      } else {
        boxref.current.style.paddingTop = '18%'
      }
      handleCurClicked(knum)
    }
    console.log(boxComponentList)
  }
  
  return (
    <div
      className={
        'keycircle ' +
        (curClicked !== null
          ? curClicked == keynum
            ? 'visible'
            : 'invisible'
          : null)
      }
      style={style}
      onClick={() => {
        getBoxComponent(keyName)
        subhandleCurClicked(keynum)
      }}
    >
      <p className="keyName">
        # {keynum}
        <br></br> {keyName}
      </p>
    </div>
  )
}*/
