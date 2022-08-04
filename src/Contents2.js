import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import BoxRendering from './boxComponent'
import SearchBox from './searchBox'
import Box2Content from './Box2Content.js'
import axios from 'axios'
import './Contents2.css'

export default function Contents2(props) {
  let contentData = []
  const [orginalItems, changeOriginalItems] = useState([])
  const [items, changeItems] = useState([])
  const [itemLoading, setItemLoading] = useState(false)
  const [itemError, setItemError] = useState(null)
  const changeFilled = props.vacantfunction
  const vacant = props.vacant
  const [searchKeyWord, changeKeyword] = useState('')
  const [relatedWords, getRelatedWords] = useState(['키워드를 검색해 봅시다'])
  const [newsContentLoading, setNewsContentLoading] = useState(false)
  const [box2Contents, setBox2Contents] = useState('')
  const currentContentsNumber = useRef(0)

  async function getContentData() {
    try {
      setItemLoading(true)
      const response = await axios.get(
        `http://localhost:3000/defaultcontentdata?curnum=${currentContentsNumber.current}`,
      )
      const responseData = response.data
      changeItems(responseData)
      changeOriginalItems(responseData)
      setItemLoading(false)
      currentContentsNumber.current += 10
    } catch (e) {
      setItemError(e)
    }
  }

  useEffect(() => {
    getContentData()
  }, [])

  return (
    <div className="default1">
      <div className="box1">
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
              vacant={vacant}
              changeFilled={changeFilled}
              setNewsContentLoading={setNewsContentLoading}
              setItemError={setItemError}
              setBox2Contents={setBox2Contents}
            />
          </li>
        ))}
      </div>
      <div className="box2">
        <Box2Content
          state={vacant}
          box2Contents={box2Contents}
          newsContentLoading={newsContentLoading}
        />
      </div>
    </div>
  )
}
