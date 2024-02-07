/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat"); //dohvatimo iz URL
  const lng = searchParams.get("lng"); //dohvati iz URL
  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button
        onClick={() => {
          setSearchParams({ lat: 23, lng: 50 });
        }}
      >
        Change pos
      </button>
    </div>
  );
}

export default Map;
