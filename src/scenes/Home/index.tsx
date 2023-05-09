import React from 'react';
import s from './home.module.scss';
import Hero from '@/scenes/Home/Hero';

const Home = () => {
  return (
    <div className={s.container}>
      <Hero />
    </div>
  );
};

export default Home;
