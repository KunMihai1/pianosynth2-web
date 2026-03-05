'use client'

import { supabase } from "./supabaseClient";

/** Call the Edge Function to fetch user profile */
export async function fetchUserNameBalancePlaytime(userId: string, token: string) {

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
    return data.profile; // { name,total_playtime_seconds, wallet_balance }
}

export async function fetchUserAllStats(userId: string, token: string) {
    if (!token) throw new Error("User not logged in");

    const res = await fetch(
        "https://ecmlftmkoqszdwjugqtn.supabase.co/functions/v1/get-all-user-stats",
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
    return {
        profile: data.profile,
        mostUsedDevice: data.most_used_device
    };
}

export async function fetchAllNameBalancePlaytime(token: string) {

    if (!token) throw new Error("User not logged in");

    const res = await fetch(
        "https://ecmlftmkoqszdwjugqtn.supabase.co/functions/v1/get-playtime-balance-all",
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

export async function fetchShopItems(userId: string, token: string) {
    if (!token) throw new Error("User not logged in");

    const res = await fetch(
        "https://ecmlftmkoqszdwjugqtn.supabase.co/functions/v1/get-shop-items",
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
    return data.shopItems; // array of { id, name, price, owned }
}

export async function purchaseItem(userId: string, itemId: string, token: string) {
    if (!token) throw new Error("User not logged in");

    const res = await fetch(
        "https://ecmlftmkoqszdwjugqtn.supabase.co/functions/v1/purchase-item",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // JWT for auth
            },
            body: JSON.stringify({ user_id: userId, item_id: itemId }),
        }
    );

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `Purchase failed with status ${res.status}`);
    }

    const data = await res.json();
    return data.success; // boolean
}

export async function downloadItem(itemId: string, token: string) {
    if (!token) throw new Error("User not logged in");

    const res = await fetch(
        "https://ecmlftmkoqszdwjugqtn.supabase.co/functions/v1/download-item",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ itemId }),
        }
    );

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `Download failed with status ${res.status}`);
    }

    const data = await res.json();
    return { signedUrl: data.signedUrl, fileName: data.fileName };
}

export async function getUserSession() {
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
