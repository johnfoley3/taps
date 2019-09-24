import Promise from "bluebird";
import { Server } from "@hapi/hapi";
import { IDatabase } from "pg-promise";
import getConnection from "../lib/get-connection";
import Config from "../lib/config";

const packageInfo = require("../../package"); /* eslint-disable-line */

export interface MethodOptions {
  config: Config;
  connection: IDatabase<{}>;
}

export default {
  name: "methods",
  version: packageInfo.version,
  register: (server: Server, options: MethodOptions) => {
    return Promise.resolve(
      options.connection || getConnection(options.config)
    ).then(connection => {
      server.method("connection", (() => connection) as any);
      server.method("config", (() => options.config) as any);
    });
  }
};
