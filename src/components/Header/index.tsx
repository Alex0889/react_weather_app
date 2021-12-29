import { FC } from 'react';
import s from './Header.module.scss';
import clsx from 'clsx';
import GlobalSvgSelector from 'prebuild/assets/icons/GlobalSvgSelector';
import { useAppDispatch } from 'app/hooks';
import { getGeolocation } from '../../app/slices/geolocation/thunk/getGeolocation';
import Actions from '../Actions';

type HeaderProps = {
  readonly className?: string;
};

const Header: FC<HeaderProps> = (
  {
    className,
  },
) => {
  const dispatch = useAppDispatch();

  const handleHomeClick = (): void => {
    dispatch(getGeolocation());
  };

  return (
    <header className={clsx(s.root, className)}>
      <div className={s.root__content}>
        <div className={s.root__wrapper} onClick={handleHomeClick}>
          <div className={s.root__logo}>
            <GlobalSvgSelector id={'header-logo'} />
          </div>
          <div className={s.root__title}>React Weather</div>
        </div>
        <Actions className={s.actions}/>
      </div>
    </header>
  );
};

export default Header;
