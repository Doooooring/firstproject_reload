import './default.css'
import minjae from './minjaeremoved.png'
import { useState } from 'react'

export default function Initial() {
  const [isHover, handleIsHover] = useState(false)
  return (
    <div
      className="default"
      style={{ backgroundColor: isHover ? 'black' : 'rgb(181, 195, 191)' }}
    >
      <img
        src={minjae}
        className="minjae"
        onMouseOver={() => {
          handleIsHover(true)
        }}
        onMouseLeave={() => {
          handleIsHover(false)
        }}
      ></img>
    </div>
  )
}
