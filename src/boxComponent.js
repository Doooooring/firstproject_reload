import axios from 'axios'
import './boxComponent.css'

export default function BoxRendering(props) {
  const item = props.item
  const vacant = props.vacant
  const changeFilled = props.changeFilled
  const setNewsContentLoading = props.setNewsContentLoading
  const setItemError = props.setItemError
  const setBox2Contents = props.setBox2Contents
  const handleContentState = props.handleContentState
  const { id, title, subtitle, termStart, termEnd, state, key } = item
  let back

  function open(boxNum) {
    if (vacant === boxNum) {
      changeFilled('vacant')
      handleContentState('')
    } else if (vacant === 'vacant') {
      changeFilled(boxNum)
      handleContentState(state)
    } else {
      changeFilled(boxNum)
      handleContentState(state)
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
        console.log(response.data)
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
  } else {
    back = 'end'
  }
  return (
    <div
      className={'box ' + `front${back} ` + (vacant == id && ' clicked')}
      onClick={() => {
        open(id)
        showNewsContent(id)
      }}
    >
      <div className={'back '.concat(back)}></div>
      <img
        src={`http://localhost:3000/${id}.png`}
        className="box-component-image"
      ></img>
      <div className={'title ' + (vacant !== id && 'subcomp')}>
        <span className="subBox">{title}</span>
      </div>
    </div>
  )
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
