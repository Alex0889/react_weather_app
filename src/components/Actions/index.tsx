import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import s from './Actions.module.scss';
import GlobalSvgSelector from '../../prebuild/assets/icons/GlobalSvgSelector';
import Input from '../../prebuild/components/Input';
import { changeCssRootVariables } from '../../prebuild/helpers/changeCssRootVariables';
import { changeTheme } from '../../app/slices/theme';
import { Theme } from '../../app/enum/Theme';
import { changeLanguage } from '../../app/slices/language';
import { Lang } from '../../app/enum/Lang';
import { changeCity } from '../../app/slices/geolocation';
import { transliterate } from '../../prebuild/helpers/translitCyrillic';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import withTranslate from '../WithTranslate';
import { IWithTranslate } from '../../prebuild/interfaces/IWithTranslate';
import clsx from 'clsx';
import { getForecastByCoords } from '../../app/slices/weather/thunk/getForecastByCoords';

type ActionsProps = {
  readonly className?: string;
};

const Actions: FC<ActionsProps & IWithTranslate> = (
  {
    className,
    t,
  }) => {
  const { theme: { theme }, language: { lang } } = useAppSelector();
  const dispatch = useAppDispatch();

  const [city, setCity] = useState<string>('');

  useEffect(() => {
    changeCssRootVariables(theme);
  }, [theme]);

  const handleChangeTheme = (): void => {
    dispatch(changeTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  const handleChangeLanguage = (): void => {
    dispatch(changeLanguage(lang === Lang.RU ? Lang.EN : Lang.RU));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(changeCity(transliterate(city)));
    dispatch(getForecastByCoords())
    setCity('');
  };

  return (
    <div className={clsx(s.root, className)}>
      <button
        className={s.root__lang}
        onClick={handleChangeLanguage}
      >{lang}</button>
      <button
        className={s.root__theme}
        onClick={handleChangeTheme}>
        <GlobalSvgSelector id='change-theme' />
      </button>
      <form onSubmit={handleSubmit}>
        <Input
          value={city}
          placeholder={t['searchCity']}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCity(e.currentTarget.value);
          }} />
      </form>
    </div>
  );
};

export default withTranslate(Actions);
