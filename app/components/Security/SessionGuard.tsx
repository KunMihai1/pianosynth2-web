'use client';
import { useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SessionGuard({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        async function checkSession() {
            const { data } = await supabase.auth.getSession();
            if (!data?.session) {
                router.replace('/login');
            } else {
                setSession(data.session);
                setLoading(false);
            }
        }

        checkSession();
    }, []);

    if (loading) return <div>Loading...</div>;

    return <>{children}</>;
}