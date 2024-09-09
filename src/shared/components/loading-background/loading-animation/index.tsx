import dynamic from 'next/dynamic';
import LoadingLottie from '../loading-lottie.json';

const Lottie = dynamic(() => import('lottie-react'), {
    ssr: false,
});

type Props = {
    className?: string;
};

export default function LoadingAnimation({ className = 'w-[160px] h-[130px]' }: Props) {
    return <Lottie className={className} animationData={LoadingLottie} loop={true} />;
}
