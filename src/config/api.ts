// src/config/api.ts
export const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(
  /\/$/,
  '',
)

if (!API_BASE) {
  console.warn('VITE_API_BASE_URL not set. Requests will fail.')
}

export const ENDPOINTS = {
  NODE: {
    LIST: `/nodes`,
    DETAILS: (name: string) => `/nodeDetails/${name}`,
  },
  WORKFLOW: {
    GET: (id: string) => `/workflows/${id}`,
    UPDATE: (id: string) => `/workflow/update/${id}`, // PUT per docs
  },
}
