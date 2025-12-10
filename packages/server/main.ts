import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { api } from "./api.ts";

const app = new Hono();

const routes = app.route("/api", api);

// 静态文件服务（在类型导出后添加）
routes.use("/*", serveStatic({ root: "./dist" }));

Deno.serve(routes.fetch);
