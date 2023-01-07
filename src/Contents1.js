import "./Contents1.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import BoxComponent from "./boxComponent.js";
import axios from "axios";
import Box2Content from "./Box2Content.js";
import KeywordBoxComponent from "./keywordbox.js";
import loadingPage from "./loadingPage.js";

function getConstantVowel(wor, testWord = false) {
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

  function wordToCharSub(w) {
    let res = "";
    let uni = w.charCodeAt(0);
    if (uni < ga) {
      res = `1${w}`;
      return res;
    }
    uni = uni - ga;
    let fn = parseInt(uni / 588);
    let sn = parseInt((uni - fn * 588) / 28);
    let tn = parseInt(uni % 28);
    if (tn === 0) {
      res += `1${f[fn]}2${s[sn]}`;
    } else {
      res += `1${f[fn]}2${s[sn]}3${t[tn]}`;
    }
    return res;
  }

  let result;
  if (testWord) {
    result = [];
    let lastCharUni = wor.slice(-1).charCodeAt(0) - ga;
    let lastCharTn = parseInt(lastCharUni & 28);
    if (lastCharUni < 0 || lastCharTn === 0) {
      let result1 = ``;
      for (let kor of wor) {
        result1 += wordToCharSub(kor);
      }
      result.push(result1);
    } else {
      let result1 = "";
      let result2 = "";
      for (let kor of wor.slice(0, -1)) {
        result1 += wordToCharSub(kor);
        result2 += wordToCharSub(kor);
      }
      let lastFn = parseInt(lastCharUni / 588);
      let lastSn = parseInt((lastCharUni - lastFn * 588) / 28);
      let lastTn = parseInt(lastCharUni % 28);
      result1 += `1${f[lastFn]}2${s[lastSn]}3${t[lastTn]}`;
      result2 += `1${f[lastFn]}2${s[lastSn]}1${t[lastTn]}`;
      result.push(result1);
      result.push(result2);
    }
  } else {
    result = ``;
    for (let kor of wor) {
      result += wordToCharSub(kor);
    }
  }
  return result;
}

