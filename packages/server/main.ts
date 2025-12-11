import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import hello from "./api/hello.ts";

const app = new Hono();

const routes = app.route("/api", hello);

export type ApiType = typeof routes;

// 静态文件服务（在类型导出后添加）
routes.use("/*", serveStatic({ root: "./dist" }));

Deno.serve(routes.fetch);
