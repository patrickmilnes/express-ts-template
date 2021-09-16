import { Pool, PoolConfig, QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import IDatabaseOptions from '@models/IDatabaseOptions';

export default class DatabaseHandler {
  pool: Pool;

  public constructor(options: IDatabaseOptions) {
    const config: PoolConfig = {
      password: options.password,
      host: options.host,
      port: options.port,
      database: options.database,
      user: options.username,
      max: 10,
      connectionTimeoutMillis: 200000,
      idleTimeoutMillis: 600000,
    };
    this.pool = new Pool(config);
  }

  public async createAccount(email: string, username: string, password: string): Promise<boolean> {
    const id: string = v4();
    try {
      await bcrypt.hash(password, 10, async (err: Error, hash: string) => {
        const req: QueryResult<any> = await this.pool.query(`
          insert into account(id, username, password_hash, email)
          values('${id}', '${username}', '${hash}', '${email}')
        `);
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
