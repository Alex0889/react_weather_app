import React, { FC } from 'react';
import s from './Week.module.scss';
import Card from 'prebuild/components/Card';
import DayCard from './partials/DayCard';
import Tabs from './partials/Tabs';
import { useAppSelector } from 'app/hooks';


const Week: FC = () => {
  const {
    tabs: { tabSelector },
    weather: { current, forecast: { weather } },
  } = useAppSelector();

  return (
    <div className={s.root}>
      <Tabs />
      <Card className={s.root__week}>
        {
          tabSelector === 'day' ?
            Boolean(weather) && weather!.hourly.slice(0, 24).map(day => (
              <DayCard
                key={day.dt}
                day={day}
                city={current.weather!.name}
                timezone={weather!.timezone}
              />
            )) :
            Boolean(weather) && weather!.daily.slice(0, 7).map(day => (
              <DayCard
                key={day.dt}
                day={day}
                city={current.weather!.name}
                timezone={weather!.timezone}
              />
            ))
        }
      </Card>
    </div>
  );
};

export default Week;
