'use client';

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`bg-slate-800 p-4 rounded-md shadow-md text-white ${className}`}>
            {children}
        </div>
    );
}