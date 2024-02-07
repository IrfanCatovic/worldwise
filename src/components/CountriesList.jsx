/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountriesList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="add your first city by clicking a city on the map" />
    );

  const countries = cities.reduce((arr, cur) => {
    if (!arr.map((el) => el.country).includes(cur.country))
      return [...arr, { country: cur.country, emoji: cur.emoji }];
    else return arr;
  }, []);
  //acumulator i current value, starteing is empty array
  //radi se o gradovima, umesto cur mozemo da napisemo city

  //proveravamo da li zemlja NIJE u postojecem arrayu, ako nije onda se kreira novi array
  //od postojeceg kopiravmo sve u novo i dodajemo novu zemlju
  return (
    <div>
      <ul className={styles.countryList}>
        {countries.map((country) => (
          <CountryItem country={country} key={country.country} />
        ))}
      </ul>
    </div>
  );
}

export default CountriesList;
