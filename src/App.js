import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Header from './Header.js'
import SideBar from './SideBar.js'
import Contents1 from './Contents1.js'
import Contents2 from './Contents2.js'
import Contents3 from './Contents3.js'
import { useState } from 'react'
import Default from './default.js'

function App() {
  const [vacant, changeFilled] = useState('vacant')
  const vacantChangevalue = (value) => {
    changeFilled(value)
  }
  return (
    <BrowserRouter className="App">
      <Header />
      <SideBar changeFilled={changeFilled} />
      <Routes>
        <Route exact path="/" element={<Default />} />
        <Route path="/contents1" element={<Contents1 />} />
        <Route
          path="/contents2"
          element={
            <Contents2
              vacant={vacant}
              vacantfunction={(e) => vacantChangevalue(e)}
            />
          }
        />
        <Route path="/contents3" element={<Contents3 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
