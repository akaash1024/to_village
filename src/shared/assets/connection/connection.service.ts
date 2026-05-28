import { Injectable, Logger } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import * as defaultEntities from '../cp-entity';

interface LocationConnection {
  key: string;
  datasource: DataSource | any;
}

@Injectable()
export class ConnectionService {
  private static connections = new Map<string, LocationConnection>();

  constructor() {}

  public readonly getMyRepository = (
    entityManager: EntityManager | undefined,
    EntityName: string,
  ): Repository<any> => {
    if (!entityManager) {
      throw new Error('EntityManager is not initialized');
    }
    return entityManager.getRepository(EntityName);
  };

  public readonly getOrCreate = async (
    locationId: string,
  ): Promise<{ key: string; datasource: DataSource }> => {
    const datasource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: locationId,
      entities: defaultEntities,
      synchronize: false,
      extra: {
        max: 10,
      },
    });

    await datasource.initialize();

    const key = `${locationId}-${process.pid}-${Date.now()}`;

    const connection = { key, datasource };

    ConnectionService.connections.set(key, connection);

    return connection;
  };

  async removeLocation(connectionKey: string | undefined) {
    const entry = ConnectionService.connections.get(connectionKey ?? '');

    if (!entry) return;

    if (entry.datasource.isInitialized) {
      await entry.datasource.destroy();
    }

    ConnectionService.connections.delete(connectionKey ?? '');
  }

  async removeAll() {
    for (const [key, entry] of ConnectionService.connections) {
      if (entry.datasource.isInitialized) {
        await entry.datasource.destroy();
      }
    }

    ConnectionService.connections.clear();
  }
}
