import React, { useState, useEffect, FC } from "react"

import { BsClouds } from "react-icons/bs"

import {
  FaCloudBolt,
  FaCloudRain,
  FaCloudShowersHeavy,
  FaSnowflake,
  FaLocationCrosshairs,
} from "react-icons/fa6"

import {
  WiFog,
  WiSandstorm,
  WiHumidity,
  WiBarometer,
  WiSolarEclipse,
  WiDaySunnyOvercast,
  WiStrongWind,
  WiCelsius,
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

interface bgStyle {
  bgImage: string
}

const Weather: React.FC = () => {
  const [lattitude, setLattitude] = useState<number | null>()
  const [longtitude, setLongtitude] = useState<number | null>()
  const [location, setLocation] = useState<GeocodeResponse | null>()
  const [address, setAddress] = useState<string | null>()
  const [weatherData, setWeatherData] = useState<OpenWeatherResponse | null>()
  const [spinnerActive, setSpinnerActive] = useState<boolean>(false)
  const geoApiKey: string = process.env.REACT_APP_GEO_API_KEY as string
  const weatherApiKey: string = process.env.REACT_APP_WEATHER_API_KEY as string

  if (!weatherApiKey || !geoApiKey) {
    throw new Error("Enviroment Vars have not assigned yet ")
  }

  const getLocation = (): void => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geoApiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLocation(data)
        setLattitude(data.results[0].geometry.location.lat)
        setLongtitude(data.results[0].geometry.location.lng)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const getWeather = (): void => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longtitude}&appid=${weatherApiKey}&weather&units=metric `
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      setSpinnerActive(true)
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
        return <BsClouds />
      default:
        return <WiDaySunnyOvercast />
    }
  }

  const getBackground = (value: string) => {
    switch (value) {
      case "Thunderstorm":
        return "thunderBg"
      case "Drizzle":
        return "rainBg"
      case "Rain":
        return "heavyRainBg"
      case "Snow":
        return "snowBg"
      case "Mist":
        return "mistBg"
      case "Fog":
        return "fogBg"
      case "Sand":
        return "sandBg"
      case "Clear":
        return "clearBg"
      case "Clouds":
        return "cloudsBg"
      default:
        return "fogBg"
    }
  }

  let dynamicBg: bgStyle | undefined
  if (weatherData) {
    dynamicBg = {
      bgImage: getBackground(weatherData.weather[0].main),
    }
  }

  useEffect(() => {
    if (lattitude && longtitude) {
      getWeather()
    }
  }, [lattitude, longtitude])

  return (
    <div
      className={"weather " + (dynamicBg?.bgImage ? dynamicBg?.bgImage : "")}
    >
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
      {weatherData ? (
        <>
          <div className='weather__status'>
            <p>{getSkyIcon(weatherData.weather[0].main)}</p>
            <h3>{weatherData.weather[0].description}</h3>
          </div>
          <div className='weather__temp'>
            <h5>{weatherData.name}</h5>
            <h3>
              {Math.round(weatherData.main.temp)} <span> &#8451;</span>
            </h3>
          </div>
          <div className='weather__details'>
            <div className='weather__details--Humidity'>
              <h4>Humidity</h4>
              <p>
                {weatherData.main.humidity}
                <WiHumidity />
              </p>
            </div>
            <div className='weather__details--Pressure'>
              <h4>Feels like</h4>
              <p>
                {weatherData.main.feels_like}
                <span> &#8451;</span>
              </p>
            </div>
            <div className='weather__details--Wind'>
              <h4>Wind Speed</h4>
              <p>
                {weatherData.wind.speed}
                <WiStrongWind />
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className={spinnerActive ? "lds-ellipsis" : "disabled"}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  )
}

export default Weather
