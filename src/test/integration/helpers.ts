import BluebirdPromise from "bluebird";
import { Server } from "@hapi/hapi";
import { IDatabase } from "pg-promise";
import buildServer from "../../server";
import Config from "../../lib/config";
import getConnection from "../../lib/get-connection";

const HEALTH_CHECK = "SELECT 1";

const env = {
  NODE_ENV: "test",
  DB_URL: "postgres://root:123@postgres/user"
};

interface TestContext {
  config: Config;
  connection: IDatabase<unknown>;
  server: Server;
}

export async function start(): Promise<TestContext> {
  const config = Config.init(env);
  const connection = await getConnection(config);
  const server = await buildServer({ config, providedConnection: connection });

  return BluebirdPromise.resolve(connection.oneOrNone(HEALTH_CHECK)).then(
    () => {
      return { config, connection, server };
    }
  );
}
