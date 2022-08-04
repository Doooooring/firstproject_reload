import './searchBox.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export default function SearchBox(props) {
  let relatedWords = props.relatedWords
  let searchKeyWord = props.searchKeyWord
  let changeItems = props.changeItems
  let contentData = props.contentData
  let getRelatedWords = props.getRelatedWords
  let changeKeyword = props.changeKeyword
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [keylist, setKeys] = useState([])
  const [curFocusOnWord, changeCurFocusOnWord] = useState(-2)

  async function getKeys() {
    try {
      setError(null)
      setLoading(true)
      const response = await axios.get('http://localhost:3000/keylist')
      const { keylist } = response.data
      setKeys(keylist)
    } catch (e) {
      setError(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    getKeys()
  }, [])

  async function handleSearchBoxChange(e) {
    e.preventDefault()
    const preValue = e.target.value
    changeKeyword(e.target.value)
    if (preValue === '') {
      changeItems(contentData)
      getRelatedWords(['키워드를 검색해 봅시다'])
    } else {
      if (loading) {
        return 0
      } else {
        if (curFocusOnWord != -2) {
          changeCurFocusOnWord(-1)
        }
        const findRelatedWords = []
        findRelatedWords.push(e.target.value)
        for (let key of keylist) {
          if (key === preValue) {
            continue
          } else if (key.includes(preValue)) {
            findRelatedWords.push(key)
          }
          if (findRelatedWords.length === 10) {
            break
          }
        }
        if (findRelatedWords.length == 0) {
          getRelatedWords(['그런건 없어용 :)'])
        } else {
          getRelatedWords(findRelatedWords)
        }
      }
    }
  }

  async function handleArrowKey(e) {
    if (e.key == 'Enter') {
      submit(e)
    } else if (
      e.key == 'ArrowUp' ||
      e.key == 'ArrowDown' ||
      e.key == 'ArrowRight' ||
      e.key == 'ArrowLeft'
    ) {
      if (
        e.key == 'ArrowRight' ||
        e.key == 'ArrowLeft' ||
        searchKeyWord == ''
      ) {
        return 0
      } else {
        if (e.key == 'ArrowUp') {
          if (curFocusOnWord == -1) {
            return 0
          } else {
            changeKeyword(relatedWords[curFocusOnWord - 1])
            changeCurFocusOnWord(curFocusOnWord - 1)
          }
        } else {
          if (curFocusOnWord == relatedWords.length - 1) {
            return 0
          } else {
            changeKeyword(relatedWords[curFocusOnWord + 1])
            changeCurFocusOnWord(curFocusOnWord + 1)
          }
        }
      }
    } else {
      return 0
    }
  }

  async function submit(e) {
    e.preventDefault()
    if (curFocusOnWord != -1) {
      await changeKeyword(relatedWords[curFocusOnWord])
    }
    const response = await fetch(
      `http://localhost:3000/keybox/${searchKeyWord}`,
      {
        method: 'GET',
      },
    )
    const newsList = await response.json()
    if (newsList.length !== 0) {
      changeItems(newsList)
    } else {
      alert('없다고 시발 새끼야')
    }
  }
  return (
    <form className="top" onSubmit={submit}>
      <span className="titlepar">👍 이 정도는 알자</span>
      <div className="searchBox">
        <input
          type="text"
          placeholder=" 키워드 입력"
          className="inputBox"
          value={searchKeyWord}
          onChange={(e) => {
            handleSearchBoxChange(e)
          }}
          onKeyDown={(e) => {
            handleArrowKey(e)
          }}
        ></input>
        <div className="relatedBox">
          {relatedWords.map((word) => (
            <p
              className={
                'word ' +
                (curFocusOnWord == relatedWords.indexOf(word) && ' focuson')
              }
              id={relatedWords.indexOf(word)}
            >
              {searchKeyWord != '' && relatedWords.indexOf(word) === 0
                ? '당신의 입력 :'
                : '#'}{' '}
              {word}
            </p>
          ))}
        </div>
      </div>
      <button type="submit" className="searchbutton">
        찾기
      </button>
    </form>
  )
}
