import LoadingAnimation from './loading-animation';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingBackground({ loading }: any) {
    return (
        <>
            {loading && (
                <div className="w-screen bg-[#0A090FB2] h-screen util-flex-center fixed top-0 z-50 backdrop-blur-[20px]">
                    <LoadingAnimation />
                </div>
            )}
            {/* {loading && (
                <div className="w-screen h-screen util-flex-center fixed top-0 z-50 backdrop-blur-sm">
                    <CircularProgress />
                </div>
            )} */}
        </>
    );
}
