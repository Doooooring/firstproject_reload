import './SideBar.css'
import { Link, NavLink } from 'react-router-dom'
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers'

function getLinkStyle({ isActive }) {
  return {
    backgroundColor: isActive ? 'rgb(102, 184, 102)' : 'rgb(051, 102, 51)',
    color: isActive ? 'rgb(0, 71, 0)' : 'rgb(153, 204 ,153)',
    border: isActive ? 'solid 2px white' : 'none',
  }
}
export default function side({ changeFilled }) {
  return (
    <div className="sidebar">
      <div className="sideContainer">
        <NavLink
          to="./contents1"
          onClick={() => {
            changeFilled('vacant')
          }}
          style={getLinkStyle}
          className="menu menu1"
        >
          🔥 Hot 키워드
        </NavLink>
        <NavLink
          to="./contents2"
          onClick={() => {
            changeFilled('vacant')
          }}
          style={getLinkStyle}
          className="menu"
        >
          {' '}
          👍 이 정도는 좀 알자
        </NavLink>
        <NavLink
          to="./contents3"
          onClick={() => {
            changeFilled('vacant')
          }}
          style={getLinkStyle}
          className="menu"
        >
          ❔ '그' 테스트
        </NavLink>
      </div>
    </div>
  )
}
