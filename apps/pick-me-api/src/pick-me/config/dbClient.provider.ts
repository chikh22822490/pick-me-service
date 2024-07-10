import { ReadonlyDbClient, DbClient } from '@pick-me-datasource';
import { Provider, Scope } from '@nestjs/common';

const DbClientProvider: Provider<DbClient> = {
  provide: DbClient,
  useFactory: () => {
    const client = new DbClient(process.env.PICK_ME_DATABASE);
    return client;
  },
  scope: Scope.DEFAULT,
};

const ReadonlyDbClientProvider: Provider<ReadonlyDbClient> = {
  provide: ReadonlyDbClient,
  useFactory: (dbClient: DbClient) => {
    return new ReadonlyDbClient(dbClient);
  },
  inject: [DbClient],
  scope: Scope.REQUEST,
};

export { ReadonlyDbClientProvider, DbClientProvider };
