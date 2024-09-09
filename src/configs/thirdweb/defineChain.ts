import { sepolia, ethereum } from 'thirdweb/chains';

const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';

const defaultChain = isProduction ? ethereum : sepolia;

const supportedChains = isProduction ? [ethereum] : [sepolia];

export { defaultChain, supportedChains };
