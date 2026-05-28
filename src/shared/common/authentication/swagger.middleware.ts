// swagger.middleware.ts
import { Request, Response, NextFunction } from 'express';

const basicAuth = require('basic-auth');

export function swaggerAuth(req: Request, res: Response, next: NextFunction) {
  const user = basicAuth(req);

  const USERNAME = process.env.SWAGGER_USER;
  const PASSWORD = process.env.SWAGGER_PASS;

  if (!user || user.name !== USERNAME || user.pass !== PASSWORD) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Swagger Docs"');
    return res.status(401).send('Authentication required');
  }

  next();
}
