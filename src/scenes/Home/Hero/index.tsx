import React, { useEffect, useLayoutEffect, useState } from 'react';
import s from './hero.module.scss';

import Buchi from '@/public/images/Buchi.png';
import Image from 'next/image';
import {
  Autocomplete,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { useAppContext } from '@/context/app';
import { usePetQueries } from '@/queries/pet';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: '-10%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '-10%' },
};

const transition = {
  duration: 0.3,
  ease: 'easeInOut',
};

const Hero = () => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const { filters, setFilters } = useAppContext();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      type: '',
      age: '',
      gender: '',
      size: '',
      good_with_children: '',
    },
    async onSubmit(values) {
      // get values that are not undefined and ''
      const filteredValues = Object.entries(values).reduce(
        (acc, [key, value]) => {
          if (key === 'good_with_children' && value !== '') {
            acc[key] = (value as any).value;
            return acc;
          }

          if (Boolean(value)) {
            acc[key] = value;
          }
          return acc;
        },
        {} as any,
      );

      // console.log('filteredValues: ', filteredValues);

      setFilters((prev: any) => filteredValues);
      setSubmitted(true);
    },
  });

  const petQueries = usePetQueries();
  const { data } = petQueries;

  console.log('data: ', petQueries);

  useLayoutEffect(() => {
    setFilters(null);
  }, []);

  useEffect(() => {
    if (!submitted || !data) return;

    router.push('/search-results');
  }, [data, submitted]);

  return (
    <div className={s.container}>
      <div className={s.buchi}>
        <Image src={Buchi} alt="Buchi" />
      </div>
      <Container maxWidth={'xxl' as any} className={s.wrapper}>
        <motion.div>
          <Typography variant="h2">
            Over 200,000+ stray Dogs on Addis Ababa streets in 2023!
          </Typography>
        </motion.div>

        <motion.div variants={variants} transition={transition}>
          <Typography variant="h5" gutterBottom>
            l Be part of the solution
          </Typography>

          <Typography className={s.desc}>
            Adopt a stray pet to decrease the number of stray pets on the street
            for the safety of every one. start you journey of finding you
            companion with us!
          </Typography>
        </motion.div>

        <motion.div>
          <Stack spacing={4} className={s.filters}>
            <Typography variant="h6">Fill You Filters</Typography>
            <form className={s.fields} onSubmit={formik.handleSubmit}>
              <Autocomplete
                disablePortal
                options={['Cat', 'Dog']}
                sx={{ maxWidth: '15rem', width: '100%' }}
                // multiple
                fullWidth
                value={formik.values.type}
                onChange={(event, newValue) => {
                  formik.setFieldValue('type', newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Animal Type"
                    name="type"
                    required
                  />
                )}
              />

              <Autocomplete
                disablePortal
                disableCloseOnSelect={false}
                options={['baby', 'young', 'adult', 'senior']}
                sx={{ maxWidth: '15rem', width: '100%' }}
                // multiple
                fullWidth
                value={formik.values.age}
                onChange={(event, newValue) => {
                  formik.setFieldValue('age', newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Age" name="age" />
                )}
              />

              <Autocomplete
                disablePortal
                options={['male', 'female']}
                sx={{ maxWidth: '15rem', width: '100%' }}
                // multiple
                fullWidth
                // value={selectedCategories}

                value={formik.values.gender}
                onChange={(event, newValue) => {
                  formik.setFieldValue('gender', newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Gender"
                    name="gender"
                  />
                )}
              />

              <Autocomplete
                disablePortal
                options={['small', 'medium', 'large', 'xlarge']}
                sx={{ maxWidth: '15rem', width: '100%' }}
                // multiple
                fullWidth
                // value={selectedCategories}
                value={formik.values.size}
                onChange={(event, newValue) => {
                  formik.setFieldValue('size', newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Size" name="size" />
                )}
              />

              <Autocomplete
                disablePortal
                options={[
                  { label: 'Yes', value: true },
                  { label: 'No', value: false },
                ]}
                sx={{ maxWidth: '15rem', width: '100%' }}
                // multiple
                fullWidth
                // value={selectedCategories}
                value={formik.values.good_with_children as any}
                onChange={(event, newValue) => {
                  formik.setFieldValue('good_with_children', newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Good With Children"
                    name="good_with_children"
                  />
                )}
              />

              <LoadingButton
                size="large"
                variant="contained"
                type="submit"
                loading={petQueries.isLoading && petQueries.isFetching}
              >
                Search
              </LoadingButton>
            </form>
          </Stack>
        </motion.div>
      </Container>
    </div>
  );
};

export default Hero;
