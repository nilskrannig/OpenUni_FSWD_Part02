import { CountryDetails } from "./CountryDetails";
import { WeatherDetails } from "./WeatherDetails";

export const SearchResult = ({ countries, onClick }) => {
  if (countries.length > 10) return (<div>Too many matches, specify another filter</div>);

  if (countries.length > 1 && countries.length < 10) {
    return (
      <ul>
        {countries.map(country => {
          return <div key={country.name?.common}>
            <li>
              {country.name?.common}
              <button onClick={() => onClick(country)}>show</button>
            </li>
          </div>;
        })}
      </ul>
    );
  }
  if (countries.length == 1) {
    const country = countries[0];

    return (
      <>
        <CountryDetails country={country} />
        <WeatherDetails country={country} />
      </>
    );
  }
};
