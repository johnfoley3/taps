import Promise from "bluebird";
import hapi, { Request, Server } from "@hapi/hapi";
import { IDatabase } from "pg-promise";
import routes from "./routes";
import Config from "./lib/config";
import methods from "./plugins/methods";

interface ServerOpts {
  config: Config;
  providedConnection?: IDatabase<unknown>;
}

export interface ServerMethods {
  connection(): IDatabase<unknown>;
  config(): Config;
}

export function serverMethods(request: Request): ServerMethods {
  return request.server.methods as any;
}

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

export default function buildServer(serverOpts: ServerOpts): Promise<Server> {
  const { config, providedConnection } = serverOpts;

  const server = new hapi.Server({
    host,
    port,
    debug: { request: ["*"] }
  });

  const plugins = [
    {
      plugin: methods,
      options: {
        connection: providedConnection,
        config
      }
    }
  ];

  return Promise.map(plugins, plugin => server.register(plugin as any))
    .then(() => server.route(routes))
    .then(() => server);
}
