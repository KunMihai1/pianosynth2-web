'use client'

import { supabase } from "./supabaseClient";

/** Call the Edge Function to fetch user profile */
export async function fetchUserProfile(userId: string, token:string) {

    if (!token) throw new Error("User not logged in");

    const res = await fetch(
        "https://ecmlftmkoqszdwjugqtn.supabase.co/functions/v1/get-playtime-balance-user",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // JWT for auth
            },
            body: JSON.stringify({ user_id: userId }),
        }
    );

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `Fetch failed with status ${res.status}`);
    }

    const data = await res.json();
    return data.profile; // { total_playtime_seconds, wallet_balance }
}

export async function fetchAllProfiles(token:string) {

    if (!token) throw new Error("User not logged in");

    const res = await fetch(
        "https://ecmlftmkoqszdwjugqtn.supabase.co/functions/v1/get-all-profile-stats",
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }
    );

    if (!res.ok) throw new Error("Failed to fetch all profiles");
    const data = await res.json();
    return data.profiles; // array of { user_id, total_playtime_seconds, wallet_balance }
}


async function getUserSession() {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (!session || error) {
        console.log("Not logged in or error:", error);
        return;
    }

    const userId = session.user.id;          
    const token = session.access_token;       

    console.log("User ID:", userId);
    console.log("JWT:", token);

    return { userId, token };
}