import { DbClient } from './dbClient';

const WRITE_METHODS = [
  'create',
  'update',
  'upsert',
  'delete',
  'createMany',
  'updateMany',
  'deleteMany',
] as const;

export class ReadonlyDbClient {
  public readonly _db: DbClient;
  constructor(dbClient: DbClient) {
    this._db = dbClient;
    this._db.$extends({
      name: 'ReadonlyClient',
      model: {
        $allModels: Object.fromEntries(
          WRITE_METHODS.map((method) => [
            method,
            function (_args: never) {
              throw new Error(
                `Calling the \`${method}\` method on a readonly client is not allowed`
              );
            },
          ])
        ) as {
          [K in (typeof WRITE_METHODS)[number]]: (
            args: `Calling the \`${K}\` method on a readonly client is not allowed`
          ) => never;
        },
      },
    });
  }
}
