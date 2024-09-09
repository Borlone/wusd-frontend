import { CloseIcon } from '@/shared/icons';
import { Box, Modal, Typography } from '@mui/material';
import React from 'react';

interface IProps {
    open: boolean;
    onClose?: () => void;
    title?: string;
    children: React.ReactNode;
    bottomMobile?: boolean;
    disableClose?: boolean;
}

export default function SystemModal({ open, onClose, title, children, bottomMobile, disableClose }: IProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            slotProps={{
                backdrop: {
                    sx: {
                        background: `#0A090FB2`,
                        backdropFilter: 'blur(20px)',
                    },
                },
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                className={`outline-none w-[95%] tablet:w-auto component-border min-w-[240px] text-white rounded-xl bg-modal absolute left-1/2 -translate-x-1/2  ${bottomMobile ? `bottom-6 tablet:bottom-auto tablet:-translate-y-1/2 tablet:top-1/2` : `-translate-y-1/2 top-1/2`}`}
            >
                <div className="p-4 component-border border-t-0 border-l-0 border-r-0 flex items-center">
                    {title && (
                        <Typography id="modal-modal-title" variant="h6" className="font-semibold" component="h2">
                            {title}
                        </Typography>
                    )}
                    <CloseIcon onClick={onClose} className={`ml-auto cursor-pointer w-6 h-6 ${disableClose ? 'invisible' : ''}`}></CloseIcon>
                </div>

                <div className="p-4">{children}</div>
            </Box>
        </Modal>
    );
}
