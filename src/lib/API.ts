import axios from 'axios';

// todo : use environment variable to store this
const apiKey =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJLS2R4ZER4V1NoMDZ1OGtTOUI2bEFYZ21YdmhqYVpuTlI1ZGpITmRCcnhma0ljNTRoWCIsImp0aSI6IjFmYjhmNjIwYTk0ZGFkMDQ3OTY5NTE0YzBmNzFmYzZjMzdlYWNhYmI0OTNlZGQzNjFmYTY4YmEyMTI5NTVlOTA2ZDZhMmQzYmEzZjM2Y2U4IiwiaWF0IjoxNjgzNTUzMzk4LCJuYmYiOjE2ODM1NTMzOTgsImV4cCI6MTY4MzU1Njk5OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.Qyblh2RwgcT8gTSclhhAvvBRl51tkkvnoJALoSWJThBAtfFxWDajvPks0IKA574Hpvv1W1WkfmrjMNRqgaB9mYf7LMJ253zgETokGCymWVgttllNgaAK95iUiN5UHIXwmycf-NPVRmeG_yf-ZZbqAm-Xp7afRJm_EjBiLJjHh5ES7NmK2dK7_LdnLzYFEHTiR2s7nk4COc8tVN4KZ1AK_v2JLYgvKcQCjffj2ZtI9lLW7_YK10fPL-s55c_50WEstPqyjq-8T9CIGZO6hrxnHN3qKX_dY7O3adFBlCf6sLNHpAxPlAeKZMCnMlUAxykvSYkMwR7rPB1nSiCLm84rzQ';

// let accessToken = localStorage.getItem('accessToken');
// let accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

// get the access token and expiry time from localStorage (only on the client-side)
let accessToken: string | null = null;
let accessTokenExpiry: string | null = null;
if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('accessToken');
  accessTokenExpiry = localStorage.getItem('accessTokenExpiry');
}

const API = axios.create({
  baseURL: 'https://api.petfinder.com/v2/',
  headers: {
    Authorization: `Bearer ${accessToken || apiKey}`,
  },
});

// define an interceptor that will refresh the access token if necessary
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // check if the error is due to an expired access token

    accessToken = localStorage.getItem('accessToken');
    accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

    if (!accessTokenExpiry || Number(accessTokenExpiry) <= Date.now()) {
      // refresh the access token

      console.log('interceptors accessToken --> ', accessToken);

      const response = await axios.post(
        'https://api.petfinder.com/v2/oauth2/token',
        {
          grant_type: 'client_credentials',
          client_id: process.env.NEXT_PUBLIC_API_KEY,
          client_secret: process.env.NEXT_PUBLIC_API_SECRET,
        },
      );

      // update the access token and expiry time
      accessToken = response.data.access_token;
      accessTokenExpiry = String(Date.now() + response.data.expires_in * 1000);

      console.log('new access accessToken --> ', accessToken);

      // store the updated access token and expiry time in localStorage
      localStorage.setItem('accessToken', accessToken as string);
      localStorage.setItem('accessTokenExpiry', accessTokenExpiry);

      // retry the original request with the updated access token
      error.config.headers.Authorization = `Bearer ${accessToken}`;
      return axios.request(error.config);
    }

    return Promise.reject(error);
  },
);

/*

// define an interceptor that will refresh the access token
API.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem('accessToken');
  let accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

  // check if the access token has expired
  if (!accessTokenExpiry || Number(accessTokenExpiry) <= Date.now()) {
    // refresh the access token
    const response = await axios.post(
      'https://api.petfinder.com/v2/oauth2/token',
      {
        grant_type: 'client_credentials',
        client_id: process.env.NEXT_PUBLIC_API_KEY,
        client_secret: process.env.NEXT_PUBLIC_API_SECRET,
      },
    );

    // update the access token and expiry time
    accessToken = response.data.access_token;
    accessTokenExpiry = String(Date.now() + response.data.expires_in * 1000);

    // store the updated access token and expiry time in localStorage
    localStorage.setItem('accessToken', accessToken as string);
    localStorage.setItem('accessTokenExpiry', accessTokenExpiry);
  }

  // set the updated access token in the request headers
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});*/

export default API;
