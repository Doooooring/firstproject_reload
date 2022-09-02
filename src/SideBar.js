import fire from './image/fire.png'
import memo from './image/memo.png'
import speaker from './image/speaker.png'
import './SideBar.css'
import { Link, NavLink } from 'react-router-dom'
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers'
import { useRef } from 'react'

function getLinkStyle({ isActive }) {
  return {
    fontWeight: isActive ? '800' : '500',
    color: isActive ? 'rgb(30, 87 ,134)' : 'grey',
  }
}

export default function Side({ changeFilled, curSide, handleCurSide }) {
  const cur = useRef()
  return (
    <div
      className="sidebar"
      onChange={() => {
        console.log('dakndlan')
      }}
    >
      <div className="sideContainer">
        <NavLink
          to="./contents1"
          onClick={() => {
            changeFilled('vacant')
            handleCurSide('side1')
          }}
          style={getLinkStyle}
          className="menu menu1"
        >
          <span style={{ filter: curSide !== 'side1' ? 'grayscale()' : null }}>
            <img src={fire} alt="음" className="side-image"></img>
          </span>{' '}
          HOT 정치 키워드
        </NavLink>
        <NavLink
          to="./contents2"
          onClick={(e) => {
            changeFilled('vacant')
            handleCurSide('side2')
          }}
          style={getLinkStyle}
          className="menu menu2"
        >
          {' '}
          <span style={{ filter: curSide !== 'side2' ? 'grayscale()' : null }}>
            <img src={speaker} alt="음" className="side-image"></img>
          </span>{' '}
          지금 알아야 할 뉴스
        </NavLink>
        <NavLink
          to="./contents3"
          onClick={() => {
            changeFilled('vacant')
            handleCurSide('side3')
          }}
          style={getLinkStyle}
          className="menu"
        >
          <span style={{ filter: curSide !== 'side3' ? 'grayscale()' : null }}>
            <img src={memo} alt="음" className="side-image"></img>
          </span>{' '}
          정치 성향 테스트
        </NavLink>
      </div>
    </div>
  )
}
