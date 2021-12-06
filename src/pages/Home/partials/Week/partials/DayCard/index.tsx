import React, { FC, useState } from 'react';
import { unix } from 'dayjs';

import s from './DayCard.module.scss';

import GlobalSvgSelector from 'prebuild/assets/icons/GlobalSvgSelector';
import { iconPicker } from 'prebuild/helpers/iconPicker';
import { ICurrent } from 'app/interfaces/ICurrent';
import { IDaily } from 'app/interfaces/IDaily';
import TheDay from 'components/TheDay';
import Popup from 'prebuild/components/Popup';
import DayInfo from 'components/DayInfo';
import { isIDaily } from 'prebuild/guards/isIDaily';
import('dayjs/locale/ru');

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
        <span className={s.root__day}>{unix(day.dt).calendar(null, {
          lastDay: 'Вчера',
          sameDay: 'Сегодня',
          nextDay: 'Завтра',
          nextWeek: 'dddd',
          sameElse: 'DD/MM/YYYY',
        })}</span>

        <span
          className={s.root__date}>
            {unix(day.dt).format(isIDaily(day) ? 'HH:mm' : 'D MMM')}
        </span>


        <GlobalSvgSelector id={iconPicker(day.weather[0].icon)} />

        <span
          className={s.root__temp_day}>
          {Math.round(isIDaily(day) ? day.temp.day : day.temp)}&deg;
        </span>


        <span
          className={s.root__temp_night}>
            {isIDaily(day) ?
              (<>ночью {Math.round((day as unknown as IDaily).temp.night)}&deg;</>) :
              (<>ощущается {Math.round((day as unknown as ICurrent).feels_like)}&deg;</>)
            }
          </span>

        <span className={s.root__info}>{day.weather[0].description}</span>

      </div>
    </>
  );
};

export default DayCard;
