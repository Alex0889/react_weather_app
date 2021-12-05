import React, { FC, useEffect } from 'react';
import Select, { StylesConfig } from 'react-select';
import s from './Header.module.scss';
import clsx from 'clsx';
import GlobalSvgSelector from 'prebuild/assets/icons/GlobalSvgSelector';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Theme } from 'app/enum/Theme';
import { changeTheme } from 'app/slices/theme';
import { changeCssRootVariables } from 'prebuild/helpers/changeCssRootVariables';

type HeaderProps = {
  readonly className?: string;
};

const Header: FC<HeaderProps> = ({ className }) => {
  const { theme: { theme } } = useAppSelector();
  const dispatch = useAppDispatch();

  const options = [
    { value: 'a', label: 'AA' },
    { value: 'b', label: 'BB' },
    { value: 'c', label: 'CC' },
  ];

  const selectStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      backgroundColor: theme === Theme.LIGHT ? 'rgba(71, 147, 255, 0.2)' : '#4f4f4f',
      width: '194px',
      height: '37px',
      border: 'none',
      borderRadius: '10px',
      zIndex: '100',
    }),
    singleValue: (styles) => ({
      ...styles,
      color: theme === Theme.LIGHT ? '#000' : '#fff',
    }),
  };

  const handleChangeTheme = (): void => {
    dispatch(changeTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  useEffect(() => {
    changeCssRootVariables(theme);
  }, [theme]);

  return (
    <header className={clsx(s.root, className)}>
      <div className={s.root__content}>
        <div className={s.root__wrapper}>
          <div className={s.root__logo}>
            <GlobalSvgSelector id={'header-logo'} />
          </div>
          <div className={s.root__title}>React Weather</div>
        </div>
        <div className={s.root__wrapper}>
          <button className={s.root__theme} onClick={handleChangeTheme}><GlobalSvgSelector id='change-theme' /></button>
          <Select defaultValue={options[0]} styles={selectStyles} options={options} />
        </div>
      </div>
    </header>
  );
};

export default Header;
