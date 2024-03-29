import { FC, useState } from 'react';
import { unix } from 'dayjs';

import s from './DayCard.module.scss';

import { ICurrent } from 'app/interfaces/ICurrent';
import { IDaily } from 'app/interfaces/IDaily';
import TheDay from 'components/TheDay';
import Popup from 'prebuild/components/Popup';
import DayInfo from 'components/DayInfo';
import { isIDaily } from 'prebuild/guards/isIDaily';
import DayCard from './DayCard';
import withTranslate from 'components/WithTranslate';
import { IWithTranslate } from 'prebuild/interfaces/IWithTranslate';

type DayCardContainerProps = {
  readonly day: ICurrent | IDaily;
  readonly city: string;
  readonly timezone: string;
};

const DayCardContainer: FC<DayCardContainerProps & IWithTranslate> = (
  {
    day,
    city,
    timezone,
    t
  }) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const tempFeelsLike = isIDaily(day) ?
    (<>{t['atNight']} {Math.round((day as IDaily).temp.night)}&deg;</>) :
    (<>{t['feels']} {Math.round((day as ICurrent).feels_like)}&deg;</>);

  const date = unix(day.dt).format('dddd');

  return (
    <>
      {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} className={s.popup}>
        <TheDay weather={day} cityName={city} timezone={timezone} isPopup />
        <DayInfo weather={day} isPopup />
      </Popup>
      }
      <DayCard
        handleOpenPopup={handleOpenPopup}
        date={date}
        dayTime={unix(day.dt).tz(timezone).format(isIDaily(day) ? 'D MMM' : 'HH:mm')}
        icon={day.weather[0].icon}
        tempDay={Math.round(isIDaily(day) ? day.temp.day : day.temp)}
        tempFeelsLike={tempFeelsLike}
        description={day.weather[0].description}
      />
    </>
  );
};

export default withTranslate(DayCardContainer);
