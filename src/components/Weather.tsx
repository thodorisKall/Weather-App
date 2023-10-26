import React, { useState, FC } from "react"
import {
  FaCloudBolt,
  FaCloudRain,
  FaCloudShowersHeavy,
  FaCloudSun,
  FaSun,
  FaLocationDot,
} from "react-icons/fa6"

const Weather: FC = () => {
  const [location, setLocation] = useState<any>("")
  const [address, setAddress] = useState<string | null>("")
  const geo_API_KEY: string = "AIzaSyB_3Exh3ueUgeh52-aJZF3QbOfW-lr903M"
  const getLocation = (): void => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=https://maps.googleapis.com/maps/api/geocode/json?address={address}&key=${geo_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLocation(data)
        console.log(data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key == "Enter") {
      event.preventDefault()
      getLocation()
    }
  }

  return (
    <div className='weather'>
      <div className='weather__search'>
        <form>
          <FaLocationDot id='search--pin' />
          <input
            type='text'
            placeholder='Enter City or Address'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAddress(event.target.value)
            }
            onKeyPress={handleKeyPress}
          />
        </form>
      </div>
      <div className='weather__status'>
        <p>(clouds)</p>
        <h3>Partly Cloudy</h3>
      </div>
      <div className='weather__temp'>
        <h3>22&#8451;</h3>
      </div>
      <div className='weather__details'>
        <div className='weather__details--Humidity'>
          <h4>Humidity</h4>
          <p>40%</p>
        </div>
        <div className='weather__details--Humidity'>
          <h4>Pressure</h4>
          <p>500mg</p>
        </div>
        <div className='weather__details--Humidity'>
          <h4>Visibility</h4>
          <p>70%</p>
        </div>
      </div>
    </div>
  )
}

export default Weather
