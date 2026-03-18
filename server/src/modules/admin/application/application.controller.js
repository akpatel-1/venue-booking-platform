import { processApplicationRequest } from './application.service.js';

export async function handleApplicationRequest(req, res) {
  const result = await processApplicationRequest(req.Status);
  res.status(200).json({ applications: result });
}