export default function Contents1(props) {
  const ip = props.ip;
  const [hotKeyWordLoading, setHotKeyWordLoading] = useState(false);
  const [hoyKeyWordError, setHotKeyWordError] = useState(null);
  const [hotKeyWordListContinue, handleHotKeyWordListContinue] = useState([]);
  const [hotKeyWordListEnd, handleHotKeyWordListEnd] = useState([]);
  const [boxComponentList, setBoxComponentList] = useState([]);
  const [curClicked, handleCurClicked] = useState(null);
  const [vacant, changeFilled] = useState("vacant");
  const [newsContentLoading, setNewsContentLoading] = useState(false);
  const [ItemError, setItemError] = useState(null);
  const [box2Contents, setBox2Contents] = useState("");
  const [keywordClicked, handleKeywordClicked] = useState("none");
  const [contentState, handleContentState] = useState("");
  const [keywordExplanation, handleKeywordExplanation] = useState([]);
  const [summaryToFold, handleSummaryToFold] = useState(false);
  const [searchKeyWord, handleSearchKeyWord] = useState("");

  const originalHotKeyWordContinue = useRef([]);
  const originalHotKeyWordEnd = useRef([]);

  function handleSearchBoxChange(e) {
    const currentText = e.target.value;
    handleSearchKeyWord(currentText);
    if (currentText === "") {
      if (keywordClicked === "none") {
        handleHotKeyWordListContinue(originalHotKeyWordContinue.current);
        handleHotKeyWordListEnd(originalHotKeyWordEnd.current);
        return 0;
      } else {
        handleHotKeyWordListContinue([]);
        handleHotKeyWordListEnd([]);
        return 0;
      }
    }
    const [currentTextToChar1, currentTextToChar2] = getConstantVowel(
      currentText,
      true
    );
    const nextHotKeyWordContinue = originalHotKeyWordContinue.current.filter(
      (word) => {
        const wordToChar = getConstantVowel(word["keyword"]);
        return (
          wordToChar.includes(currentTextToChar1) ||
          wordToChar.includes(currentTextToChar2)
        );
      }
    );
    const nextHotKeyWordEnd = originalHotKeyWordEnd.current.filter((word) => {
      const wordToChar = getConstantVowel(word["keyword"]);
      return (
        wordToChar.includes(currentTextToChar1) ||
        wordToChar.includes(currentTextToChar2)
      );
    });
    handleHotKeyWordListContinue(nextHotKeyWordContinue);
    handleHotKeyWordListEnd(nextHotKeyWordEnd);
  }

  const getHotKeyWord = useCallback(async () => {
    try {
      setHotKeyWordLoading(true);
      const response = await axios.get("http://localhost:3000/hotkeyword");
      const [hotKeyWordsContinue, hotKeyWordsEnd] = response.data;
      originalHotKeyWordContinue.current = [...hotKeyWordsContinue];

      originalHotKeyWordEnd.current = [...hotKeyWordsEnd];
      handleHotKeyWordListContinue(hotKeyWordsContinue);
      handleHotKeyWordListEnd(hotKeyWordsEnd);
      setHotKeyWordLoading(false);
    } catch (e) {
      setHotKeyWordError(e);
    }
  }, []);

  useEffect(() => {
    getHotKeyWord();
  }, []);

  if (hotKeyWordLoading) {
    return (
      <div className="default1">
        <loadingPage />
      </div>
    );
  } else {
    if (keywordClicked == "none") {
      return (
        <div>
          <input
            type="text"
            placeholder="궁금한 뉴스의 키워드, 인물을 검색하시오"
            className="inputBox_contents1"
            value={searchKeyWord}
            onChange={(e) => {
              handleSearchBoxChange(e);
            }}
          ></input>
          <div className="grid-container">
            <span className="grid-title">지금 HOT 정치 키워드</span>
            <div className="gridbox">
              {hotKeyWordListContinue.map((comp) => (
                <KeywordBoxComponent
                  comp={comp}
                  keywordClicked={keywordClicked}
                  setBoxComponentList={setBoxComponentList}
                  setHotKeyWordLoading={setHotKeyWordLoading}
                  handleKeyWordClicked={handleKeywordClicked}
                  handleKeyWordExplanation={handleKeywordExplanation}
                  handleSummaryToFold={handleSummaryToFold}
                  handleSearchKeyWord={handleSearchKeyWord}
                  handleHotKeyWordListContinue={handleHotKeyWordListContinue}
                  handleHotKeyWordListEnd={handleHotKeyWordListEnd}
                />
              ))}
            </div>
            <span className="grid-title">지난 키워드</span>
            <div className="gridbox">
              {hotKeyWordListEnd.map((comp) => (
                <KeywordBoxComponent
                  comp={comp}
                  keywordClicked={keywordClicked}
                  setBoxComponentList={setBoxComponentList}
                  setHotKeyWordLoading={setHotKeyWordLoading}
                  handleKeyWordClicked={handleKeywordClicked}
                  handleKeyWordExplanation={handleKeywordExplanation}
                  handleSummaryToFold={handleSummaryToFold}
                  handleSearchKeyWord={handleSearchKeyWord}
                  handleHotKeyWordListContinue={handleHotKeyWordListContinue}
                  handleHotKeyWordListEnd={handleHotKeyWordListEnd}
                />
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="default1">
          <input
            type="text"
            placeholder="궁금한 뉴스의 키워드, 인물을 검색하시오"
            className="inputBox_contents1_sub"
            value={searchKeyWord}
            onChange={(e) => {
              handleSearchBoxChange(e, curClicked);
            }}
          ></input>
          <div class="gridbox gridbox2">
            {hotKeyWordListContinue.sort().map((comp) => {
              return (
                <KeywordBoxComponent
                  comp={comp}
                  keywordClicked={keywordClicked}
                  setBoxComponentList={setBoxComponentList}
                  setHotKeyWordLoading={setHotKeyWordLoading}
                  handleKeyWordClicked={handleKeywordClicked}
                  handleKeyWordExplanation={handleKeywordExplanation}
                  handleSummaryToFold={handleSummaryToFold}
                  handleSearchKeyWord={handleSearchKeyWord}
                />
              );
            })}
            {hotKeyWordListEnd.map((comp) => {
              return (
                <KeywordBoxComponent
                  comp={comp}
                  keywordClicked={keywordClicked}
                  setBoxComponentList={setBoxComponentList}
                  setHotKeyWordLoading={setHotKeyWordLoading}
                  handleKeyWordClicked={handleKeywordClicked}
                  handleKeyWordExplanation={handleKeywordExplanation}
                  handleSummaryToFold={handleSummaryToFold}
                  handleSearchKeyWord={handleSearchKeyWord}
                />
              );
            })}
          </div>
          <div
            onClick={() => {
              handleKeywordClicked("none");
              handleSearchKeyWord("");
              handleHotKeyWordListContinue(originalHotKeyWordContinue.current);
              handleHotKeyWordListEnd(originalHotKeyWordEnd.current);
            }}
            className="back-to-keyword-list"
          >
            뒤로가기
          </div>
          <div className="c-container">
            <div className="c1box1">
              <div className="keyword-explanation">
                <span className="keyword-explanation-title">
                  {keywordClicked}
                </span>
                <div
                  className="keyword-explanation-main"
                  style={{ display: summaryToFold ? "none" : "block" }}
                >
                  {keywordExplanation.map((exp) => {
                    return (
                      <div className="keyword-explanation-paragraph">{exp}</div>
                    );
                  })}
                </div>
                <div
                  className="summary-button"
                  style={{ display: summaryToFold ? "none" : "block" }}
                  onClick={() => {
                    handleSummaryToFold(true);
                  }}
                >
                  접기 ^
                </div>
                <div
                  className="summary-button"
                  style={{ display: summaryToFold ? "inline-block" : "none" }}
                  onClick={() => {
                    handleSummaryToFold(false);
                  }}
                >
                  열기 ^
                </div>
              </div>
              <div className="c1subbox2">
                {boxComponentList.map((comp) => (
                  <li key={comp.id} className="contentBox">
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
        </div>
      );
    }
  }
}
