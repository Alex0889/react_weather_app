import React, { FC, ReactNode } from 'react';
import s from './DayCard.module.scss';
import GlobalSvgSelector from 'prebuild/assets/icons/GlobalSvgSelector';
import { iconPicker } from 'prebuild/helpers/iconPicker';

type DayCardProps = {
  readonly handleOpenPopup: () => void;
  readonly date: string;
  readonly dayTime: string;
  readonly icon: string;
  readonly tempDay: number;
  readonly tempFeelsLike: ReactNode;
  readonly description: string;
};

const DayCard: FC<DayCardProps> = (
  {
    handleOpenPopup,
    date,
    dayTime,
    icon,
    tempDay,
    tempFeelsLike,
    description
  }) => {
  return (
    <div className={s.root} onClick={handleOpenPopup}>

      <span className={s.root__day}>{date}</span>

      <span className={s.root__date}>{dayTime}</span>

      <GlobalSvgSelector id={iconPicker(icon)} />

      <span className={s.root__temp_day}>{tempDay}&deg;</span>

      <span className={s.root__temp_night}>{tempFeelsLike}</span>

      <span className={s.root__info}>{description}</span>

    </div>
  );
};

export default DayCard;
