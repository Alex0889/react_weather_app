import { FC, useState } from 'react';
import s from './Week.module.scss';
import Card from 'prebuild/components/Card';
import DayCard from './partials/DayCard';
import Tabs from './partials/Tabs';
import { useAppSelector } from 'app/hooks';
import { TabsState } from '../../../../prebuild/interfaces/tabs';

const Week: FC = () => {
  const {
    weather: { current, forecast: { weather } },
  } = useAppSelector();

  const [activeTab, setActiveTab] = useState<TabsState>('day');

  const handleTabChange = (tab: TabsState) => {
    setActiveTab(tab);
  }

  return (
    <div className={s.root}>
      <Tabs handleTabChange={handleTabChange} selectedTab={activeTab}/>
      <Card className={s.root__week}>
        {
          activeTab === 'day' ?
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
