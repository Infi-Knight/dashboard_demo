import type { NextApiRequest, NextApiResponse } from 'next';

export const clubs = ['AFC Eskilstuna', 'AIK Atlas', 'Adolfsbergs IK'];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  res.status(200).json(clubs);
}