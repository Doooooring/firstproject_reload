import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import BoxRendering from './boxComponent'
import SearchBox from './searchBox'
import Box2Content from './Box2Content.js'
import axios from 'axios'
import './Contents2.css'

export default function Contents2(props) {
  let contentData = []
  const changeFilled = props.vacantfunction
  const vacant = props.vacant
  const ip = props.ip
  const [orginalItems, changeOriginalItems] = useState([])
  const [items, changeItems] = useState([])
  const [itemLoading, setItemLoading] = useState(false)
  const [itemError, setItemError] = useState(null)
  const [searchKeyWord, changeKeyword] = useState('')
  const [relatedWords, getRelatedWords] = useState(['키워드를 검색해 봅시다'])
  const [newsContentLoading, setNewsContentLoading] = useState(false)
  const [box2Contents, setBox2Contents] = useState('')
  const [contentState, handleContentState] = useState('')
  const [paginatingLoading, setPaginatingLoading] = useState(false)
  const [paginatingError, setPaginatingError] = useState(null)
  const [paginatingPossible, setPaginatingPossible] = useState(true)

  const currentContentsNumber = useRef(0)
  const box1 = useRef()

  async function getContentData() {
    if (!paginatingPossible) {
      return 0
    }
    try {
      setItemLoading(true)
      const response = await axios.get(
        `http://localhost:3000/defaultcontentdata?curnum=${currentContentsNumber.current}`,
      )
      const [possibility, ...responseData] = response.data
      setPaginatingPossible(possibility)
      console.log(responseData)
      changeItems(responseData)
      changeOriginalItems(responseData)
      setItemLoading(false)
      currentContentsNumber.current += 10
    } catch (e) {
      setItemError(e)
    }
  }

  async function scroll() {
    if (!paginatingPossible) {
      return 0
    }
    try {
      setPaginatingLoading(true)
      const response = await axios.get(
        `http://localhost:3000/defaultcontentdata?curnum=${items.length}`,
      )
      const responseData = response.data
      console.log(responseData)
      setPaginatingPossible(responseData[0])
      changeItems([...items, ...responseData.slice(1)])
      setPaginatingLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getContentData()
  }, [])

  return (
    <div className="default1">
      <div
        className="box1"
        ref={box1}
        onScroll={(e) => {
          const { offsetHeight, scrollTop } = e.target
          console.log(offsetHeight)
          console.log(scrollTop)
          if (
            paginatingPossible &&
            offsetHeight - 30 <= scrollTop &&
            !paginatingLoading
          ) {
            console.log('duralsrl')
            scroll()
          }
        }}
      >
        <SearchBox
          relatedWords={relatedWords}
          searchKeyWord={searchKeyWord}
          changeItems={changeItems}
          contentData={orginalItems}
          getRelatedWords={getRelatedWords}
          changeKeyword={changeKeyword}
        />
        {items.map((it) => (
          <li key={it.title} className="contentBox">
            <BoxRendering
              item={it}
              ip={ip}
              vacant={vacant}
              changeFilled={changeFilled}
              setNewsContentLoading={setNewsContentLoading}
              setItemError={setItemError}
              setBox2Contents={setBox2Contents}
              handleContentState={handleContentState}
            />
          </li>
        ))}
        <div
          className="last-page"
          style={{ display: paginatingPossible ? 'none' : 'block' }}
        >
          더 이상 불러 올 컨텐츠가 없어요!
        </div>
        <div
          className="component-loading"
          style={{ display: paginatingLoading ? 'block' : 'none' }}
        >
          ㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷ
        </div>
      </div>
      <div className="box2">
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
