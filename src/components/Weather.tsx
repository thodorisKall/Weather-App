import React, { useState, FC } from "react"

const Weather: FC = () => {
  return (
    <div className='weather'>
      <div className='weather__search'>
        <form>
          <input type='text' placeholder='Enter City or Address' />
        </form>
      </div>
      <div className='weather__status'>
        <p>(clouds)</p>
        <h3>Partly Cloudy</h3>
      </div>
      <div className='weather__temp'>
        <h3>22C</h3>
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
