import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BoxRendering from "./boxComponent";
import SearchBox from "./searchBox";
import Box2Content from "./Box2Content.js";
import { SpeechBubble } from "./figure/figure";

import icoNews from "./image/ico_news.png";

import axios from "axios";
import "./Contents2.css";

export default function Contents2(props) {
  const { setVacant, vacant, ip } = props;
  const [orginalItems, changeOriginalItems] = useState([]);
  const [items, changeItems] = useState([]);
  const [itemLoading, setItemLoading] = useState(false);
  const [itemError, setItemError] = useState(null);
  const [searchKeyWord, changeKeyword] = useState("");
  const [relatedWords, getRelatedWords] = useState(["키워드를 검색해 봅시다"]);
  const [newsContentLoading, setNewsContentLoading] = useState(false);
  const [box2Contents, setBox2Contents] = useState("");
  const [contentState, handleContentState] = useState("");
  const [paginatingLoading, setPaginatingLoading] = useState(false);
  const [paginatingPossible, setPaginatingPossible] = useState(true);

  const currentContentsNumber = useRef(0);
  const box1 = useRef();

  async function getContentData() {
    if (!paginatingPossible) {
      return 0;
    }
    try {
      setItemLoading(true);
      const response = await axios.get(
        `http://localhost:3000/defaultcontentdata?curnum=${currentContentsNumber.current}`
      );
      const [possibility, ...responseData] = response.data;
      setPaginatingPossible(possibility);
      console.log(responseData);
      changeItems(responseData);
      changeOriginalItems(responseData);
      setItemLoading(false);
      currentContentsNumber.current += 10;
    } catch (e) {
      setItemError(e);
    }
  }

  async function scroll() {
    if (!paginatingPossible) {
      return 0;
    }
    try {
      setPaginatingLoading(true);
      const response = await axios.get(
        `http://localhost:3000/defaultcontentdata?curnum=${items.length}`
      );
      const responseData = response.data;
      setPaginatingPossible(responseData[0]);
      changeItems([...items, ...responseData.slice(1)]);
      setPaginatingLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getContentData();
  }, []);

  return (
    <div id="main">
      <div className="default1">
        <div className="search-wrapper">
          <SearchBox
            relatedWords={relatedWords}
            searchKeyWord={searchKeyWord}
            changeItems={changeItems}
            contentData={orginalItems}
            getRelatedWords={getRelatedWords}
            changeKeyword={changeKeyword}
          />
          <SpeechBubble width="200" height="30" />
        </div>
        <div className="main-contents">
          <div className="main-contents-header">
            <div className="main-contents-header-box">
              <img src={icoNews} alt="hi" height="18px"></img>
              <p className="category-name">최신 뉴스</p>
            </div>
          </div>
          <div className="main-contents-body">
            <div
              className="news-list"
              style={{
                width: vacant === true ? "1000px" : "500px",
              }}
              ref={box1}
              onScroll={(e) => {
                const { offsetHeight, scrollTop } = e.target;
                if (
                  paginatingPossible &&
                  offsetHeight - 30 <= scrollTop &&
                  !paginatingLoading
                ) {
                  scroll();
                }
              }}
            >
              {items.map((it) => (
                <div key={it.title} className="main-content-li">
                  <BoxRendering
                    item={it}
                    vacant={vacant}
                    setVacant={setVacant}
                    setNewsContentLoading={setNewsContentLoading}
                    setItemError={setItemError}
                    setBox2Contents={setBox2Contents}
                    handleContentState={handleContentState}
                  />
                </div>
              ))}
              <div
                className="last-page"
                style={{ display: paginatingPossible ? "none" : "block" }}
              >
                더 이상 불러 올 컨텐츠가 없어요!
              </div>
              <div
                className="component-loading"
                style={{ display: paginatingLoading ? "block" : "none" }}
              >
                ㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷ
              </div>
            </div>
            <div
              className="news-content-box"
              style={{
                display: vacant === true ? "none" : "block",
              }}
            >
              <Box2Content
                vacant={vacant}
                setVacant={setVacant}
                handleContentState={handleContentState}
                box2Contents={box2Contents}
                newsContentLoading={newsContentLoading}
                ip={ip}
                contentState={contentState}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
