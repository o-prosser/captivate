import React, { cache } from "react";
import { BanIcon } from "lucide-react";

import { env } from "@/env.mjs";
import weatherTypes from "@/data/weather-types";
import * as Card from "@/ui/card";

const getLocationWeather = cache(async () => {
  try {
    const result = await fetch(
      `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/350758?res=daily&key=${env.WEATHER_API_KEY}`,
      { next: { revalidate: 60 * 60 * 24 } },
    );

    if (result.status === 200) {
      return { success: true, data: await result.json() };
    }

    return { success: false, error: result.statusText };
  } catch (error) {
    return { success: false };
  }
});

const Weather = async () => {
  const weather = await getLocationWeather();

  if (!weather.success)
    return (
      <Card.Description className="text-destructive">
        Unable to load weather 😢. It&apos;s probably going to rain 🌧️.
      </Card.Description>
    );

  return `You can expect a 👆 high of ${
    weather.data.SiteRep.DV.Location.Period[0].Rep[0].Dm
  }° and a 👇 low of ${
    weather.data.SiteRep.DV.Location.Period[0].Rep[1].Nm
  }° with ${
    // @ts-expect-error
    weatherTypes[weather.data.SiteRep.DV.Location.Period[0].Rep[0].W].text
  } today.`;
};

export const WeatherIcon = async (
  props: React.ComponentPropsWithoutRef<"svg">,
) => {
  const weather = await getLocationWeather();

  if (!weather.success) return <BanIcon />;

  const Icon =
    // @ts-expect-error
    weatherTypes[weather.data.SiteRep.DV.Location.Period[0].Rep[0].W].icon;

  return <Icon {...props} />;
};

export default Weather;
