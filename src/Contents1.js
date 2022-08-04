import './Contents1.css'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import BoxComponent from './boxComponent.js'
import axios from 'axios'
import { buildQueries } from '@testing-library/react'
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers'
import Box2Content from './Box2Content'

export default function Contents1() {
  const [hotKeyWordLoading, setHotKeyWordLoading] = useState(false)
  const [hotKeyWordList, getHotKeyWordList] = useState([])
  const [HotKeyWordError, setHotKeyWordError] = useState(null)
  const [keysError, setError] = useState(null)
  const [keyLoading, setLoading] = useState(false)
  const [keyList, setKeys] = useState([])
  const [boxComponentList, setBoxComponentList] = useState([])
  const [curClicked, handleCurClicked] = useState(null)
  const [vacant, changeFilled] = useState('vacant')
  const [newsContentLoading, setNewsContentLoading] = useState(false)
  const [ItemError, setItemError] = useState(null)
  const [box2Contents, setBox2Contents] = useState('')

  const boxref = useRef()
  async function getHotKeyWord() {
    try {
      setHotKeyWordLoading(true)
      const response = await axios.get('http://localhost:3000/hotkeyword')
      const hotKeyWords = await response.data

      getHotKeyWordList(hotKeyWords)
      setHotKeyWordLoading(false)
    } catch (e) {
      setHotKeyWordError(e)
    }
  }

  useEffect(() => {
    getHotKeyWord()
  }, [])

  async function getBoxComponent(keyname) {
    if (boxComponentList.length == 0) {
      try {
        setLoading(true)
        const response = await axios.get(
          `http://localhost:3000/keybox/${keyname}`,
        )
        const boxList = response.data
        setBoxComponentList(boxList)
        setLoading(false)
      } catch (e) {
        setHotKeyWordError(e)
        console.log(e)
      }
    } else {
      return 0
    }
  }

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
  }
  if (hotKeyWordLoading) {
    return (
      <div className="default1">
        <div className="hotLoading">ㄱ ㄷ</div>
      </div>
    )
  } else {
    return (
      <div className="default1">
        <div className="c1box1">
          <p className="c1title1">🔥 Hot 키워드</p>
          <div className="c1subbox1" ref={boxref}>
            {hotKeyWordList.map(({ keyword, index }) => {
              return <KeyWordBox keyName={keyword} keynum={index} />
            })}
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
          />
        </div>
      </div>
    )
  }
}
