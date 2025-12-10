import { Hono } from "hono";

export const api = new Hono()
  .get("/hello", (c) => {
    return c.json({ message: "Hello from API!" });
  });

export type ApiType = typeof api;
