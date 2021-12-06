import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import HomePage from 'pages/Home';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import('dayjs/locale/ru');

const App: FC = () => {
  dayjs.locale('ru');
  dayjs.extend(calendar);
  dayjs.extend(updateLocale);
  dayjs.updateLocale('ru', {
    weekdays: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_')
  });

  return (
    <Provider store={store}>
      <div className='App'>
        <HomePage />
      </div>
    </Provider>
  );
};

export default App;
