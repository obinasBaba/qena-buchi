import React, { useEffect, useState } from 'react';
import s from './slider.module.scss';
import { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Animal, usePetQueries } from '@/queries/pet';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import API from '@/lib/API';
import Buchi from '@/public/images/Buchi.png';
import PlaceHolder from '@/public/images/placeholder.svg';

const imgs = [Buchi, Buchi, Buchi, Buchi, Buchi, Buchi, Buchi];

const Slider = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = usePetQueries();
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>();

  useQuery({
    enabled: Boolean(id) && !selectedAnimal, // enabled: false,
    queryKey: [Number(id), 'ANIMAL'],
    queryFn: async ({ queryKey }) => {
      const response = await API.get(`animals/${id}`, {
        params: { id: queryKey[0] },
      });

      console.log('resonse: ', response);

      if (response.data) {
        return response.data;
      }
    },
    onSuccess: (data) => {
      console.log('onSuccess data: ', data);
      setSelectedAnimal(data.animal);
    },
  });

  useEffect(() => {
    if (data) {
      const animal = data.animals.find((animal) => animal.id === Number(id));
      setSelectedAnimal(animal);
    }
  }, [id]);

  console.log('images: ', selectedAnimal);

  return (
    <div className={s.container}>
      <div className={s.slider}>
        {selectedAnimal?.photos && selectedAnimal?.photos.length > 2 ? (
          <Swiper
            slidesPerView={
              // (selectedAnimal && selectedAnimal?.photos.length > 3 ? 3 : 1) || 1
              3
            }
            spaceBetween={20}
            loop={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
            navigation={true}
            className={clsx([
              s.swiper,
              selectedAnimal?.photos.length === 3 && s.three,
            ])}
          >
            {selectedAnimal?.photos.map((img, index) => (
              <SwiperSlide key={index}>
                <div className={s.swiper_item}>
                  <Image src={img.large} alt="Buchi" height={500} width={500} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={clsx([s.swiper_item, s.single])}>
            <Image
              src={selectedAnimal?.photos[0]?.large || PlaceHolder}
              alt="Buchi"
              height={500}
              width={500}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
