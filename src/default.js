import './default.css'
import minjae from './minjaeremoved.png'
import { useState, useEffect } from 'react'
import axios from 'axios'

async function getImage(handleImage) {
  const response = await axios.get('http://localhost:3000/getimage', {
    responseType: 'blob',
  })
  const imgUrl = URL.createObjectURL(response.data)
  console.log(imgUrl)
  console.log(response.data)
  handleImage(imgUrl)
}

export default function Initial({ handleCurSide }) {
  const [isHover, handleIsHover] = useState(false)
  const [fileimage, setFileImage] = useState('')

  useEffect(() => {
    getImage(setFileImage)
  }, [])

  return (
    <div
      className="default"
      style={{ backgroundColor: isHover ? 'black' : 'white' }}
    >
      <img
        src={fileimage}
        alt="ㄱㄷ"
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
