import { locationIqToken } from "./constants";

export async function searchCities(searchString) {
  if (searchString.length > 1) {
    const response = await fetch(
      `https://api.locationiq.com/v1/autocomplete?key=${locationIqToken}&q=${searchString}&tag=place:city,place:town,place:village&accept-language=en`
    );
    const data = await response.json();

    if (!response.ok) {
      throw Error(data.error);
    }

    return data;
  }
}
