import { useRequest } from "ahooks";
import { Button } from "../components/ui/button.tsx";
import { hello } from "../api/hello.ts";

export default function Index() {
  const {
    data: text,
    loading,
    error,
  } = useRequest(async () => {
    const { message } = await hello();
    return message;
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
