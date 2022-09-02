import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Header from './Header.js'
import SideBar from './SideBar.js'
import Contents1 from './Contents1.js'
import Contents2 from './Contents2.js'
import Contents3 from './Contents3.js'
import LoadingPage from './loadingPage.js'
import { useState, useEffect } from 'react'
import Default from './default.js'
import axios from 'axios'

function App() {
  const [vacant, changeFilled] = useState('vacant')
  const [IpLoading, setIpLoading] = useState(false)
  const [IpError, setIpError] = useState(null)
  const [curSide, handleCurSide] = useState('')
  const vacantChangevalue = (value) => {
    changeFilled(value)
  }
  const [ip, handleIp] = useState('')

  const getIp = async () => {
    setIpLoading(true)
    try {
      const res = await axios.get('https://geolocation-db.com/json/')
      console.log(res.data)
      handleIp(res.data.IPv4)
    } catch (e) {
      setIpError(e)
      alert('다시 시도해보렴!')
    }
    setIpLoading(false)
  }

  useEffect(() => {
    getIp()
  }, [])

  if (IpLoading) {
    return <LoadingPage />
  } else {
    return (
      <div
        style={{ minHeight: '1080px', minWidth: '1440px', overflow: 'hidden' }}
      >
        <BrowserRouter className="App">
          <Header handleCurSide={handleCurSide} />
          <SideBar
            changeFilled={changeFilled}
            curSide={curSide}
            handleCurSide={handleCurSide}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={<Default handleCurSide={handleCurSide} />}
            />
            <Route path="/contents1" element={<Contents1 ip={ip} />} />
            <Route
              path="/contents2"
              element={
                <Contents2
                  ip={ip}
                  vacant={vacant}
                  vacantfunction={(e) => vacantChangevalue(e)}
                />
              }
            />
            <Route path="/contents3" element={<Contents3 />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
