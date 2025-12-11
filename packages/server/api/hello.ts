import { Hono } from "hono";

const api = new Hono()
  .get("/hello", (c) => {
    return c.json({ message: "Hello from API!" });
  });

export default api;
