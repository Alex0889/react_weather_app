import React, { FC } from 'react';
import s from './TheDay.module.scss';
import Card from 'prebuild/components/Card';
import clsx from 'clsx';
import GlobalSvgSelector from 'prebuild/assets/icons/GlobalSvgSelector';
import { iconPicker } from '../../prebuild/helpers/iconPicker';
import { ICurrent } from '../../app/interfaces/ICurrent';
import dayjs from 'dayjs';
import { calendarLocale } from '../../prebuild/helpers/calendarLocale';
import { IDaily } from '../../app/interfaces/IDaily';

type TheDayProps = {
  readonly className?: string;
  readonly isPopup?: boolean;
  readonly weather: ICurrent | IDaily;
  readonly cityName: string;
};

const TheDay: FC<TheDayProps> = (
  {
    className,
    isPopup,
    weather,
    cityName,
  }) => {
  return (
    <Card className={clsx(s.root, (isPopup && s.popup), className)}>
      <div className={clsx(s.root__top, (isPopup && s.popup))}>
        <div className={s.root__wrapper}>
          <div
            className={
              clsx(s.root__temp,
                (isPopup && s.popup),
              )}>{Math.round(typeof weather.temp === 'number' ? weather.temp : weather.temp.day)}&deg;
          </div>
          <div
            className={
              clsx(s.root__day,
                (isPopup && s.popup),
              )}>{dayjs.unix(weather.dt).calendar(null, calendarLocale)}</div>
          {isPopup && <GlobalSvgSelector id={iconPicker(weather.weather[0].icon)} />}
        </div>
        {!isPopup && <GlobalSvgSelector id={iconPicker(weather.weather[0].icon)} />}
      </div>
      <div className={s.root__bottom}>
        <div className={
          clsx(s.root__time,
            (isPopup && s.popup),
          )}>Время: <time>{dayjs().format('HH:mm')}</time>
        </div>
        <div className={
          clsx(s.root__city,
            (isPopup && s.popup),
          )}>Город: <span>{cityName}</span>
        </div>
      </div>
    </Card>
  );
};

export default TheDay;