import { FC } from 'react';
import s from './Tabs.module.scss';
import clsx from 'clsx';
import { TabsState } from 'prebuild/interfaces/tabs';
import withTranslate from 'components/WithTranslate';
import { IWithTranslate } from 'prebuild/interfaces/IWithTranslate';

interface TabProps {
  readonly handleTabChange: (key: TabsState) => void;
  readonly selectedTab: string;
}

const Tabs: FC<TabProps & IWithTranslate> = (
  {
    handleTabChange,
    selectedTab,
    t
  },
) => {
  const tabs = [
    { key: 'day' },
    { key: 'week' },
  ];

  const handleTabSelect = (key: TabsState) => {
    if (key !== selectedTab) {
      handleTabChange(key);
    }
  };

  const handleCancelBtn = () => {
    handleTabChange(tabs[0].key as TabsState);
  };

  return (
    <div className={s.root}>
      <div className={s.root__tabs}>
        {tabs.map((tab) => (
          <button
            className={clsx(
              s.root__tab,
              s.root__btn,
              tab.key === selectedTab && s.active,
            )}
            key={tab.key}
            onClick={() => handleTabSelect(tab.key as TabsState)}
          >
            {t[tab.key]}
          </button>
        ))}
      </div>
      <button
        onClick={handleCancelBtn}
        className={clsx(s.cancel, s.root__btn)}>
        {t['cancel']}
      </button>
    </div>
  );
};

export default withTranslate(Tabs);
