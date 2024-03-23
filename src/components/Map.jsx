/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { map } from "leaflet";
import { useCitis } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "../components/Button";

function Map() {
  const navigate = useNavigate();

  const { cities } = useCitis();
  //return function called navigate and then we can use this function to move to any url
  const [searchParams] = useSearchParams();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const mapLat = searchParams.get("lat"); //dohvatimo iz URL
  const mapLng = searchParams.get("lng"); //dohvati iz URL

  useEffect(
    function () {
      //kada pritisnemo na grad i vratimo se nazad mapu ce da vrati na pocetnu vrednost
      //kako bi zapamtilo vrednosti iz URL mi ih sad cuvamo u mapu do sledeceg klika
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        //ovo se vezemo na custom hook koji smo mi napravili
        //kada pritisnemo dugme Use Your location(getPosition) onda preko funkcija u hook dobijamo nasu lokaciju
        //kada se promeni lokacija u hook ono trigeruje ovaj useEffect
        //kada trigeruje useEffect onda menjamo nase MapPosition i onda centar bude novi mapPosition
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  const [mapPosition, setMapPosition] = useState([40, 0]);
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          // eslint-disable-next-line react/jsx-key
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        Ovo radimo jer leaflet funkcionise preko komponenti i mi smo napravili
        nasu ali koristimo njene funkcije, tj biblioteke leaftlet
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  //get current instance that is currently be displayed
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
