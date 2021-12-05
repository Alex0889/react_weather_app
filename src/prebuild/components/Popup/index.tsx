import React, { FC } from 'react';
import s from './Popup.module.scss';
import GlobalSvgSelector from '../../assets/icons/GlobalSvgSelector';
import clsx from 'clsx';
import { createPortal } from 'react-dom';

type PopupProps = {
  readonly className?: string;
  readonly onClose: () => void;
};

const Popup: FC<PopupProps> = (
  {
    className,
    children,
    onClose,
  }) => {
  return createPortal(
    <div className={clsx(s.root, s.hidden)}>
      <div className={clsx(s.root__wrapper, className)}>
        {children}
        <div className={s.root__close} onClick={onClose}>
          <GlobalSvgSelector id='close' />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Popup;
