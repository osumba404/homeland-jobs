export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<{ success: boolean; data: T | null; error: string | null }> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('hj_token') : null
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> | undefined),
    },
  })
  return res.json()
}

export function getStoredUser(): { id: string; name: string; email: string; role: string } | null {
  if (typeof window === 'undefined') return null
  try {
    return JSON.parse(localStorage.getItem('hj_user') ?? 'null')
  } catch {
    return null
  }
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('hj_token')
}

export function logout() {
  localStorage.removeItem('hj_token')
  localStorage.removeItem('hj_user')
}
