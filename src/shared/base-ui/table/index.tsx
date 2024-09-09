import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ReactNode, useMemo, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/shared/utils';
import { Box } from '@mui/material';
import { Loading } from '../loading';

export interface IColumn {
    title: string | ReactNode;
    key: string;
    filter?: boolean;
    align?: TableCellProps['align'];
    width?: number | string;
    // eslint-disable-next-line no-unused-vars
    render?: (record: any) => void;
    className?: string;
    classNameCellBody?: string;
}

export interface TableData {
    [key: string]: any;
}

interface TableProps {
    page?: number;
    limit?: number;
    pageSize?: number;
    total?: number;
    columns: IColumn[];
    // eslint-disable-next-line no-unused-vars
    onChangeTable?: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
    data: TableData[];
    caption?: ReactNode;
    loading?: boolean;
    skeletonRows?: number;
    showPagination?: boolean;
    className?: string;
    TableRowClassName?: string;
}

export const TableBase = ({ columns, data, loading, className, TableRowClassName }: TableProps) => {
    const [showEmpty, setShowEmpty] = useState(false);
    const [sortedInfo, setSortedInfo] = useState<{
        columnKey?: string;
        direction?: 'asc' | 'desc';
    }>({});

    const tableData = useMemo(() => (loading ? Array(0).fill({}) : data), [loading, data]);

    const handleClickSort = (key: string) => {
        if (key === sortedInfo.columnKey) {
            setSortedInfo({
                columnKey: key,
                direction: sortedInfo.direction === 'asc' ? 'desc' : 'asc',
            });
        } else {
            setSortedInfo({
                columnKey: key,
                direction: 'asc',
            });
        }
    };

    React.useEffect(() => {
        setTimeout(() => {
            setShowEmpty(true);
        }, 500);
    }, [data]);

    return (
        <Box className="table-scrollbar table-height-by-screen component-border bg-gradient-table rounded-xl overflow-auto mt-4 laptop:mt-6">
            <div className="bg-card backdrop-blur-[7px] sticky top-0 px-4 z-10">
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell
                                    align={col.align}
                                    key={col.key}
                                    onClick={() => handleClickSort(col.key)}
                                    style={{ width: col.width }}
                                    className={cn(
                                        'px-4  p-4 text-white component-text-caption-2-emphasized tablet:component-text-callout-emphasized laptop:py-6',
                                        col.className,
                                    )}
                                >
                                    {col.title}
                                    {col.filter && sortedInfo.columnKey === col.key ? (sortedInfo.direction === 'asc' ? ' \u25B2' : ' \u25BC') : ''}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row, index) => {
                            return (
                                <TableRow key={index} className={cn('', TableRowClassName)}>
                                    {columns.map((col: IColumn) => {
                                        const renderContent = col.render ? col.render?.(row) : row[col.key];
                                        return (
                                            <TableCell
                                                key={col.key}
                                                align={col.align}
                                                className={cn(col.classNameCellBody, 'py-0 border-none')}
                                                style={{ width: col.width }}
                                            >
                                                <div className="h-0 overflow-hidden">{renderContent}</div>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <div className="dashboard-body backdrop-blur-[20px] px-4">
                {!data.length && !loading && showEmpty ? (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Image src="/images/no_data.png" alt="no data" width={200} height={200} />
                        <p className="text-sm font-normal text-white text-center">You don&apos;t have any data yet</p>
                    </div>
                ) : null}
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell
                                    align={col.align}
                                    key={col.key}
                                    onClick={() => handleClickSort(col.key)}
                                    style={{ width: col.width }}
                                    className={cn(
                                        'px-4 py-0 text-white component-text-caption-2-emphasized tablet:component-text-callout-emphasized laptop:py-0',
                                        col.className,
                                    )}
                                >
                                    <div className="h-0 overflow-hidden">{col.title}</div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row, index) => {
                            return (
                                <TableRow key={index} className={cn('', TableRowClassName)}>
                                    {columns.map((col: IColumn) => {
                                        const renderContent = col.render ? col.render?.(row) : row[col.key];
                                        return (
                                            <TableCell
                                                key={col.key}
                                                align={col.align}
                                                className={cn(col.classNameCellBody)}
                                                style={{ width: col.width }}
                                            >
                                                {renderContent}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </Box>
    );
};
