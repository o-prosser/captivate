import React, { cache } from "react";

import { env } from "@/env.mjs";
import weatherTypes from "@/data/weather-types";
import * as Card from "@/ui/card";

const getLocationWeather = cache(async () => {
  const result = await fetch(
    `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/350758?res=daily&key=${env.WEATHER_API_KEY}`,
    { next: { revalidate: 60 * 60 * 24 } },
  );

  const data = await result.json();

  if (result.status === 200) {
    return {
      success: true,
      high: data.SiteRep.DV.Location.Period[0].Rep[0].Dm,
      low: data.SiteRep.DV.Location.Period[0].Rep[1].Nm,
      text: data.SiteRep.DV.Location.Period[0].Rep[0].W,
    };
  }

  return { success: false, error: result.statusText };
});

const Weather = async () => {
  const weather = await getLocationWeather();

  if (!weather.success) throw new Error();

  const Icon =
    // @ts-expect-error
    weatherTypes[weather.text].icon;

  return (
    <Card.Root>
      <Card.Header className="flex-row justify-between space-y-0 pb-3">
        <Card.Title className="flex items-center h-9">
          <Icon className="text-muted-foreground h-5 w-5 mr-2" />
          Weather
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <p className="bg-muted rounded-2xl py-3 px-4 text-sm">
          {`You can expect a 👆 high of ${weather.high}° and a 👇 low of ${
            weather.low
          }° with ${
            // @ts-expect-error
            weatherTypes[weather.text].text
          } today.`}
        </p>
      </Card.Content>
    </Card.Root>
  );
};

export default Weather;
