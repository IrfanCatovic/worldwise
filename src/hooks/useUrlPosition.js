import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat"); //dohvatimo iz URL
  const lng = searchParams.get("lng"); //dohvati iz URL

  return [lat, lng];
}
