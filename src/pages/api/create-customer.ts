import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // access the data from the body and update the database

  console.log('body  data: ', req.body);

  if (req.method === 'POST') {
    try {
      const data = await axios.post(
        'http://64.226.105.205:9000/buchi/customer',
        {
          ...req.body,
        },
      );

      console.log('data: ', data.data);

      return res.status(201).json({ ...data.data });
    } catch (error) {
      console.log('create pet error: ', error);

      return res
        .status(500)
        .json({ success: false, message: 'Error creating data' });
    }
  }

  return res.status(404).json({ success: false, message: 'Route not found' });
}
