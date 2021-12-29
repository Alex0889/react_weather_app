import { FC } from 'react';
import s from './Card.module.scss';
import clsx from 'clsx';

type CardProps = {
  readonly className?: string;
};

const Card: FC<CardProps> = (
  {
    className,
    children
  }) => {
  return (
  <div className={clsx(s.root, className)}>
    {children}
  </div>
  );
};

export default Card;
