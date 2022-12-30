import "./searchBox.css";
import { useState, useEffect, useRef } from "react";

import axios from "axios";

function getConstantVowel(wor) {
  let result = ``;
  const f = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const s = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ];
  const t = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const ga = 44032;
  for (let kor of wor) {
    let uni = kor.charCodeAt(0);
    if (uni < ga) {
      result += kor;
      continue;
    }
    uni = uni - ga;
    let fn = parseInt(uni / 588);
    let sn = parseInt((uni - fn * 588) / 28);
    let tn = parseInt(uni % 28);
    result += `${f[fn]}${s[sn]}${t[tn]}`;
    console.log(result);
  }
  return result;
}

export default function SearchBox(props) {
  let relatedWords = props.relatedWords;
  let searchKeyWord = props.searchKeyWord;
  let changeItems = props.changeItems;
  let contentData = props.contentData;
  let getRelatedWords = props.getRelatedWords;
  let changeKeyword = props.changeKeyword;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keylist, setKeys] = useState([]);
  const [curFocusOnWord, changeCurFocusOnWord] = useState(-2);

  async function getKeys() {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get("http://localhost:3000/keylist");
      const { keylist } = response.data;
      setKeys(keylist);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    getKeys();
  }, []);

  async function handleSearchBoxChange(e) {
    e.preventDefault();
    const preValue = e.target.value;
    changeKeyword(e.target.value);
    if (preValue === "") {
      changeItems(contentData);
      getRelatedWords(["키워드를 검색해 봅시다"]);
    } else {
      if (loading) {
        return 0;
      } else {
        if (curFocusOnWord != -2) {
          changeCurFocusOnWord(-1);
        }
        const findRelatedWords = [];
        findRelatedWords.push(e.target.value);
        const preValueToChar = getConstantVowel(preValue);
        for (let key of keylist) {
          const keyToChar = getConstantVowel(key);
          if (keyToChar === preValueToChar) {
            continue;
          } else if (keyToChar.includes(preValueToChar)) {
            console.log(true);
            findRelatedWords.push(key);
          }
          if (findRelatedWords.length === 10) {
            break;
          }
        }
        if (findRelatedWords.length == 0) {
          getRelatedWords(["그런건 없어용 :)"]);
        } else {
          getRelatedWords(findRelatedWords);
        }
      }
    }
  }

  async function handleArrowKey(e) {
    if (e.key == "Enter") {
      submit(e);
    } else if (
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowLeft"
    ) {
      if (
        e.key === "ArrowRight" ||
        e.key === "ArrowLeft" ||
        searchKeyWord === ""
      ) {
        return 0;
      } else {
        if (e.key === "ArrowUp") {
          if (curFocusOnWord === -1) {
            return 0;
          } else {
            changeKeyword(relatedWords[curFocusOnWord - 1]);
            changeCurFocusOnWord(curFocusOnWord - 1);
          }
        } else {
          if (curFocusOnWord === relatedWords.length - 1) {
            return 0;
          } else {
            changeKeyword(relatedWords[curFocusOnWord + 1]);
            changeCurFocusOnWord(curFocusOnWord + 1);
          }
        }
      }
    } else {
      return 0;
    }
  }

  async function submit(e) {
    e.preventDefault();
    if (curFocusOnWord !== -1) {
      await changeKeyword(relatedWords[curFocusOnWord]);
    }
    const response = await axios.get(
      `http://localhost:3000/keybox/${searchKeyWord}`
    );
    const newsList = response.data;
    if (newsList.length !== 0) {
      changeItems(newsList);
    } else {
      alert("없다고 시발 새끼야");
    }
  }
  return (
    <form
      className="top"
      onSubmit={(e) => {
        submit(e);
      }}
    >
      <div className="searchBox">
        <input
          type="text"
          placeholder="궁금한 뉴스의 키워드, 인물을 검색하시오"
          className="inputBox"
          value={searchKeyWord}
          onChange={(e) => {
            handleSearchBoxChange(e);
          }}
          onKeyDown={(e) => {
            handleArrowKey(e);
          }}
        ></input>
        <div className="relatedBox">
          {relatedWords.map((word) => (
            <p
              className={
                "word " +
                (curFocusOnWord === relatedWords.indexOf(word) && " focuson")
              }
              id={relatedWords.indexOf(word)}
            >
              {searchKeyWord !== "" && relatedWords.indexOf(word) === 0
                ? "당신의 입력 :"
                : "#"}{" "}
              {word}
            </p>
          ))}
        </div>
      </div>
      <button type="submit" className="searchbutton">
        찾기
      </button>
    </form>
  );
}
