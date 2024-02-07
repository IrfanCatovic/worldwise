/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  //return function called navigate and then we can use this function to move to any url
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat"); //dohvatimo iz URL
  const lng = searchParams.get("lng"); //dohvati iz URL
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
    </div>
  );
}

export default Map;
