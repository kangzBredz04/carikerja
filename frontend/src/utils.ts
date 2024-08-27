/* eslint-disable @typescript-eslint/no-explicit-any */
async function send<T>(
  endpoint: string,
  method: string,
  body?: any,
  header: string = "application/json"
): Promise<T> {
  const response = await fetch(`http://localhost:8080/api${endpoint}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": header,
    },
    body: body ? JSON.stringify(body) : undefined, // hanya kirim body jika ada
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  // Response body diambil jika method bukan "DELETE"
  if (method !== "DELETE") {
    const data: T = await response.json();
    return data;
  }

  return {} as T; // jika DELETE tidak mengembalikan body
}

export const api = {
  get: <T>(endpoint: string): Promise<T> => send<T>(endpoint, "GET"),
  post: <T>(endpoint: string, body: any): Promise<T> => send<T>(endpoint, "POST", body),
  put: <T>(endpoint: string, body: any): Promise<T> => send<T>(endpoint, "PUT", body),
  delete: <T>(endpoint: string): Promise<T> => send<T>(endpoint, "DELETE"),
  delete2: <T>(endpoint: string, body: any): Promise<T> => send<T>(endpoint, "DELETE", body),
};
