import React, { useState } from "react"
import "./styles.css"
import Display from "./Components/Display"
import { MdAdsClick } from "react-icons/md"
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [showComponent, setShowComponent] = useState<boolean>(false)
  return (
    <div className='app'>
      {!showComponent && (
        <>
          <Analytics />
          <div className='app__text'>
            <h1>SkySight</h1>
            <p>
              Discover your city's weather forecast today at your fingertips.
            </p>
          </div>
          <div className='app__button'>
            <button onClick={() => setShowComponent(!showComponent)}>
              Explore
            </button>
          </div>
          <h5 id='developed'>
            Developed by
            <a href='https://www.thodoriskallioras.com' target='_blank'>
              Thodoris Kallioras <MdAdsClick />
            </a>
          </h5>
        </>
      )}

      {showComponent && <Display />}
    </div>
  )
}

export default App
