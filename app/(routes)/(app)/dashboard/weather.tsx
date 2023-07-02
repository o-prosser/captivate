import weatherTypes from "@/data/weather-types.json";
import { env } from "@/env.mjs";

const getLocationWeather = async () => {
  try {
    // const result = await fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?lat=51.512446752416146&lon=-3.145784441929501&appid=${env.WEATHER_API_KEY}&units=metric`,
    // );

    const result = await fetch(
      `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/350758?res=daily&key=${env.WEATHER_API_KEY}`,
    );

    if (result.status === 200) {
      return { success: true, data: await result.json() };
    }

    return { success: false, error: result.statusText };
  } catch (error) {
    return { success: false };
  }
};

const Weather = async () => {
  const weather = await getLocationWeather();

  if (!weather.success) throw new Error(weather.error);

  return `You can expect a 👆 high of ${
    weather.data.SiteRep.DV.Location.Period[0].Rep[0].Dm
  }° and a👇 low of ${
    weather.data.SiteRep.DV.Location.Period[0].Rep[1].Nm
  }° with ${
    // @ts-expect-error
    weatherTypes[weather.data.SiteRep.DV.Location.Period[0].Rep[0].W]
  } today.`;
};

export default Weather;
