'use client';

import Link from 'next/link';
import Button from '../ui/Button';

export default function QuickActions() {
    return (
        <div className="flex gap-4 mt-6">
            <Link href="/shop">
                <Button>Go to Shop</Button>
            </Link>
            <Link href="/profile">
                <Button>View Profile</Button>
            </Link>
        </div>
    );
}