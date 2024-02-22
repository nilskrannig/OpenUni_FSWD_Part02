import { useEffect, useState } from "react"
import axios from 'axios'
import { SearchResult } from "./components/SearchResult"

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

  const showCountryDetails = (country) => {
    setFilter(country.name.common.toLowerCase())
  }

  const filteredCountries = filter ? countries.filter(country => {
    return country.name?.common?.toLowerCase().includes(filter)
  }) : countries;

  return (
    <div>
      <h1>Country Information Page</h1>
      <form onSubmit={searchCountry}>
        <input value={searchValue} onChange={handleSearchChange} />
      </form>
      <SearchResult countries={filteredCountries} onClick={showCountryDetails} />
    </div>
  )
}

export default App
