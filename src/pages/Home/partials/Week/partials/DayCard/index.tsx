import React, { FC, useState } from 'react';
import dayjs from 'dayjs';

import s from './DayCard.module.scss';

import GlobalSvgSelector from 'prebuild/assets/icons/GlobalSvgSelector';
import { iconPicker } from 'prebuild/helpers/iconPicker';
import { calendarLocale } from 'prebuild/helpers/calendarLocale';
import { ICurrent } from 'app/interfaces/ICurrent';
import { IDaily } from 'app/interfaces/IDaily';
import { isICurrent } from 'prebuild/guards/isICurrent';
import { isIDaily } from 'prebuild/guards/isIDaily';
import TheDay from 'components/TheDay';
import Popup from 'prebuild/components/Popup';
import DayInfo from 'components/DayInfo';


type DayCardProps = {
  readonly day: ICurrent | IDaily;
  readonly city: string;
};

const DayCard: FC<DayCardProps> = (
  {
    day,
    city,
  }) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  return (
    <>
      {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} className={s.popup}>
        <TheDay weather={day} cityName={city} isPopup />
        <DayInfo weather={day} isPopup />
      </Popup>
      }
      <div className={s.root} onClick={() => setIsPopupOpen(true)}>
        <span className={s.root__day}>{(dayjs(dayjs.unix(day.dt)).calendar(null, calendarLocale))}</span>

        <span
          className={s.root__date}>
            {dayjs.unix(day.dt).format(isICurrent(day) ? 'HH:mm' : 'D MMM')}
        </span>


        <GlobalSvgSelector id={iconPicker(day.weather[0].icon)} />

        <span
          className={s.root__temp_day}>
          {Math.round(isICurrent(day) ? day.temp : day.temp.day)}&deg;
        </span>

        {
          Boolean(isICurrent(day)) &&
          <span
            className={s.root__temp_night}>
            ощущается как {Math.round(isICurrent(day) ? day.feels_like : 0)}&deg;
          </span>
        }
        {
          Boolean(isIDaily(day)) &&
          <span className={s.root__temp_night}>ночью {isIDaily(day) ? Math.round(day.temp.night) : 0}&deg;</span>
        }

        <span className={s.root__info}>{day.weather[0].description}</span>

      </div>
    </>
  );
};

export default DayCard;
