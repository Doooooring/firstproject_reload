import axios from 'axios'
import './boxComponent.css'

export default function BoxRendering(props) {
  const item = props.item
  const vacant = props.vacant
  const changeFilled = props.changeFilled
  const setNewsContentLoading = props.setNewsContentLoading
  const setItemError = props.setItemError
  const setBox2Contents = props.setBox2Contents
  const { id, title, subtitle, termStart, termEnd, state, key } = item
  let back
  function open(boxNum) {
    if (vacant === boxNum) {
      changeFilled('vacant')
    } else if (vacant === 'vacant') {
      changeFilled(boxNum)
    } else {
      changeFilled(boxNum)
    }
  }

  async function showNewsContent(id) {
    try {
      setItemError(null)
      setNewsContentLoading(true)
      const response = await axios.get(
        `http://localhost:3000/newscontent/${id}`,
      )
      if ('id' in response.data) {
        setBox2Contents(response.data)
        setNewsContentLoading(false)
      } else {
        console.log(response.data)
        return 0
      }
    } catch (e) {
      setItemError(false)
    }
  }
  if (state === '진행 중') {
    back = 'continue'
  } else if (state === '흐지부지..') {
    back = 'blank'
  } else {
    back = 'end'
  }
  return (
    <div
      className={'box '.concat(back) + ' ' + (vacant == id && ' clicked')}
      onClick={() => {
        open(id)
        showNewsContent(id)
      }}
    >
      <div className="back">
        <h1 className={'title ' + (vacant !== id && 'subcomp')}>{title}</h1>
        <div className="termState">
          <span className={'subtitle ' + (vacant !== id && 'subcomp')}>
            {subtitle}
          </span>
          <span
            className={'term ' + (vacant !== id && 'subcomp')}
          >{`${termStart} ~ ${termEnd}`}</span>
        </div>
        <h3 className={'state ' + (vacant !== id && 'subcomp')}>{state}</h3>
      </div>
      <div
        className={'front '.concat(back)}
        style={{
          display: vacant === id ? 'none' : 'block',
          color: 'white',
          fontSize: '25px',
          fontWeight: '700',
        }}
      >
        {title}
      </div>
    </div>
  )
}
