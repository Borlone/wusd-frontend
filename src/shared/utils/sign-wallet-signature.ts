import { getPayload, loginUser } from '@/services/users';
import { LoginPayload, signLoginPayload } from 'thirdweb/auth';
import { Account } from 'thirdweb/wallets';

export async function signWallet(account?: Account, chainId?: string) {
    const address = account?.address || '';

    if (!account) return;

    const response_payload = await getPayload({
        address,
        chainId: chainId ?? '',
    });

    if (!response_payload) return;

    const { signature, payload } = await signLoginPayload({
        payload: response_payload as LoginPayload,
        account,
    });

    if (!signature) return;

    const response_login = await loginUser({
        payload,
        signature,
    });

    if (!response_login) return;

    const token = response_login?.accessToken;
    localStorage.setItem('token', token);

    return token;
}
