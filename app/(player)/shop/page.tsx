'use client';

import { useEffect, useState } from 'react';
import AppHeader from '../../components/layout/AppHeader';
import CurrencyBar from '../../components/shop/CurrencyBar';
import ShopLayout from '../../components/shop/ShopLayout';
import PurchaseOverlay from '../../components/shop/PurchaseOverlay';
import DownloadModal from '../../components/shop/DownloadModal';
import { ShopItem } from '../../components/shop/types/shop';
import { fetchShopItems, fetchUserNameBalancePlaytime, purchaseItem, downloadItem } from '../../lib/supabaseApi';
import { getUserSession } from '../../lib/supabaseApi';
import { requireAuth } from '@/app/lib/auth';
import { useRouter } from 'next/navigation';

type UserData = {
    wallet_balance: number;
    display_name: string;
}

type DownloadInfo = {
    signedUrl: string;
    fileName: string;
};

export default function ShopPage() {
    const [balance, setBalance] = useState(0);
    const [items, setItems] = useState<ShopItem[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<{ username: string; currency: number } | null>(null);

    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    // Purchase processing state
    const [purchasing, setPurchasing] = useState(false);
    const [purchaseMessage, setPurchaseMessage] = useState('Processing your transaction…');

    // Download modal state
    const [downloadInfo, setDownloadInfo] = useState<DownloadInfo | null>(null);


    const router = useRouter();

    useEffect(() => {
        async function loadShop() {
            setLoading(true);
            try {
                const sessionData = await requireAuth();
                if (!sessionData) {
                    router.replace('/login');
                    return;
                }

                const { userId, token } = sessionData;
                setToken(token);
                setUserId(userId);

                const profile: UserData = await fetchUserNameBalancePlaytime(userId, token);

                setUser({
                    username: profile.display_name,
                    currency: profile.wallet_balance,
                });

                const shopItems: ShopItem[] = await fetchShopItems(sessionData.userId, sessionData.token);
                setItems(shopItems);
                setBalance(profile.wallet_balance);
            } catch (err: any) {
                setError(err.message || "Failed to load shop");
            } finally {
                setLoading(false);
            }
        }

        loadShop();
    }, []);

    const handleBuy = async (item: ShopItem) => {
        if (!token || !userId) {
            alert("Session not ready. Please reload.");
            return;
        }

        if (item.owned) return;
        if (balance < item.price) {
            alert("Insufficient balance!");
            return;
        }

        try {
            // Show processing overlay
            setPurchaseMessage('Processing your transaction…');
            setPurchasing(true);

            await purchaseItem(userId, item.id, token);

            // Update local state
            setItems(prev =>
                prev.map(i => (i.id === item.id ? { ...i, owned: true } : i))
            );
            setBalance(prev => prev - item.price);

            // If the item is downloadable, fetch the signed URL and show the download modal
            if (item.item_type === 'downloadable') {
                setPurchaseMessage('Preparing your download…');
                try {
                    const result = await downloadItem(item.id, token);
                    setPurchasing(false);
                    setDownloadInfo({
                        signedUrl: result.signedUrl,
                        fileName: result.fileName ?? item.name,
                    });
                } catch {
                    setPurchasing(false);
                    alert("Purchase succeeded but failed to generate download link. You can download from the shop.");
                }
            } else {
                setPurchasing(false);
            }
        } catch (err: any) {
            setPurchasing(false);
            alert(err.message || "Purchase failed");
        }
    };

    const handleDownload = async (item: ShopItem) => {
        if (!token) {
            alert("Session not ready. Please reload.");
            return;
        }
        try {
            const result = await downloadItem(item.id, token);
            setDownloadInfo({
                signedUrl: result.signedUrl,
                fileName: result.fileName ?? item.name,
            });
        } catch (err: any) {
            alert(err.message || "Download failed");
        }
    };

    if (loading) return <p className="p-6 text-white">Loading shop...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-slate-950">
            <AppHeader username={user?.username} />
            <main className="max-w-6xl mx-auto p-6 space-y-6">
                <CurrencyBar balance={balance} onSearchChange={setSearch} />
                <ShopLayout
                    items={items}
                    balance={balance}
                    searchTerm={search}
                    purchasing={purchasing}
                    onBuy={handleBuy}
                    onDownload={handleDownload}
                />
            </main>

            {/* Full-screen overlay while purchasing */}
            <PurchaseOverlay visible={purchasing} message={purchaseMessage} />

            {/* Download modal after purchase / on-demand download */}
            {downloadInfo && (
                <DownloadModal
                    signedUrl={downloadInfo.signedUrl}
                    fileName={downloadInfo.fileName}
                    expiresInSeconds={60}
                    onClose={() => setDownloadInfo(null)}
                />
            )}
        </div>
    );
}