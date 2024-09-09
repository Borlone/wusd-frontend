const GraphicBg = () => {
    return (
        <div className="w-full h-svh z-[-10] top-0 left-0 right-0 bottom-0 fixed">
            <div className="h-full w-full bg-black absolute z-[-9]"></div>
            <div
                className="h-[130%] max_tablet:h-[100%] w-[120%] z-[-8] top-[-50%] max_tablet:top-[-30%] right-[-30%] absolute"
                style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(38, 211, 166, 0.20) 0%, rgba(38, 211, 166, 0.00) 100%)' }}
            ></div>
            <div
                className="h-[130%] max_tablet:h-[100%] w-[120%] z-[-8] bottom-[-50%] max_tablet:bottom-[-30%] left-[-30%] absolute"
                style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(78, 91, 255, 0.20) 0%, rgba(78, 91, 255, 0.00) 100%)' }}
            ></div>
            {/* <Image src="/images/background_pc.png" quality={100} fill className="h-full w-full object-cover" alt="Background" /> */}
        </div>
    );
};

export default GraphicBg;
