import "./Box2Content.css";

import loading from "./minjaeremoved.png";
import icoClose from "./image/ico_close.png";

import { useState, useEffect } from "react";
import axios from "axios";

function MakeBrickBar({ num }) {
  const iterationBlock = new Array(num - 1).fill(0);
  return (
    <div className="brick-bar hh">
      <div className="corner-brick brick"></div>
      {iterationBlock.map(() => {
        return <div className="middle-brick brick"></div>;
      })}
      <div className="corner-brick brick"></div>
    </div>
  );
}

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

  const pressColor = {
    조선: "rgb(193, 54, 50)",
    중앙: "rgb(226, 71, 40)",
    동아: "rgb(56, 126, 128)",
    한겨례: "rgb(61, 141, 136)",
    한경: "rgb(18, 41, 123)",
    매경: "rgb(226, 122, 47)",
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
              <div className="history-explanation">
                <br></br>
                <div className="newshistory-date hh">
                  {box2Contents["newsHistory"][2].map((comp) => {
                    if (box2Contents["newsHistory"][2][0] === comp) {
                      return <li>{"20" + comp}</li>;
                    } else {
                      return <li>{comp}</li>;
                    }
                  })}
                </div>
                <MakeBrickBar num={box2Contents["newsHistory"][0].length} />
                <div className="newshistory-sentence hh">
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
              <span className="explaintext">사설 및 칼럼</span>
              {linkList.map((link) => {
                return (
                  <a href={link[1]} target="_blank" className="linkToNews">
                    <div
                      className="press-name"
                      style={{ backgroundColor: pressColor[link[2]] }}
                    >
                      {link[2]}
                    </div>
                    <span className="link-title">{link[0]}</span>
                  </a>
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
                <button type="submit" className="submit-button">
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
