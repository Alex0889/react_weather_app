import React, { FC } from 'react';
import s from './Tabs.module.scss';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setTabSelector } from '../../../../../../app/slices/tabs';

const Tabs: FC = () => {
  const dispatch = useAppDispatch();
  const {
    tabs: { tabSelector },
  } = useAppSelector();

  const tabs = [
    { key: 'day', value: 'На сутки' },
    { key: 'week', value: 'На неделю' },
  ];

  const handleTabSelect = (key: string) => {
    if (key !== tabSelector) dispatch(setTabSelector(key));
  };

  const handleCancelBtn = () => {
    dispatch(setTabSelector(tabs[0].key));
  };

  return (
    <div className={s.root}>
      <div className={s.root__tabs}>
        {tabs.map((tab) => (
          <button
            className={clsx(
              s.root__tab,
              s.root__btn,
              tab.key === tabSelector && s.active,
            )}
            key={tab.key}
            onClick={() => handleTabSelect(tab.key)}
          >
            {tab.value}
          </button>
        ))}
      </div>
      <button
        onClick={handleCancelBtn}
        className={clsx(s.cancel, s.root__btn)}>
        Отменить
      </button>
    </div>
  );
};

export default Tabs;
