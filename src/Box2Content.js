import "./Box2Content.css";
import { BrickBar } from "./figure/figure.js";

import loading from "./minjaeremoved.png";
import icoClose from "./image/ico_close.png";
import icoChosun from "./image/ico_chosun.png";
import icoDonga from "./image/ico_donga.png";
import icoJoongang from "./image/ico_joongang.png";
import icoHankyung from "./image/ico_hankyung.png";
import icoHankyoreh from "./image/ico_hankyoreh.png";
import icoMk from "./image/ico_mk.png";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Box2Content({
  vacant,
  setVacant,
  handleContentState,
  box2Contents,
  newsContentLoading,
  ip,
  contentState,
}) {
  const [haveVoted, handleHaveVoted] = useState(false);
  const [haveVotedLoading, setHaveVotedLoading] = useState(false);
  const [haveVotedError, setHaveVotedError] = useState(false);
  const [haveThinked, handleHaveThinked] = useState(false);
  const [haveThinkedLoading, setHaveThinkedLoading] = useState(false);
  const [haveThinkedError, setHaveThinkedError] = useState(null);
  const [checkLeftRight, handleCheckLeftRight] = useState(null);
  const [checkLeftRightLoading, setCheckLeftRightLoading] = useState(false);
  const [checkLeftRightError, setCheckLeftRightError] = useState(null);
  const [thinkBoxDisabled, setThinkBoxDisabled] = useState(false);
  const [leftBoxDisabled, setLeftBoxDisabled] = useState(true);
  const [leftVoted, handleLeftVoted] = useState(1);
  const [rightVoted, handleRightVoted] = useState(1);
  const [totalRateOfVoted, handleTotalRateOfVoted] = useState(50);

  const pressImage = {
    조선: icoChosun,
    중앙: icoJoongang,
    동아: icoDonga,
    한겨례: icoHankyoreh,
    한경: icoHankyung,
    매경: icoMk,
  };

  async function sendHaveVoted(part) {
    if (leftBoxDisabled) {
      if (haveThinked) {
      } else {
        if (contentState === "진행 중") {
        } else {
        }
      }
      return 0;
    }
    const jsonToSend = { ip: ip, part: part, boxNumber: vacant };
    setCheckLeftRightLoading(true);
    try {
      const response = await axios
        .post(`http://localhost:3000/addVotingIp`, JSON.stringify(jsonToSend), {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          if (response.data === true) {
            console.log("여기임");
            setThinkBoxDisabled(true);
            setLeftBoxDisabled(true);
            handleCheckLeftRight(part);
            if (part === "left") {
              handleLeftVoted((leftVoted) => leftVoted + 1);
            } else {
              handleRightVoted((rightVoted) => rightVoted + 1);
            }
          } else {
          }
        });
    } catch (e) {
      checkLeftRightError(e);
    }
  }

  async function checkHaveVoted(vacant) {
    if (vacant) {
      return 0;
    } else {
      try {
        setHaveVotedLoading(true);
        await axios
          .get(
            `http://localhost:3000/checkIpVoted?ip=${ip}&boxNumber=${vacant}`
          )
          .then((response) => {
            const { voted, leftVoted, rightVoted } = response.data;
            if (voted != false) {
              handleHaveThinked(true);
              handleCheckLeftRight(voted);
              setThinkBoxDisabled(true);
            } else {
              handleHaveThinked(false);
              handleCheckLeftRight(null);
              setThinkBoxDisabled(false);
              setLeftBoxDisabled(true);
            }
            handleLeftVoted(leftVoted);
            handleRightVoted(rightVoted);
          });
      } catch (e) {
        setHaveVotedError(e);
      }
      setHaveVotedLoading(false);
    }
  }

  useEffect(() => {
    checkHaveVoted(vacant);
  }, [vacant]);

  useEffect(() => {
    handleTotalRateOfVoted((leftVoted / (leftVoted + rightVoted)) * 100);
  }, [leftVoted, rightVoted]);

  if (vacant === true) {
    return <div></div>;
  } else if (newsContentLoading === false && haveVotedLoading === false) {
    const { id, title, summary, A, B, newsHistory, linkList } = box2Contents;
    return (
      <div className="newsBox">
        <div className="news-box-close">
          <input
            type="button"
            style={{ display: "none" }}
            id="close-button"
            onClick={() => {
              setVacant(true);
              handleContentState("");
            }}
          ></input>
          <label for="close-button">
            <img src={icoClose} alt="hmm" className="close-button"></img>
          </label>
        </div>
        <div className="newsContent">
          <h1 className="news-box-content-head">{title}</h1>
          <div className="news-box-content-body">
            <div className="summary">{summary}</div>
            <div className="history-container">
              <span className="ll">관련 뉴스 기사</span>
              <div
                className="history-explanation"
                style={{
                  height: `${box2Contents["newsHistory"][0].length * 40}px`,
                }}
              >
                <br></br>
                <div className="newshistory-date news-grid">
                  {box2Contents["newsHistory"][2].map((comp) => {
                    return <li>{"20" + comp}</li>;
                  })}
                </div>
                <BrickBar num={box2Contents["newsHistory"][0].length} />
                <div className="newshistory-sentence news-grid">
                  {box2Contents["newsHistory"][3].map((keynum) => {
                    const [newsSentence, newsLink] = [
                      box2Contents["newsHistory"][0][keynum],
                      box2Contents["newsHistory"][1][keynum],
                    ];
                    return (
                      <div>
                        <a href={newsLink} className="history-news-link">
                          {newsSentence}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="linkBox">
              <h2 className="explaintext">사설 및 칼럼</h2>
              {linkList.map((link) => {
                return (
                  <Link
                    to={link[1]}
                    target="_blank"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <div className="link-to-news">
                      <img
                        className="press-name"
                        alt="hmm"
                        src={pressImage[link[2]]}
                      ></img>
                      <p className="link-title">{link[0]}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <form className="vote-box">
              <div
                className="have-thinked"
                style={{
                  display: contentState !== "진행 중" ? "block" : "none",
                }}
              >
                <span className="voting-sentence">투표가 종료되었습니다.</span>
              </div>
              <div
                className="have-thinked"
                style={{
                  display: contentState === "진행 중" ? "block" : "none",
                }}
              >
                <div className="voting-sentence">투표하기 전에 생각했나요?</div>
                <div className="voting-blocks">
                  <div className="voting-block">
                    <input
                      type="checkbox"
                      className="think-box"
                      id="yes"
                      checked={haveThinked === true}
                      disabled={thinkBoxDisabled}
                    ></input>
                    <label
                      for="yes"
                      onClick={() => {
                        if (thinkBoxDisabled === true) {
                          return 0;
                        }
                        handleHaveThinked(true);
                        setLeftBoxDisabled(null);
                      }}
                    ></label>
                    예
                  </div>
                  <div className="voting-block">
                    <input
                      type="checkbox"
                      className="think-box"
                      id="no"
                      checked={haveThinked === false}
                      disabled={thinkBoxDisabled}
                    ></input>
                    <label
                      for="no"
                      onClick={() => {
                        if (thinkBoxDisabled == true) {
                          return 0;
                        }
                        handleHaveThinked(false);
                        setLeftBoxDisabled("disabled");
                      }}
                    ></label>
                    아니요
                  </div>
                </div>
              </div>
              <div className="left-right-box">
                <div className="left-right-head">
                  여러분의 생각에 투표하세요.
                </div>
                <div className="left-right">
                  <div className="left">
                    <input
                      type="checkbox"
                      className="check-box"
                      id="left"
                      checked={checkLeftRight === "left"}
                      disabled={leftBoxDisabled}
                    ></input>
                    <label
                      for="left"
                      onClick={() => {
                        sendHaveVoted("left");
                      }}
                    ></label>
                    <span className="lrcomment l">{A}</span>
                  </div>
                  <div className="right">
                    <input
                      type="checkbox"
                      className="check-box"
                      id="right"
                      checked={checkLeftRight === "right"}
                      disabled={leftBoxDisabled}
                    ></input>
                    <label
                      for="right"
                      onClick={() => {
                        sendHaveVoted("right");
                      }}
                    ></label>
                    <span className="lrcomment r">{B}</span>
                  </div>
                </div>
              </div>
              <div className="submit-button-block">
                <button
                  type="submit"
                  className="submit-button"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  참여하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="newsBox 음">
        nonononono!<br></br>
        <img className="loading" src={loading}></img>
      </div>
    );
  }
}

/** 
  <div className="gradient-block-chart"
    style={{
      background:
        contentState !== "진행 중" || checkLeftRight == null
          ? "grey"
          : `linear-gradient(90deg, red ,${totalRateOfVoted}% , blue)`,
    }}
  ></div>
 
 */
