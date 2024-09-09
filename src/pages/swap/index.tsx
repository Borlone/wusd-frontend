import type { ReactElement } from 'react';
import MainLayout from '@/shared/layouts/main';
import Swap from '@/screens/swap';

export default function Page() {
    return (
        <MainLayout>
            <Swap />
        </MainLayout>
    );
}
