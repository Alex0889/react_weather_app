import React, { FC } from 'react';
import s from './DayInfo.module.scss';
import Card from 'prebuild/components/Card';
import clsx from 'clsx';
import cloud from 'prebuild/assets/img/cloud.png';
import { IItem } from 'prebuild/interfaces/IItem';
import Item from './partials/Item';
import { getWindDirection } from './helpers';
import { windSpeedPicker } from '../../prebuild/helpers/windSpeedPicker';
import { ICurrent } from '../../app/interfaces/ICurrent';
import { IDaily } from '../../app/interfaces/IDaily';

type DayInfoProps = {
  readonly className?: string;
  readonly isPopup?: boolean;
  readonly weather: ICurrent | IDaily;
};

const DayInfo: FC<DayInfoProps> = (
  {
    className,
    isPopup,
    weather,
  }) => {
  const items: IItem[] = [
    {
      icon_id: 'temp',
      name: 'Температура',
      value: `${Math.round(
        typeof weather.temp === 'number' ?
          weather.temp : weather.temp.day)
      }° - ощущается как ${Math.round(
        typeof weather.feels_like === 'number' ? weather.feels_like : weather.feels_like.day)
      }°`,
    },
    {
      icon_id: 'pressure',
      name: 'Давление',
      value: `${weather.pressure} мм ртутного столба`,
    },
    {
      icon_id: 'precipitation',
      name: 'Осадки',
      value: `${weather.weather[0].description}`,
    },
    {
      icon_id: 'wind',
      name: 'Ветер',
      value: `${weather.wind_speed} м/с - ${getWindDirection(weather.wind_deg)} - ${windSpeedPicker(weather.wind_speed)}`,
    },
  ];

  return <Card className={clsx(s.root, (isPopup && s.popup), className)}>
    <div className={s.root__items}>
      {items.map(item => <Item key={item.icon_id} item={item} />)}
    </div>
    {!isPopup && <img className={s.root__img} src={cloud} alt='Cloud' />}
  </Card>;
};

export default DayInfo;
