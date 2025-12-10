import { useRequest } from "ahooks";
import { Button } from "../components/ui/button.tsx";
import type { ApiType } from '@deno-react-template/server'
import { hc } from 'hono/client'

export default function Index() {
  const {
    data: text,
    loading,
    error,
  } = useRequest(async () => {
    const client = hc<ApiType>('/api')
    await client.hello.$get()

    const response = await fetch("/api/hello");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  });

  return (
    <div>
      <h1>Index</h1>
      <Button>Click me</Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && <p>{text}</p>}
    </div>
  );
}
