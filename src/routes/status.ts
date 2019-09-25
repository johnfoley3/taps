import Promise from "bluebird";
import { Request } from "@hapi/hapi";
import { ServerRoute } from "@hapi/hapi";
import { serverMethods } from "../server";

function getStatus(request: Request): Promise<any> {
  const methods = serverMethods(request);
  const connection = methods.connection();

  return Promise.resolve(connection.one("SELECT now();")).then(now => {
    return { status: "good", dbTime: now };
  });
}

const route: ServerRoute = {
  method: "GET",
  path: "/status",
  options: {
    auth: false,
    handler: getStatus,
    description: "Status",
    notes: "Returns a positive status if the service is alive and healthy",
    tags: ["api", "status"],
    plugins: {
      "hapi-swagger": {
        responses: {
          "200": {
            description: "Success"
          },
          "500": {
            description: "Internal Server Error"
          }
        }
      }
    }
  }
};

export default route;
