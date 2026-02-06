const GEOCODEURL = "https://geocoding-api.open-meteo.com/v1/search?";

export const getQueryLocations = async (input: string) => {
  const searchParams = new URLSearchParams();
  searchParams.set("name", input);
  searchParams.set("count", "10");
  searchParams.set("language", "en");
  searchParams.set("format", "json");
  const searchURL = GEOCODEURL + searchParams.toString();

  try {
    const res = await fetch(searchURL);
    if (!res.ok) {
      throw new Error("Error Response");
    }
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
  }
};
