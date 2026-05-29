import { Logger } from '@nestjs/common';
import { Pool } from 'pg';

const clientDbConnection = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const orm = async ({ ...options }): Promise<any> => {
  try {
    const dbName: string = options?.args?.database ?? '';
    // Create New Client
    let dbClient;

    // If Same Db Pool Does Not Have Pool Then Create New Pool
    if (!clientDbConnection[dbName]) {
      clientDbConnection[dbName] = new Pool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: dbName,
      });
      dbClient = clientDbConnection[dbName];
      dbClient = await dbClient.connect();
      return dbClient;
    }

    // If Same Db Pool Then Return Pool
    if (clientDbConnection[dbName]) {
      dbClient = clientDbConnection[dbName];
      dbClient = await dbClient.connect();
      return dbClient;
    }
  } catch (err) {
    return;
  }
};
