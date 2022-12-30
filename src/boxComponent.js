import axios from "axios";
import "./boxComponent.css";
import defaultImg from "./image/img_thumb@2x.png";
import icoNew from "./image/ico_new.png";

import { useCallback, useMemo } from "react";

export default function BoxRendering(props) {
  const {
    item,
    vacant,
    setVacant,
    setNewsContentLoading,
    setItemError,
    setBox2Contents,
    handleContentState,
  } = props;
  const { id, title, summary, tags, state } = item;
  let back;

  function open(boxNum) {
    if (vacant === true) {
      setVacant(boxNum);
      handleContentState(state);
    } else if (vacant === boxNum) {
      setVacant(true);
      handleContentState("");
    } else {
      setVacant(boxNum);
      handleContentState(state);
    }
  }

  async function showNewsContent(id) {
    try {
      setItemError(null);
      setNewsContentLoading(true);
      const response = await axios.get(
        `http://localhost:3000/newscontent/${id}`
      );
      const newsData = response.data;
      if ("id" in newsData) {
        setBox2Contents(newsData);
        setNewsContentLoading(false);
      } else {
        return 0;
      }
    } catch (e) {
      setItemError(false);
    }
  }

  if (state === "진행 중") {
    back = "continue";
  } else {
    back = "end";
  }

  const onErrorImg = useCallback((e) => {
    e.target.src = defaultImg;
  }, []);

  return (
    <div
      className="box"
      onClick={() => {
        console.log("Eeee");
        showNewsContent(id);
        open(id);
      }}
    >
      <div className="img-comp">
        <img
          src={`http://localhost:3000/`}
          alt="hmm"
          width="100%"
          className="box-component-image"
          onError={(e) => onErrorImg(e)}
        ></img>
      </div>
      <div className="news-box-body">
        <div className-="news-box-head-block">
          <h1 className="news-box-head">{title}</h1>
          <span
            style={{
              display: state === "진행 중" ? "inline" : "none",
            }}
          >
            <img src={icoNew} alt="hmm" height="18px" className="new-ico"></img>
          </span>
        </div>
        <p className="new-box-summary">{summary}</p>
        <div className="hashtag-box">
          {tags?.map((tag) => {
            return <p className="hashtag">{tag}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

/* 
<div className="termState">
  <span className={'subtitle ' + (vacant !== id && 'subcomp')}>
    {subtitle}
  </span>
  <h3 className={'state ' + (vacant !== id && 'subcomp')}>{state}</h3>
</div> 

<div
className={'front '.concat(back)}
style={{
  display: vacant === id ? 'none' : 'block',
  color: 'black',
  fontSize: '30px',
  fontWeight: '700',
}}
>
{title}
</div>
*/
