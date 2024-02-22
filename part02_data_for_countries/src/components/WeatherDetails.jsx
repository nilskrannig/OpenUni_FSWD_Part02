import axios from "axios"
import { useEffect, useState } from "react"

export const WeatherDetails = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const [iconCode, setIconCode] = useState('')
    const api_key = import.meta.env.VITE_OPEN_WEATHER_KEY

    useEffect(() => {
        getWeather(country)
    }, [])

    const getWeather = (country) => {
        axios
            .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${country.latlng[0]}&lon=${country.latlng[1]}&&exclude={minutely,hourly,daily,alerts}&units=metric&appid=${api_key}`)
            .then(response => {
                setWeather(response.data.current)
                setIconCode(response.data.current?.weather[0]?.icon)
            })
    }

    return <>
    <h2>Weather in {country.name.common}</h2>
        <p>temperature {weather?.temp} C°</p>
        <img src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}></img>
        <p>wind {weather?.wind_speed} m/s</p>
    </>
}