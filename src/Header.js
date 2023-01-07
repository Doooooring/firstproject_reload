import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import minjae from "./minjae.jpeg";
import logo from "./image/ico_logo.png";

export default function Header({ setVacant }) {
  return (
    <header className="header">
      <div className="header-body">
        <div className="logo-img-box">
          <Link to="/" className="nav-link">
            <img
              className="logo"
              alt="어디갔냐"
              src={logo}
              height="40px"
              onClick={() => {}}
            />
          </Link>
        </div>
        <div className="navigation-box">
          <NavLink
            to="/contents2"
            onClick={() => {
              setVacant(true);
            }}
            style={({ isActive }) =>
              isActive
                ? {
                    borderBottom: "3px solid rgb(61, 152, 247)",
                    color: "rgb(61, 152, 247)",
                  }
                : {
                    borderBottom: "none",
                    color: "grey",
                  }
            }
            className="nav-link"
          >
            뉴스 모아보기
          </NavLink>
          <div className="blank"></div>
          <NavLink
            to="/contents1"
            onClick={() => {
              setVacant(true);
            }}
            style={({ isActive }) =>
              isActive
                ? {
                    borderBottom: "3px solid rgb(61, 152, 247)",
                    color: "rgb(61, 152, 247)",
                  }
                : {
                    borderBottom: "none",
                    color: "grey",
                  }
            }
            className="nav-link"
          >
            키워드 검색
          </NavLink>
          <div className="blank"></div>
          <NavLink
            to="/contents3"
            onClick={() => {
              setVacant(true);
            }}
            style={({ isActive }) =>
              isActive
                ? {
                    borderBottom: "3px solid rgb(61, 152, 247)",
                    color: "rgb(61, 152, 247)",
                  }
                : {
                    borderBottom: "none",
                    color: "grey",
                  }
            }
            className="nav-link"
          >
            정치 성향 테스트
          </NavLink>
          <div className="blank"></div>
          <NavLink
            to="/contactPage"
            onClick={() => {
              setVacant(true);
            }}
            style={({ isActive }) =>
              isActive
                ? {
                    borderBottom: "3px solid rgb(61, 152, 247)",
                    color: "rgb(61, 152, 247)",
                  }
                : {
                    borderBottom: "none",
                    color: "grey",
                  }
            }
            className="nav-link"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </header>
  );
}
