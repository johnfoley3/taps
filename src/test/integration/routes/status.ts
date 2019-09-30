import { Server } from "@hapi/hapi";
import httpStatus from "http-status-codes";
import { start } from "../helpers";

describe("/status", () => {
  let server: Server;

  beforeAll(async () => {
    await start().then(ctx => {
      server = ctx.server;
    });
  });

  test("responds OK when the service is healthy", async () => {
    const { statusCode, result } = await server.inject({
      method: "GET",
      url: "/status"
    });

    expect(statusCode).toEqual(httpStatus.OK);
    expect(result).toEqual({ status: "good" });
  });
});
