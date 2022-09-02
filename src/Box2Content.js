import './Box2Content.css'
import loading from './minjaeremoved.png'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Box2Content({
  state,
  box2Contents,
  newsContentLoading,
  ip,
  contentState,
}) {
  const [haveVoted, handleHaveVoted] = useState(false)
  const [haveVotedLoading, setHaveVotedLoading] = useState(false)
  const [haveVotedError, setHaveVotedError] = useState(false)
  const [haveThinked, handleHaveThinked] = useState(false)
  const [haveThinkedLoading, setHaveThinkedLoading] = useState(false)
  const [haveThinkedError, setHaveThinkedError] = useState(null)
  const [checkLeftRight, handleCheckLeftRight] = useState(null)
  const [checkLeftRightLoading, setCheckLeftRightLoading] = useState(false)
  const [checkLeftRightError, setCheckLeftRightError] = useState(null)
  const [thinkBoxDisabled, setThinkBoxDisabled] = useState(false)
  const [leftBoxDisabled, setLeftBoxDisabled] = useState(true)
  const [leftVoted, handleLeftVoted] = useState(1)
  const [rightVoted, handleRightVoted] = useState(1)
  const [totalRateOfVoted, handleTotalRateOfVoted] = useState(50)

  const pressColor = {
    조선: 'rgb(193, 54, 50)',
    중앙: 'rgb(226, 71, 40)',
    동아: 'rgb(56, 126, 128)',
    한겨례: 'rgb(61, 141, 136)',
    한경: 'rgb(18, 41, 123)',
    매경: 'rgb(226, 122, 47)',
  }

  async function sendHaveVoted(part) {
    if (leftBoxDisabled) {
      if (haveThinked) {
        alert('투표 결과를 바꿀 순 없어요!')
      } else {
        if (contentState === '진행 중') {
          alert('생각 후에 투표해 주세요!')
        } else {
          alert('놓친 기회는 돌아오지 않아요!')
        }
      }
      return 0
    }
    const jsonToSend = { ip: ip, part: part, boxNumber: state }
    setCheckLeftRightLoading(true)
    try {
      const response = await axios
        .post(`http://localhost:3000/addVotingIp`, JSON.stringify(jsonToSend), {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          if (response.data === true) {
            console.log('여기임')
            setThinkBoxDisabled(true)
            setLeftBoxDisabled(true)
            handleCheckLeftRight(part)
            if (part === 'left') {
              handleLeftVoted((leftVoted) => leftVoted + 1)
            } else {
              handleRightVoted((rightVoted) => rightVoted + 1)
            }

            console.log(totalRateOfVoted)
          } else {
            console.log(response.data)
            alert('이미 생각해서 투표 하셨잖아요?')
          }
        })
    } catch (e) {
      checkLeftRightError(e)
      console.log(e)
      alert('새로고침 후 다시 시도해주세요')
    }
  }

  async function checkHaveVoted(state) {
    if (state === 'vacant') {
      console.log('여기임')
      return 0
    } else {
      try {
        setHaveVotedLoading(true)
        await axios
          .get(`http://localhost:3000/checkIpVoted?ip=${ip}&boxNumber=${state}`)
          .then((response) => {
            const { voted, leftVoted, rightVoted } = response.data
            if (voted != false) {
              handleHaveThinked(true)
              handleCheckLeftRight(voted)
              setThinkBoxDisabled(true)
              alert('이미 투표 하셨군요!')
            } else {
              handleHaveThinked(false)
              handleCheckLeftRight(null)
              setThinkBoxDisabled(false)
              setLeftBoxDisabled(true)
            }
            handleLeftVoted(leftVoted)
            handleRightVoted(rightVoted)
          })
      } catch (e) {
        setHaveVotedError(e)
      }
      setHaveVotedLoading(false)
    }
  }

  useEffect(() => {
    checkHaveVoted(state)
  }, [state])

  useEffect(() => {
    handleTotalRateOfVoted((leftVoted / (leftVoted + rightVoted)) * 100)
  }, [leftVoted, rightVoted])

  if (state === 'vacant') {
    return <div className="boxDefault"> 왼쪽에서 골라 보자 </div>
  } else {
    if (newsContentLoading == false && haveVotedLoading == false) {
      const { id, title, summary, A, B, linkList } = box2Contents
      return (
        <div className="newsBox">
          <div
            className="newsContent"
            style={{
              backgroundColor:
                contentState === '진행 중'
                  ? 'rgba(102, 170, 243, 0.1)'
                  : 'rgba(168, 168, 168, 0.2)',
            }}
          >
            <div className="summary">{summary}</div>
            <div
              className="have-thinked"
              style={{ display: contentState !== '진행 중' ? 'block' : 'none' }}
            >
              <span className="voting-sentence">투표가 종료되었습니다.</span>
            </div>
            <div
              className="have-thinked"
              style={{ display: contentState === '진행 중' ? 'block' : 'none' }}
            >
              <span className="voting-sentence">투표하기 전에 생각했나요?</span>
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
                  if (thinkBoxDisabled == true) {
                    return 0
                  }
                  handleHaveThinked(true)
                  alert('투표 결과는 바꿀 수 없으니, 신중히 선택해 주세요!')
                  setLeftBoxDisabled(null)
                }}
              ></label>
              예
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
                    alert('생각하셨다면서요?')
                    return 0
                  }
                  handleHaveThinked(false)
                  setLeftBoxDisabled('disabled')
                }}
              ></label>
              아니요 <br></br>
            </div>
            <div
              style={{
                textAlign: 'center',
              }}
              className="left-right-box"
            >
              <div className="left-right">
                <span className="left">
                  <input
                    type="checkbox"
                    className="check-box"
                    id="left"
                    checked={checkLeftRight === 'left'}
                    disabled={leftBoxDisabled}
                  ></input>
                  <label
                    for="left"
                    onClick={() => {
                      sendHaveVoted('left')
                    }}
                  ></label>
                  <span className="lrcomment l">{A}</span>
                </span>
                <span className="right">
                  <span className="lrcomment r">{B}</span>
                  <input
                    type="checkbox"
                    className="check-box"
                    id="right"
                    checked={checkLeftRight === 'right'}
                    disabled={leftBoxDisabled}
                  ></input>
                  <label
                    for="right"
                    onClick={() => {
                      sendHaveVoted('right')
                    }}
                  ></label>
                </span>
              </div>
              <div
                className="gradient-block-chart"
                style={{
                  background:
                    contentState === '진행중' && checkLeftRight == null
                      ? 'grey'
                      : `linear-gradient(90deg, red ,${totalRateOfVoted}% , blue)`,
                }}
              ></div>
            </div>
          </div>
          <div className="linkBox">
            <span className="explaintext">관련 뉴스 기사</span>
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
              )
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div className="newsBox 음">
          준비가 되지 않았어요!<br></br>
          <img className="loading" src={loading}></img>
        </div>
      )
    }
  }
}
