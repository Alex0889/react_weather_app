import React, { FC, useEffect } from 'react';
import s from './HomePage.module.scss';
import Page from 'prebuild/components/Page';
import TheDay from 'components/TheDay';
import DayInfo from 'components/DayInfo';
import Week from './partials/Week';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getWeather } from 'app/slices/weather/thunk/getWeather';
import WithSkeleton from 'components/WithSkeleton';
import { getForecastByCoords } from '../../app/slices/weather/thunk/getForecastByCoords';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { weather: { current, forecast: { weather, isLoading, error } } } = useAppSelector();

  useEffect(() => {
    dispatch(
      getWeather({
        queries: [
          { name: 'q', value: 'nakhodka' },
          { name: 'lang', value: 'ru' },
        ],
      }),
    );
  }, [dispatch]);


  useEffect(() => {
    Boolean(current.weather) && dispatch(getForecastByCoords({
      queries: [
        { name: 'lat', value: String(current.weather!.coord.lat) },
        { name: 'lon', value: String(current.weather!.coord.lon) },
        { name: 'lang', value: 'ru' },
      ],
    }));
  }, [dispatch, current]);

  return (
    <Page title='React Weather App' className={s.root} hasHeader>
      <WithSkeleton
        isLoading={isLoading}
        isEmpty={Boolean(weather) && Object.keys(weather!).length === 0}
        error={error}
      >
        {Boolean(weather) && <TheDay weather={weather!.current} cityName={current.weather!.name} />}
        {Boolean(weather) && <DayInfo weather={weather!.current} />}
        {Boolean(weather) && <Week />}
      </WithSkeleton>
    </Page>
  );
};

export default HomePage;
