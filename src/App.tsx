import { FC } from 'react';
import HomePage from 'pages/Home';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useAppSelector } from './app/hooks';
import { ToastContainer } from 'react-toastify';

import('dayjs/locale/ru');
import('dayjs/locale/en');

const App: FC = () => {
  const {
    language: { lang },
  } = useAppSelector();

  dayjs.locale(lang);
  dayjs.extend(calendar);
  dayjs.extend(updateLocale);
  dayjs.updateLocale('ru', {
    weekdays:
      'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split(
        '_',
      ),
    calendar: {
      lastDay: '[Вчера]',
      sameDay: '[Сегодня]',
      nextDay: '[Завтра]',
      nextWeek: 'dddd',
      sameElse: 'dddd',
    }
  });

  return (
    <div className='App'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <HomePage />
    </div>
  );
};

export default App;
