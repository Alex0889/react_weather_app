import { FC } from 'react';
import s from './TheDay.module.scss';
import clsx from 'clsx';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import Card from 'prebuild/components/Card';
import GlobalSvgSelector from 'prebuild/assets/icons/GlobalSvgSelector';
import { iconPicker } from 'prebuild/helpers/iconPicker';
import { ICurrent } from 'app/interfaces/ICurrent';
import { IDaily } from 'app/interfaces/IDaily';
import withTranslate from '../WithTranslate';
import { IWithTranslate } from '../../prebuild/interfaces/IWithTranslate';

dayjs.extend(utc);
dayjs.extend(timezone);

type TheDayProps = {
  readonly className?: string;
  readonly isPopup?: boolean;
  readonly weather: ICurrent | IDaily;
  readonly cityName: string;
  readonly timezone: string;
};

const TheDay: FC<TheDayProps & IWithTranslate> = (
  {
    className,
    isPopup,
    weather,
    cityName,
    timezone,
    t,
  }) => {
  return (
    <Card className={clsx(s.root, (isPopup && s.popup), className)}>
      <div className={clsx(s.root__top, (isPopup && s.popup))}>
        <div className={s.root__wrapper}>
          <div
            className={
              clsx(s.root__temp,
                (isPopup && s.popup),
              )}>
            {Math.round(typeof weather.temp === 'number' ?
              weather.temp :
              weather.temp.day)}&deg;
          </div>
          <div
            className={
              clsx(s.root__day,
                (isPopup && s.popup),
              )}>
            {
              dayjs.unix(weather.dt).format('dddd')
            }
          </div>
          {
            isPopup &&
            <GlobalSvgSelector id={iconPicker(weather.weather[0].icon)} />
          }
        </div>
        {
          !isPopup &&
          <GlobalSvgSelector id={iconPicker(weather.weather[0].icon)} />
        }
      </div>

      <div className={s.root__bottom}>
        <div className={
          clsx(s.root__time,
            (isPopup && s.popup),
          )}>{t['time']}: <time>{dayjs.unix(weather.dt).tz(timezone).format('HH:mm')}</time>
        </div>
        <div className={
          clsx(s.root__date,
            (isPopup && s.popup),
          )}>{t['date']}: <span>{dayjs.unix(weather.dt).tz(timezone).format('D MMM')}</span>
        </div>
        <div className={
          clsx(s.root__city,
            (isPopup && s.popup),
          )}>{t['city']}: <span>{cityName}</span>
        </div>
      </div>
    </Card>
  );
};

export default withTranslate(TheDay);
