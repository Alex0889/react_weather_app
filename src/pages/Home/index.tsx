import { FC, useEffect } from 'react';
import s from './HomePage.module.scss';
import Page from 'prebuild/components/Page';
import TheDay from 'components/TheDay';
import DayInfo from 'components/DayInfo';
import Week from './partials/Week';
import WithSkeleton from 'components/WithSkeleton';
import Loader from '../../components/Loader';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getForecastByCoords } from '../../app/slices/weather/thunk/getForecastByCoords';
import { getGeolocation } from '../../app/slices/geolocation/thunk/getGeolocation';
import { storage } from '../../prebuild/helpers/storage';
import Actions from '../../components/Actions';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const {
    geolocation: {
      geolocation,
      city,
    },
    weather: {
      current,
      forecast: { weather, isLoading, error },
    },
    language: { lang },
  } = useAppSelector();

  useEffect(() => {
    !Boolean(storage.getItem('city')) && dispatch(getGeolocation());
  }, [dispatch]);

  useEffect(() => {
    (Boolean(city) || Boolean(geolocation.geolocation)) && dispatch(getForecastByCoords());
  }, [dispatch, geolocation.geolocation, city, lang]);

  return (
    <Page title='React Weather App' className={s.root} hasHeader>
      <WithSkeleton
        isLoading={geolocation.isLoading || isLoading}
        isEmpty={Boolean(weather) && Object.keys(weather!).length === 0}
        error={error}
        loadingSlot={<Loader className={s.root__loader} />}
      >
        <Actions className={s.actions} />
        {
          Boolean(weather) &&
          <TheDay weather={weather!.current} cityName={current.weather!.name} timezone={weather!.timezone} />
        }
        {
          Boolean(weather) &&
          <DayInfo weather={weather!.current} />
        }
        {
          Boolean(weather) &&
          <Week />
        }
      </WithSkeleton>
    </Page>
  );
};

export default HomePage;
