import React, { useEffect, useState } from 'react';
import s from './detail.module.scss';
import {
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Animal, usePetQueries } from '@/queries/pet';
import { useQuery } from '@tanstack/react-query';
import API from '@/lib/API';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

const steps = ['Select master', 'Create an ad group', 'Create an ad'];

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = usePetQueries();
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>();
  const [activeStep, setActiveStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
  });

  const { isLoading, isFetching } = useQuery({
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

  // console.log('animal : ', animal);

  useEffect(() => {
    if (data) {
      const animal = data.animals.find((animal) => animal.id === Number(id));
      setSelectedAnimal(animal);
    }
  }, [id]);

  if (!selectedAnimal) {
    return (
      <div className={s.container}>
        <Container maxWidth={'sm' as any} className={s.wrapper}>
          <Stack
            gap={4}
            alignItems="center"
            direction="row"
            className={s.title}
            sx={{ margin: '0 auto', width: '100%' }}
          >
            <Typography variant="h4" noWrap>
              {isLoading || isFetching ? 'Loading Pet Detail ...' : 'Not Found'}
            </Typography>
            {(isLoading || isFetching) && (
              <div className={s.loader}>
                <CircularProgress />
              </div>
            )}
          </Stack>
        </Container>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <Container maxWidth={'xxl' as any} className={s.wrapper}>
        <Card className={s.detail}>
          <Typography variant="h2" gutterBottom className={s.title_big}>
            {selectedAnimal.name}
          </Typography>

          <Typography className={s.info} gutterBottom>
            {selectedAnimal.type} &nbsp; &#x2022; &nbsp;{' '}
            {selectedAnimal?.breeds?.primary || '-'}
          </Typography>

          <hr />
          <Typography className={s.info}>
            {selectedAnimal?.colors?.primary || 'black'} &nbsp; &#x2022; &nbsp;{' '}
            {selectedAnimal.gender} &nbsp; &#x2022; &nbsp; {selectedAnimal.size}
          </Typography>
          <hr />

          <div className={s.about}>
            <Typography className={s.title}>About</Typography>
            <Typography color="gray">
              Age :{' '}
              <b>
                <i>{selectedAnimal.age}</i>
              </b>
            </Typography>

            <div className={s.meet}>
              <Typography className={s.title}>
                Meet {selectedAnimal.name}
              </Typography>
              <Typography className={s.about_desc} color="gray">
                {selectedAnimal.description}
              </Typography>
            </div>
          </div>
        </Card>

        <Card className={s.checkout}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div className={s.content}>
            {activeStep === 0 && (
              <Button
                variant="contained"
                onClick={() => {
                  setActiveStep(1);
                }}
              >
                Start Processing
              </Button>
            )}

            {activeStep === 1 && (
              <Stack spacing={2}>
                <Typography>
                  fill out your information to adopt {selectedAnimal.name}
                </Typography>

                <TextField
                  label="Your name"
                  variant="outlined"
                  type="text"
                  fullWidth
                  value={userInfo.name}
                  onChange={(e) => {
                    setUserInfo((prev) => ({ ...prev, name: e.target.value }));
                  }}
                />

                <TextField
                  label="Phone number"
                  variant="outlined"
                  type="tel"
                  fullWidth
                  value={userInfo.phone}
                  onChange={(e) => {
                    setUserInfo((prev) => ({ ...prev, phone: e.target.value }));
                  }}
                />

                <LoadingButton
                  variant="contained"
                  disabled={!userInfo.name || !userInfo.phone}
                  onClick={async () => {
                    // setActiveStep(2);

                    const regPet = await axios
                      .post('/api/create-pet', {
                        type: 'Cat',
                        gender: 'male',
                        size: 'medium',
                        age: 'baby',
                        photos: [
                          {
                            data: 'in base64',
                            extension: 'png',
                          },
                        ],
                        good_with_children: true,
                      })
                      .then((res) => res.data)
                      .catch((err) => console.log('create-pet error', err));

                    if (regPet) {
                      toast.success(
                        `Pet registered successfully - petId : ${regPet.pet_id}`,
                      );

                      const user = await axios
                        .post('/api/create-customer', {
                          name: userInfo.name,
                          phone: '091112131333334',
                        })
                        .then((res) => res.data)
                        .catch((err) => console.log('create-pet error', err));

                      console.log('user: ', user);
                      if (user) {
                        toast.success(
                          `Customer registered successfully ${user.customer_id}`,
                        );

                        const adoption = await axios
                          .post('/api/adopt', {
                            customer_id: '645670bfe994e3a2e21adb6b',
                            pet_id: '645671132a2e303d9c7575ec',
                          })
                          .then((res) => res.data)
                          .catch((err) => console.log('create-pet error', err));

                        console.log('adoption : ', adoption);

                        if (adoption) {
                          toast.success(
                            `Adoption success ${adoption.addoption_id}`,
                          );

                          setActiveStep(2);
                        }
                      }
                    }
                  }}
                >
                  Adopt now
                </LoadingButton>
              </Stack>
            )}

            {activeStep === 2 && (
              <Stack spacing={2}>
                <Typography variant="h5" gutterBottom color="#A1612B">
                  Congratulations! You have successfully adopted -{' '}
                  <b>
                    <i>{selectedAnimal.name}!</i>
                  </b>
                </Typography>

                <Link href="/">
                  <Button variant="outlined">Go back home</Button>
                </Link>
              </Stack>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Detail;
