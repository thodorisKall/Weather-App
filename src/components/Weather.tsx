import React, { useState, useEffect, FC } from "react"

import {
  FaCloudBolt,
  FaCloudRain,
  FaCloudShowersHeavy,
  FaSnowflake,
  FaCloud,
  FaLocationCrosshairs,
} from "react-icons/fa6"

import {
  WiFog,
  WiSandstorm,
  WiHumidity,
  WiBarometer,
  WiSolarEclipse,
  WiDaySunnyOvercast,
} from "react-icons/wi"

import {
  GeocodeResponse,
  AddressComponent,
  Geometry,
  Bounds,
  LatLng,
} from "../Interfaces/GeoApi"

import {
  OpenWeatherResponse,
  Coordinates,
  WeatherDetails,
  Main,
  Clouds,
  Sys,
} from "../Interfaces/OpenWeather"

const Weather: React.FC = () => {
  const [lattitude, setLattitude] = useState<number | null>()
  const [longtitude, setLongtitude] = useState<number | null>()
  const [location, setLocation] = useState<GeocodeResponse | null>()
  const [address, setAddress] = useState<string | null>()
  const [weather, setWeather] = useState<OpenWeatherResponse | null>()
  const geo_API_KEY: string = "AIzaSyAqbBzQOed0gRg4WfsndM874jJf1Vv5n_o"
  const openWeather_API_KEY: string = "cdae50bde18e7f347886422012156661"

  const getLocation = (): void => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geo_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLocation(data)
        setLattitude(data.results[0].geometry.location.lat)
        setLongtitude(data.results[0].geometry.location.lng)
        console.log(data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const getWeather = (): void => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longtitude}&appid=${openWeather_API_KEY}&weather&units=metric `
    )
      .then((response) => response.json())
      .then((data) => {
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

  const getSkyIcon = (value: string) => {
    switch (value) {
      case "Thunderstorm":
        return <FaCloudBolt />
      case "Drizzle":
        return <FaCloudRain />
      case "Rain":
        return <FaCloudShowersHeavy />
      case "Snow":
        return <FaSnowflake />
      case "Mist":
        return <WiFog />
      case "Fog":
        return <WiFog />
      case "Sand":
        return <WiSandstorm />
      case "Clear":
        return <WiSolarEclipse />
      case "Clouds":
        return <FaCloud />
      default:
        // default icon
        return <WiDaySunnyOvercast />
    }
  }

  useEffect(() => {
    if (lattitude && longtitude) {
      getWeather()
    }
  }, [lattitude, longtitude])

  return (
    <div className='weather'>
      <div className='weather__search'>
        <form>
          <FaLocationCrosshairs id='search--pin' />
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
          <p>{longtitude}</p>
        </div>
        <div className='weather__details--Humidity'>
          <h4>Pressure</h4>
          <p>{lattitude}</p>
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
