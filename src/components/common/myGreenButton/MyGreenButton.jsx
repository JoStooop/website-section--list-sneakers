import React from 'react';
import s from './MyGreenButton.module.scss';

const MyGreenButton = ({children, ...props}) => {
  return (
    <button className={s.button} {...props}>
      {children}
    </button>
  );
};

export {MyGreenButton};
