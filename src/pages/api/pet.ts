// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // access the data from the body and update the database

  /*
    const apiKey =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJLS2R4ZER4V1NoMDZ1OGtTOUI2bEFYZ21YdmhqYVpuTlI1ZGpITmRCcnhma0ljNTRoWCIsImp0aSI6ImQyOTdlMDFhNTZkNjY1NzE4MzJiMjNjNTEzNTU5ODViM2JmZDc2OTYwZWM4MWViN2I5ZDFkMDc1YWZjMzczZWNjYTk4YzMxNzIyYjUyNTAxIiwiaWF0IjoxNjgzNTQ4ODc3LCJuYmYiOjE2ODM1NDg4NzcsImV4cCI6MTY4MzU1MjQ3Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.pPED5v7bjVBF2gwRJPykH46P1TS2XwIIi_5QvqoGr1nQ7fzeGbLQsc9i146lfs9nucbjDRrHxWgx4yyblq8i3CnNzFnAaJppIJzEW3dNwP13SZz0nxSzyosaego0Qb0xat-MxfHwHptgjd-zsLUUVhWZtTyUUA19yYH1fYxMfzKGImUc0g__2PbgDiUzSOudy6LC__Bh16kFVH_OBe922jJKZEusyLTIMEHNGFWx7SazF0-TUFdaAsOdVuUNO6MOdABaLm67uUS6xfmR0b12Qrh8zOLH83CRczFJBXgaWnyZSmPPt5eSHaUYS4KJeESAleeDynHsSAOtXvabcfekYw" ';
  */

  /*  axios
    .get('https://api.petfinder.com/v2', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
    .then((respose) => {
      console.log('response: ', respose.data);
      res.status(200).json({ data: respose.data  });
    })
    .catch((err) => {
      console.log('error :', err);
    });*/

  res.status(200).json({ data: 'updated' });
}
