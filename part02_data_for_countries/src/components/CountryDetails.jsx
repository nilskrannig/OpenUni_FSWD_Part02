export const CountryDetails = ({ country }) => {
  const languages = country.languages;

  return <div>
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
        return <li key={lang[0]}>{lang[1]}</li>;
      })}
    </ul>
    <img src={country.flags.png} alt="country flag" />
  </div>;
};
