import { Server } from "@hapi/hapi";
import httpStatus from "http-status-codes";
import { start, getRoute } from "../helpers";

describe("/status", () => {
  let server: Server;

  beforeAll(async () => {
    await start().then(ctx => {
      server = ctx.server;
    });
  });

  test("responds OK when the service is healthy", async () => {
    const { statusCode, result } = await getRoute(server, "/status");

    expect(statusCode).toEqual(httpStatus.OK);
    expect(result).toEqual({ status: "good" });
  });
});
