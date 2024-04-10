/**
 * Sidebar.tsx
 */

import React from 'react';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <div style={{ width: 200, backgroundColor: '#f0f0f0', padding: 20 }}>
            <aside>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                </ul>
            </aside>
            
        </div>
    );
}

