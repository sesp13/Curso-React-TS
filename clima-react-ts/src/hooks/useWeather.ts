// import { number, object, parse, string } from 'valibot';

import { useMemo, useState } from 'react';

import { SearchType } from '../types';
import axios from 'axios';
import { z } from 'zod';

// Type guard o assertion
// function isWeatherResponse(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === 'object' &&
//     typeof (weather as Weather).name === 'string' &&
//     typeof (weather as Weather).main.temp === 'number' &&
//     typeof (weather as Weather).main.temp_max === 'number' &&
//     typeof (weather as Weather).main.temp_min === 'number'
//   );
// }


// ZOD
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});
export type Weather = z.infer<typeof Weather>;

// Valibot
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_max: number(),
//     temp_min: number(),
//   }),
// });

const initialState: Weather = {
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
}

export const useWeather = () => {
  const [weather, setWeather] = useState<Weather>(initialState);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false)

  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_WEATHER;
    setLoading(true);
    setNotFound(false);
    setWeather(initialState);

    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
      const { data } = await axios(geoUrl);

      // Comprobar si existe el lugar
      if(!data[0]) {
        setNotFound(true);
        return;
      }

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      // Castear el type
      // const { data: weatherData } = await axios<Weather>(weatherUrl);
      // console.log(weatherData.main.temp);
      // console.log(weatherData.name);

      // Type Guards
      // const { data: weatherData } = await axios(weatherUrl);
      // const result = isWeatherResponse(weatherData);
      // if (result) {
      //   console.log(weatherData.name);
      // } else {
      //   console.log('Respuesta mal formada');
      // }

      // Valibot
      // const { data: weatherData } = await axios(weatherUrl);
      // const result = parse(WeatherSchema, weatherData);
      // if (result) {
      //   console.log(result.name);
      // }

      // ZOD
      const { data: weatherData } = await axios(weatherUrl);
      const result = Weather.safeParse(weatherData);
      if (result.success) {
        setWeather(result.data);
      }
    } catch (error) {
      


    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    weather,
    loading,
    notFound,
    fetchWeather,
    hasWeatherData,
  };
};
