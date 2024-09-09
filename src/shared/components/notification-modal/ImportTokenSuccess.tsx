import Image from 'next/image';

export default function ImportTokenSuccessContent() {
    return (
        <div className="flex flex-col items-center gap-2 text-center">
            <Image src="/images/large_wusd.webp" alt="" width={120} height={120} />
            <p className="text-base leading-[21px] font-bold">Token Imported Successfully</p>
            <p className="min-w-[325px] text-sm leading-5">WUSD has been added to your wallet.</p>
        </div>
    );
}
