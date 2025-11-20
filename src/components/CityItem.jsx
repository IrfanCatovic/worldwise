/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCitis } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCitis();
  //currentCity nam treba da bismo znali koji je trenutno selektovani grad, a dobijamo ga iz contexta
  //da bismo mogli da dodamo stil aktivnog grada u listi
  //currentCity ustvari dobijamo tako sto u city componenti dobijamo grad na osnovu id-ja iz url-a
  //a zatim taj grad smestamo u currentCity u contextu
  //a city componenta je ustvari komponenta koja se renderuje kada kliknemo na neki grad iz liste i idemo na rutu cities/:id


  const { cityName, emoji, date, id, position } = city;
  //destrukturisemo city objekat koji dobijamo kao prop iz citylist komponente

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {/* ovaj link nas vodi na rutu cities/:id */}
        {/* ovaj to={} prop gde sad saljemo podatke gde saljemo odavde u sledecu, u ovom slucaju u city componentu */}
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
