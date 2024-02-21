import { useEffect, useState } from "react"
import axios from 'axios'

const SearchResult = ({ countries }) => {
  if (countries.length > 10) return (<div>Too many matches, specify another filter</div>)

  if (countries.length > 1 && countries.length < 10) {
    return (
      <ul>
        {countries.map(country => <li key={country.name?.common}>{country.name?.common}</li>)}
      </ul>
    )
  }
  if (countries.length == 1) {
    const country = countries[0]
    const languages = country.languages

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>
          capital: {country.capital[0]}
        </p>
        <p>
          area: {country.area}
        </p>

        <h3>languages:</h3>
        <ul>
          {Object.entries(languages).map((lang) => {
            return <li key={lang[0]}>{lang[1]}</li>
          })}
        </ul>
        <img src={country.flags.png} alt="country flag" />
      </div>
    )

  }
}

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => setCountries(response.data))
  }, [])

  const searchCountry = (event) => {
    event.preventDefault()
    setFilter(searchValue)
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const filteredCountries = filter ? countries.filter(country => {
    return country.name?.common?.toLowerCase().includes(filter)
  }) : countries;

  return (
    <div>
      <form onSubmit={searchCountry}>
        <input value={searchValue} onChange={handleSearchChange} />
      </form>
      <SearchResult countries={filteredCountries} />
    </div>
  )
}

export default App
