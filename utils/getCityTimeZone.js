import { locationIqToken } from "./constants";

export async function getCityTimeZone(coordinates) {
  const { lat, lon } = coordinates;
  const response = await fetch(
    `https://us1.locationiq.com/v1/timezone?key=${locationIqToken}&lat=${lat}&lon=${lon}`
  );
  const { timezone } = await response.json();

  return timezone;
}
