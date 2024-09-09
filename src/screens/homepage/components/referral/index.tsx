/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import OTPInput from '@/shared/base-ui/otp';
import { useGlobalStore } from '@/shared/store';
import { useActiveAccount } from 'thirdweb/react';
import { cn } from '@/shared/utils';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { verifyReferal } from '@/services/users';

const ReferralForm = () => {
    const account = useActiveAccount();
    const router = useRouter();
    const { setOpenWalletConnectModal, isError, setIsError } = useGlobalStore();

    const [referralCode, setReferralCode] = useState<string | undefined>(undefined);
    const [waiting, setWaiting] = useState<boolean>(false);

    const { mutateAsync: checkReferral } = useMutation({
        mutationFn: verifyReferal,
        mutationKey: ['get-user-info'],
    });

    const handleChange = (value: string) => {
        setReferralCode(value.toUpperCase());
    };

    const handleSubmitCode = async () => {
        if (!account) {
            setOpenWalletConnectModal(true);
            setWaiting(true);
            return;
        }

        const isVerify = await checkReferral({ referral_code: referralCode! });
        setIsError(!isVerify);

        if (isVerify) {
            router.push('/dashboard');
        }
    };

    useEffect(() => {
        if (!account) {
            const timer = setTimeout(() => {
                if (isError) {
                    setIsError(false);
                    setReferralCode(undefined);
                }
            }, 1000);

            return () => clearTimeout(timer);
        }
        const fn = async () => {
            const token = localStorage.getItem('token');
            if (token && waiting) {
                const isVerify = await checkReferral({ referral_code: referralCode! });
                setIsError(!isVerify);
                setWaiting(false);
                if (isVerify) router.push('/dashboard');
            }
        };
        fn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waiting, referralCode, account]);

    useEffect(() => {
        const hash = window.location.hash;

        if (hash && hash.includes('#')) {
            const url = window.location.toString();
            const upperCaseHash = hash.toUpperCase();
            (window as any).location = url.replace(hash, upperCaseHash);

            const referral = upperCaseHash.slice(0, 7).replace(/[^a-zA-Z0-9]/g, '');
            setReferralCode(referral);
        }
    }, [router]);
    return (
        <div className="mt-[40px] tablet:mt-[36px] iphone:w-full tablet:w-[450px] desktop:w-fit laptop:w-fit mx-auto laptop:mr-0 laptop:ml-auto p-3 tablet:p-4 component-border rounded-xl bg-modal backdrop-blur-[20px] flex flex-col gap-4">
            <h3 className="text-center text-white text-3xl iphone:text-[24px] font-semibold">Referral Code</h3>

            <div>
                <div className="text-normal text-center text-white iphone:text-[14px]">Enter your referral code to earn </div>
                <div className="text-normal text-center text-white iphone:text-[14px]">extra points.</div>
            </div>

            <OTPInput
                value={referralCode}
                onChange={handleChange}
                renderInput={(props: any) => (
                    <input
                        {...props}
                        className="h-[50px] w-[42px] iphone:h-[40px] iphone:w-[32px]  !rounded-[8px] bg-gray-800 text-white font-[700] text-[20px] mx-2 mobile:mx-1 text-center"
                        type="text"
                    />
                )}
                skipDefaultStyles
                inputType="text"
                inputStyle={{
                    border: isError ? '1px solid #FF3B30' : '',
                }}
                hasError={isError}
                numInputs={6}
                containerStyle={{ justifyContent: 'center' }}
                blurCallback={() => {
                    if (isError) {
                        setIsError(false);
                        setReferralCode(undefined);
                    }
                }}
            />
            <div
                className={cn('text-[14px] text-[#FF3B30] text-center leading-[20px] font-normal transition-all duration-1000 hidden', {
                    'transition-all duration-1000 block': isError,
                })}
            >
                Invalid code
            </div>

            <Button
                className="mx-auto component-btn p-4 disabled:text-gray-600 text-[16px] leading-[21px] font-[700]"
                disabled={!referralCode || referralCode?.length < 6 || isError}
                onClick={handleSubmitCode}
                sx={{
                    '&:disabled': {
                        background: 'linear-gradient(105deg, #0000BD 0%, #00693D 100%) !important',
                    },
                }}
            >
                SUBMIT REFERRAL
            </Button>
        </div>
    );
};

export default ReferralForm;
