import { Nullable } from "@backend/types";

export async function req(path: string, options?: Nullable<RequestInit>) {
  const result = await fetch(
    `http://localhost:3000${path}`,
    options || undefined
  );
  return await result.json();
}
