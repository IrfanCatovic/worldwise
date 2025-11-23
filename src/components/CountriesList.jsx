/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCitis } from "../contexts/CitiesContext";

function CountriesList() {
  const { cities, isLoading } = useCitis();

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
  //iz cities pravimo niz countries bez duplikata, a to tacno radi tako sto koristi reduce, a ona prolazi kroz ceo niz i pravi novi niz sa samo jedinstevnim zemljama 
  //if (!arr.map((el) => el.country).includes(cur.country)) ovo ustvari znaci da ako u nasem novom nizu arr ne postoji vec ta zemlja iz cities niza onda je dodajemo u arr
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
