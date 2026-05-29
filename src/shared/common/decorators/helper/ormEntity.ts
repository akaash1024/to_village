import { Logger } from '@nestjs/common';
import { ConnectionService } from 'src/shared/assets/connection';
import { Repository } from 'typeorm';

export const ormEntity = async ({ ...options }): Promise<any> => {
  try {
    const dbName: string = options?.args?.database ?? '';
    const connectionServices: ConnectionService =
      options?.services?.connectionService;
    const { key, datasource }: any =
      await connectionServices.getOrCreate(dbName);
    const manager = datasource.manager;

    if (options?.args?.entities?.length) {
      const repos = { key };
      options?.args?.entities.map((en) => {
        try {
          const repo: Repository<any> | undefined =
            connectionServices.getMyRepository(manager, en);
          if (repo) {
            repos[en] = repo;
          }
        } catch (error) {
          Logger.warn(error);
        }
      });
      return repos;
    }

    return connectionServices.getOrCreate(dbName);
  } catch (err) {
    return;
  }
};

export const closeConnection = async ({ ...options }): Promise<any> => {
  try {
    const dbName: string = options?.args?.database ?? '';
    const connectionServices: ConnectionService =
      options?.services?.connectionService;
    return await connectionServices.removeLocation(dbName);
  } catch (err) {
    return;
  }
};
