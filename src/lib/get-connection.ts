import { IDatabase } from "pg-promise";
import pgp from "./pgp";
import Config from "./config";

export default function getConnection(
  config: Config
): Promise<IDatabase<unknown>> {
  return Promise.resolve(pgp(config.get("DB_URL")));
}
