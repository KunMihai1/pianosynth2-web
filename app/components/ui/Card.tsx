'use client';

export default function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-slate-800 p-4 rounded-md shadow-md text-white">
            {children}
        </div>
    );
}