import React from 'react';
import s from './petdetail.module.scss';
import Slider from '@/scenes/PetDetail/Slider';
import Detail from '@/scenes/PetDetail/Detail';

const PetDetail = () => {
  return (
    <div className={s.container}>
      <Slider />
      <Detail />
    </div>
  );
};

export default PetDetail;
