import { Hono } from "hono";
import { serveStatic } from "hono/deno";

const app = new Hono();

const api = new Hono();
api.get("/hello", (c) => {
  return c.json({ message: "Hello from API!" });
});
app.route("/api", api);

// 静态文件服务
app.use("/*", serveStatic({ root: "./dist" }));

Deno.serve(app.fetch);
