import { TickSuccessIcon } from '@/shared/icons';
import Button from '@mui/material/Button';
import { formatReward } from '@/shared/utils/function';
import { IMonthlyReward } from '@/types/monthly-reward';
import { IColumn, TableBase } from '@/shared/base-ui/table';
import TooltipBase from '@/shared/base-ui/tooltip';
import { getShortMonthName } from '@/shared/utils';

type Props = {
    data: IMonthlyReward[];
    loading?: boolean;
};

export default function DashboardTable({ data, loading }: Props) {
    const columns: IColumn[] = [
        {
            title: 'Month',
            key: 'month',
            className: 'w-[30%] pl-0',
            classNameCellBody: 'text-white w-[30%] text-xs tablet:text-sm',
            render: (record: any) => {
                return <p className="component-text-caption-1-medium tablet:component-text-body-medium">{getShortMonthName(record.month)}</p>;
            },
        },
        {
            title: '24H',
            key: 'lastDayReward',
            className: 'w-[30%]',
            classNameCellBody: 'w-[30%] text-xs tablet:text-sm',
            render: (record: any) => {
                return (
                    <p className={record.index === 0 ? 'text-secondary-500' : 'text-gray-300'}>
                        {record.index === 0 ? `+${formatReward(record?.lastDayReward)}` : '--'}
                    </p>
                );
            },
        },
        {
            title: 'Monthly',
            key: 'amountReward',
            className: 'w-[20%]',
            classNameCellBody: 'w-[20%] text-xs tablet:text-sm',
            render: (record: any) => {
                return <p className="text-secondary-500">{`+${formatReward(record.amountReward)}`}</p>;
            },
        },
        {
            title: (
                <TooltipBase title="Claim rewards from the 1st of each following month" placement="bottom-end">
                    <div>Action</div>
                </TooltipBase>
            ),
            key: 'isClaimed',
            className: 'w-[20%] pr-0 text-right',
            classNameCellBody: 'w-[20%]',
            align: 'right',
            render: (record: any) => {
                return (
                    <div className="flex justify-end">
                        {record.isClaimed ? (
                            <div className="flex items-center space-x-1 h-[24px] tablet:h-[36px]">
                                <TickSuccessIcon />
                                <p className="text-secondary-500 text-xs tablet:text-sm">Claimed</p>
                            </div>
                        ) : (
                            <Button
                                disabled={record.index === 0}
                                className="component-btn-secondary text-xs tablet:text-sm bg-none rounded normal-case h-[24px] w-[66px] tablet:h-[36px] tablet:w-[70px] component-text-caption-1-emphasized  tablet:component-text-body-emphasized disabled:text-[#5C5B60] disabled:border-[#5C5B60]"
                            >
                                Claim
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];

    return <TableBase columns={columns} data={data} loading={loading} />;
}
