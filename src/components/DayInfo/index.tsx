import { FC } from 'react';
import s from './DayInfo.module.scss';
import Card from 'prebuild/components/Card';
import clsx from 'clsx';
import cloud from 'prebuild/assets/img/cloud.png';
import { IItem } from 'prebuild/interfaces/IItem';
import DayInfoItem from './partials/DayInfoItem';
import { getWindDirection } from './helpers';
import { windSpeedPicker } from 'prebuild/helpers/windSpeedPicker';
import { ICurrent } from 'app/interfaces/ICurrent';
import { IDaily } from 'app/interfaces/IDaily';
import withTranslate from '../WithTranslate';
import { IWithTranslate } from 'prebuild/interfaces/IWithTranslate';

type DayInfoProps = {
  readonly className?: string;
  readonly isPopup?: boolean;
  readonly weather: ICurrent | IDaily;
};

const DayInfo: FC<DayInfoProps & IWithTranslate> = (
  {
    className,
    isPopup,
    weather,
    t,
  }) => {
  const items: IItem[] = [
    {
      icon_id: 'temp',
      name: t['temp'],
      value: `${Math.round(
        typeof weather.temp === 'number' ?
          weather.temp : weather.temp.day)
      }° - ${t['feelsLike']} ${Math.round(
        typeof weather.feels_like === 'number' ? weather.feels_like : weather.feels_like.day)
      }°`,
    },
    {
      icon_id: 'pressure',
      name: t['pressure'],
      value: `${weather.pressure} ${t['unit']}`,
    },
    {
      icon_id: 'precipitation',
      name: t['precipitation'],
      value: `${weather.weather[0].description}`,
    },
    {
      icon_id: 'wind',
      name: t['wind'],
      value: `${weather.wind_speed} ${t['meterPSec']} - ${t[getWindDirection(weather.wind_deg)]} - ${t[windSpeedPicker(weather.wind_speed)]}`,
    },
  ];

  return <Card className={clsx(s.root, (isPopup && s.popup), className)}>
    <div className={s.root__items}>
      {items.map(item => <DayInfoItem key={item.icon_id} item={item} />)}
    </div>
    {!isPopup && <img className={s.root__img} src={cloud} alt='Cloud' />}
  </Card>;
};

export default withTranslate(DayInfo);
