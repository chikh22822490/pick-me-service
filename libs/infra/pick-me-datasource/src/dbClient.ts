import { PrismaClient } from '@prisma/client';

export class DbClient extends PrismaClient {
  constructor(databaseUrl: string) {
    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
      errorFormat: 'minimal',
    });
  }
}
