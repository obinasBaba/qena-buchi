import { QueryFunction, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import API from '@/lib/API';
import { State, useAppContext } from '@/context/app';

export type Animal = {
  id: number;
  organization_id: string;
  type: string;
  species: string;
  breeds: {
    primary: string;
    secondary: string | null;
    mixed: false;
    unknown: false;
  };
  colors: {
    primary: null;
    secondary: null;
    tertiary: null;
  };
  age: string;
  gender: string;
  size: string;
  coat: null;
  attributes: {
    spayed_neutered: true;
    house_trained: true;
    declawed: false;
    special_needs: true;
    shots_current: false;
  };
  environment: {
    children: boolean;
    dogs: false;
    cats: null;
  };
  tags: ['Social and Friendly'];
  name: string;
  description: string;
  organization_animal_id: '200311';
  photos: {
    small: string;
    medium: string;
    large: string;
    full: string;
  }[];
  primary_photo_cropped: {
    small: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64120761/1/?bust=1683528662&width=300';
    medium: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64120761/1/?bust=1683528662&width=450';
    large: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64120761/1/?bust=1683528662&width=600';
    full: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64120761/1/?bust=1683528662';
  };
  videos: [];
  status: string;
  status_changed_at: '2023-05-08T06:40:38+0000';
  published_at: '2023-05-08T06:40:36+0000';
  distance: null;
  contact: {
    email: 'littlemews@yahoo.com';
    phone: '(734) 304-0123';
    address: {
      address1: null;
      address2: null;
      city: 'Manchester';
      state: 'MI';
      postcode: '48158';
      country: 'US';
    };
  };
  _links: {
    self: {
      href: '/v2/animals/64120761';
    };
    type: {
      href: '/v2/types/cat';
    };
    organization: {
      href: '/v2/organizations/ny867';
    };
  };
};

type Pagination = {
  count_per_page: number;
  total_count: number;
  current_page: number;
  total_pages: number;
  _links: {
    next: {
      href: string;
    };
  };
};

const queryFn: QueryFunction<
  {
    animals: Animal[];
    pagination: Pagination;
  },
  [Exclude<State['filters'], null>, string]
> = async ({ queryKey }) => {
  const url = '/animals';
  const [filters] = queryKey;

  try {
    const res = await API.get(url, {
      params: {
        ...filters,
        limit: 10,
      },
    });
    console.log('pet res: ', res.data);
    return res.data;
  } catch (err) {
    console.log('pet queryFn err: ', err);
    throw err;
  }
};

export const CONTACTS_REFRESH_KEY = 'PETS';

export const usePetQueries = (refreshKey = CONTACTS_REFRESH_KEY) => {
  const { filters } = useAppContext();

  const query = useQuery({
    enabled: filters !== null,
    queryKey: [filters as any, refreshKey],
    queryFn,
  });

  useEffect(() => {
    console.log('filters change: ', filters);
  }, [filters]);

  return query;
};
