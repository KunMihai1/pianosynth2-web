const AUTH_PROXY_URL =
    'https://ecmlftmkoqszdwjugqtn.supabase.co/functions/v1/auth-proxy';

export interface AuthResponse {
    access_token?: string;
    user?: {
        id: string;
        email: string;
        user_metadata?: { name?: string };
    };
    error?: string;
    error_description?: string;
    msg?: string;
}

export async function login(
    email: string,
    password: string
): Promise<AuthResponse> {
    const res = await fetch(`${AUTH_PROXY_URL}?grant_type=password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error_description || data.msg || data.error || 'Login failed');
    }

    return data;
}

export async function signup(
    email: string,
    password: string,
    name: string
): Promise<AuthResponse> {
    const res = await fetch(`${AUTH_PROXY_URL}?action=signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, data: { name } }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error_description || data.msg || data.error || 'Signup failed');
    }

    return data;
}
