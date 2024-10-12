import { GEO_POSITION_NOT_AVAILABLE_ERROR } from "constants";
import { locationIqToken } from "./constants";

const options = {
  timeout: 20000,
  maximumAge: 3.6e6 * 3,
};

export function getUserCityInfo() {
  return new Promise((resolve, reject) => {
    async function success(pos) {
      const crd = pos.coords;
      const lat = crd.latitude.toString();
      const lon = crd.longitude.toString();

      const city = await fetchCity(lat, lon);
      resolve(city);
    }

    function error(err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
      reject(new Error(GEO_POSITION_NOT_AVAILABLE_ERROR));
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  });
}

async function fetchCity(lat, lon) {
  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=${locationIqToken}&lat=${lat}&lon=${lon}&format=json`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
