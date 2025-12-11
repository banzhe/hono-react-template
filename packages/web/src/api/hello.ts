import type { ApiType } from "@deno-react-template/server";
import { hc } from "hono/client";

const client = hc<ApiType>("/");

export async function hello() {
  const res = await client.api.hello.$get();
  return await res.json();
}
