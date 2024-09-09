const PointInfo = ({ point }: { point?: string }) => {
    return (
        <div className="component-box flex justify-center flex-col w-full">
            <p className="text-gray-300 component-text-body-medium laptop:component-text-callout-medium">Total Points</p>
            <p className="whitespace-nowrap mt-1 flex items-center gap-3 mobile:gap-1">
                <span className="text-[16px] font-normal leading-[25px] text-white mobile:text-[12px] laptop:leading-[41px]">(Coming soon)</span>
            </p>
        </div>
    );
};

export default PointInfo;
