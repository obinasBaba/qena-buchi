import React, { useRef } from 'react';
import s from './lottiloading.module.scss';

const LottiLoading = () => {
  const loadingRef = useRef<HTMLDivElement>(null);

  return (
    <div className={s.container}>
      <div className="loading_container" ref={loadingRef} />
    </div>
  );
};

export default LottiLoading;
