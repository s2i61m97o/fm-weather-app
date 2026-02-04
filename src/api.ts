export const getApiData = async (input: string) => {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        input,
      )}&count=10&language=en&format=json`,
    );
    if (!res.ok) {
      throw new Error("Error Response");
    }
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.log(err);
  }
};
