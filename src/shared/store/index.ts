import { IUserResponse } from '@/types/users';
import { Notification } from '@/types/notification';
import { create } from 'zustand';
import { ChainOptions } from 'thirdweb/chains';
import { defaultChain } from '@/configs/thirdweb/defineChain';

type State = {
    chain: Readonly<ChainOptions & { rpc: string }>;
    setChain: (chain: Readonly<ChainOptions & { rpc: string }>) => void;

    openWalletConnectModal: boolean;
    openConfirmRequestModal: boolean;
    isError: boolean;
    setIsError: (value: boolean) => void;
    setOpenWalletConnectModal: (value: boolean) => void;
    setOpenConfirmRequestModal: (value: boolean) => void;

    userInfo: IUserResponse | null;
    setUserInfo: (value: IUserResponse | null) => void;

    notiInfo: Notification | null;
    setNotiInfo: (value: Notification | null) => void;
};

export const useGlobalStore = create<State>((set) => ({
    chain: defaultChain,
    setChain: (chain) => set({ chain }),

    openWalletConnectModal: false,
    openConfirmRequestModal: false,
    isError: false,
    setIsError: (value: boolean) => set({ isError: value }),
    setOpenConfirmRequestModal: (value: boolean) => set({ openConfirmRequestModal: value }),
    setOpenWalletConnectModal: (value: boolean) => set({ openWalletConnectModal: value }),

    userInfo: null,
    setUserInfo: (value: IUserResponse | null) => set({ userInfo: value }),

    notiInfo: null,
    setNotiInfo: (notiInfo: Notification | null) => set({ notiInfo }),
}));
