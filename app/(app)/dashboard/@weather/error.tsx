"use client";

import { Ban } from "lucide-react";

import * as Card from "@/ui/card";
import { Error } from "@/ui/error";

const WeatherError = () => {
  <Card.Root>
    <Card.Header className="flex-row justify-between space-y-0 pb-3">
      <Card.Title className="flex items-center h-9">
        <Ban className="text-muted-foreground h-5 w-5 mr-2" />
        Weather
      </Card.Title>
    </Card.Header>
    <Card.Content>
      <Error className="">
        <Error.Icon />
        <Error.Title>Error loading weather</Error.Title>
        <Error.Text>
          We couldn't load the weather forecast. It will probably rain...
        </Error.Text>
      </Error>
    </Card.Content>
  </Card.Root>;
};

export default WeatherError;
