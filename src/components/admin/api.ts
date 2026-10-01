import type { Collection } from "@/lib/types";

async function handle(request: Promise<Response>) {
  const res = await request;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data;
}

export function createItem(collection: Collection, payload: Record<string, unknown>) {
  return handle(
    fetch(`/api/admin/${collection}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  );
}

export function updateItem(collection: Collection, id: string, payload: Record<string, unknown>) {
  return handle(
    fetch(`/api/admin/${collection}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  );
}

export function deleteItem(collection: Collection, id: string) {
  return handle(fetch(`/api/admin/${collection}/${id}`, { method: "DELETE" }));
}
