import { NextFunction, Request, Response } from 'express';

import { HttpException } from '@exceptions/HttpException';
import { SIGNING_SECRET } from '@config';
import { logger } from '@/utils/logger';
import { verifySignature } from '@/utils/signature';

const signatureMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = parseInt(req.header('x-tribe-request-timestamp'), 10);
  const signature = req.header('x-tribe-signature');
  const rawBody = req['rawBody']
  try {
    if (rawBody && verifySignature({ body: rawBody, timestamp, secret: SIGNING_SECRET, signature })) {
      return next();
    }
  } catch (err) {
      logger.error(err)
  }
  return next(new HttpException(403, 'The x-tribe-signature is not valid.'));
};

export default signatureMiddleware;
