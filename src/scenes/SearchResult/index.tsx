import React, { useEffect } from 'react';
import s from './searchresult.module.scss';
import {
  Alert,
  Autocomplete,
  Chip,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Buchi from '@/public/images/placeholder.svg';
import Image from 'next/image';
import clsx from 'clsx';
import { useAppContext } from '@/context/app';
import { usePetQueries } from '@/queries/pet';
import Link from 'next/link';

const Art = () => (
  <svg
    viewBox="0 0 69 67"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="quizzleIcon quizzleIcon-largeMargin"
    width="100%"
    height="100%"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.572 28.46c0-5.67-3.744-10.274-8.336-10.274C4.644 18.186.9 22.79.9 28.459c0 5.67 3.744 10.258 8.336 10.258 4.592 0 8.336-4.604 8.336-10.258zm-8.336 7.382c-3.04 0-5.504-3.312-5.504-7.399s2.464-7.398 5.504-7.398c3.04 0 5.472 3.327 5.472 7.414s-2.432 7.383-5.472 7.383zm59.28-7.399c0-5.654-3.744-10.257-8.336-10.257-4.592 0-8.336 4.604-8.336 10.273-.058.547.199 1.08.66 1.372a1.412 1.412 0 001.511 0c.462-.292.719-.825.66-1.372 0-4.07 2.465-7.398 5.505-7.398s5.504 3.311 5.504 7.398c0 4.071-2.464 7.383-5.504 7.383a1.43 1.43 0 00-1.424 1.438 1.43 1.43 0 001.424 1.437c4.592 0 8.336-4.604 8.336-10.274zm-23.408-7.818c4.592 0 8.336-4.604 8.336-10.274 0-5.67-3.76-10.274-8.336-10.274-4.576 0-8.336 4.604-8.336 10.274 0 5.67 3.712 10.274 8.336 10.274zm0-17.672c3.04 0 5.504 3.311 5.504 7.398s-2.496 7.399-5.504 7.399c-3.008 0-5.504-3.312-5.504-7.399s2.448-7.398 5.504-7.398zm-20.8 17.672c4.592 0 8.336-4.604 8.336-10.274 0-5.67-3.712-10.274-8.336-10.274-4.624 0-8.336 4.604-8.336 10.274 0 5.67 3.76 10.274 8.336 10.274zm0-17.672c3.04 0 5.504 3.311 5.504 7.398s-2.448 7.399-5.504 7.399c-3.056 0-5.504-3.312-5.504-7.399s2.496-7.398 5.504-7.398zm30.4 43.405l-8.8-15.556c-2.912-5.121-6.896-7.948-11.2-7.948-4.304 0-8.288 2.827-11.2 7.948l-8.8 15.54a18.048 18.048 0 00-1.44 3.23 12.285 12.285 0 00-.8 4.475c.067 6.39 5.039 11.63 11.36 11.97h.48c1.6.006 3.184-.319 4.656-.953 1.056-.42 2.816-1.228 4.64-2.1l.656.275A29.513 29.513 0 0045.572 66c6.33-.315 11.33-5.54 11.424-11.938a14.665 14.665 0 00-.784-4.394 18.146 18.146 0 00-1.504-3.311zm-9.152 16.784a23.965 23.965 0 01-8.448-1.842l.544-.274 1.6-.744c.105-.062.202-.138.288-.226l3.104-1.599c.694-.361.97-1.22.62-1.924a1.418 1.418 0 00-1.9-.644l-1.6.775c-2.48 1.276-6.624 3.425-8.368 4.152l-.16.113c-1.328.63-2.56 1.179-3.328 1.486a8.252 8.252 0 01-3.84.727h-.144c-4.805-.254-8.595-4.222-8.672-9.079a.578.578 0 000-.113c.006-1.155.223-2.3.64-3.376.318-.955.73-1.875 1.232-2.746l8.784-15.589c2.384-4.2 5.488-6.461 8.752-6.461 3.264 0 6.4 2.31 8.752 6.462l8.848 15.556c.5.872.912 1.792 1.232 2.746.403 1.131.63 2.32.672 3.521-.068 4.837-3.825 8.8-8.608 9.079z"
      fill="#6504B5"
    ></path>
  </svg>
);

const SearchResult = () => {
  const { data, isLoading, isFetching } = usePetQueries();
  const { filters, setFilters } = useAppContext();

  console.log('search result data: ', data);

  useEffect(() => {
    // console.log('filters changed agina: ', filters)
  }, [filters]);
  return (
    <div className={s.container}>
      <div className={s.art}>
        <Art />
      </div>

      <Container maxWidth={'xxl' as any} className={s.wrapper}>
        <div className={clsx([s.filters, 'sticky'])}>
          <Typography gutterBottom variant="h4">
            Filters
          </Typography>

          <div className={s.filter_list}>
            <Autocomplete
              disablePortal
              options={['Cat', 'Dog']}
              // multiple
              fullWidth
              value={filters?.type || ''}
              onChange={(event, newValue) => {
                if (newValue === null || newValue === '') {
                  const newFilter = filters;
                  delete newFilter?.type;
                  setFilters(newFilter);
                } else {
                  setFilters({ ...filters, type: newValue });
                }
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
              // multiple
              fullWidth
              value={filters?.age || ''}
              onChange={(event, newValue) => {
                if (newValue === null || newValue === '') {
                  const newFilter = filters;
                  delete newFilter?.age;
                  setFilters(newFilter);
                } else {
                  setFilters(() => ({ ...filters, age: newValue }));
                }
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth label="Age" name="age" />
              )}
            />

            <Autocomplete
              disablePortal
              options={['male', 'female']}
              // multiple
              fullWidth
              // value={selectedCategories}

              value={filters?.gender || ''}
              onChange={(event, newValue) => {
                if (newValue === null || newValue === '') {
                  const newFilter = filters;
                  delete newFilter?.gender;
                  setFilters(newFilter);
                } else {
                  setFilters({ ...filters, gender: newValue });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Gender"
                  name="geneder"
                />
              )}
            />

            <Autocomplete
              disablePortal
              options={['small', 'medium', 'large', 'xlarge']}
              // multiple
              fullWidth
              // value={selectedCategories}
              value={filters?.size || ''}
              onChange={(event, newValue) => {
                console.log('new value', newValue);
                if (newValue === null || newValue === '') {
                  const newFilter = filters;
                  delete newFilter?.size;
                  setFilters(newFilter);
                } else {
                  setFilters({ ...filters, size: newValue });
                }
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
              // multiple
              fullWidth
              // value={selectedCategories}

              value={filters?.good_with_children || (null as any)}
              onChange={(event, newValue) => {
                console.log('new value', newValue);

                if (newValue === null || newValue === '') {
                  const newFilter = filters;
                  delete newFilter?.good_with_children;
                  setFilters(newFilter);
                } else {
                  setFilters({
                    ...filters,
                    good_with_children: newValue.value,
                  });
                }
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
          </div>
        </div>

        <div className={s.content}>
          {/*<div className={s.filter_applied}>
            <Typography variant="h5">Filter Applied : </Typography>
            <div className={s.applied_list}>
              {filters.map((label) => (
                <Chip
                  label={label}
                  key={label}
                  clickable
                  onDelete={() => null}
                />
              ))}
            </div>
          </div>*/}

          <div className={s.results}>
            <Stack
              gap={4}
              alignItems="center"
              direction="row"
              className={s.title}
            >
              <Typography variant="h4" noWrap>
                Search Results : <Chip label={data?.animals.length} />
              </Typography>
              {(isLoading || isFetching) && (
                <div className={s.loader}>
                  <CircularProgress />
                </div>
              )}
            </Stack>

            <hr style={{ margin: '2rem 0' }} />

            {!isFetching && !isLoading && (
              <div className={s.list}>
                {data &&
                  data.animals.map((item) => (
                    <Link href={`/animal/${item.id}`} key={item.id}>
                      <div className={s.card}>
                        <Image
                          src={item.photos[0]?.medium || Buchi}
                          alt="buchi"
                          width={500}
                          height={500}
                        />
                        <div className={s.info}>
                          <Typography variant="h5">{item.name}</Typography>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            )}

            {!isFetching && !isLoading && !data && (
              <Alert severity="info">
                <Typography>
                  No results found. Please try again with different filters.
                </Typography>
              </Alert>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchResult;
