export interface IMonthlyReward {
    id: number;

    userId: number;

    amountReward: number;

    month: number;

    year: number;

    lastDayReward: number;

    chainId: number;

    isClaimed: boolean;
}
