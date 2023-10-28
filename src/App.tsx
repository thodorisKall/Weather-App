import React, { useState } from "react"
import "./styles.css"
import Weather from "./Components/Weather"

function App() {
  const [showComponent, setShowComponent] = useState<boolean>(false)
  return (
    <div className='app'>
      {!showComponent && (
        <>
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
        </>
      )}

      {showComponent && <Weather />}
    </div>
  )
}

export default App
