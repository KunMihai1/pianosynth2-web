import { supabase } from './supabaseClient';

export async function requireAuth() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return null;
    return { userId: data.session.user.id, token: data.session.access_token };
}