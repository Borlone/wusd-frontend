import { AlertProps, Snackbar } from '@mui/material';
import React, { createContext, useContext } from 'react';
import CheckIcon from '@mui/icons-material/Check';

type NotifyContextActions = {
    showNotify: (data: { message: string; type?: AlertProps['severity']; duration?: number }) => void;
};

const NotifyContext = createContext({} as NotifyContextActions);

interface NotifyContextProviderProps {
    children: React.ReactNode;
}

const NotifyProvider: React.FC<NotifyContextProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = React.useState<
        { key: number; message: string; type: AlertProps['severity']; autoHideDuration: number }[]
    >([]);

    const showNotify = ({ message, type = 'info', duration = 5000 }: { message: string; type?: AlertProps['severity']; duration?: number }) => {
        const newNotification = {
            key: Date.now(),
            message,
            type,
            autoHideDuration: duration,
        };
        setNotifications((prev) => [...prev, newNotification]);
    };

    const handleClose = (key: number) => {
        setNotifications((prev) => prev.filter((noti) => noti.key !== key));
    };

    return (
        <NotifyContext.Provider value={{ showNotify }}>
            {notifications.map(({ key, message, type, autoHideDuration }) => (
                <Snackbar
                    key={key}
                    open={true}
                    autoHideDuration={autoHideDuration}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={() => handleClose(key)}
                    message={
                        <div className="flex items-center gap-1 min-w-[192px]">
                            <CheckIcon className="" />
                            <div>{message}</div>
                        </div>
                    }
                />
            ))}
            {children}
        </NotifyContext.Provider>
    );
};

const useNotify = (): NotifyContextActions => {
    const context = useContext(NotifyContext);

    if (!context) {
        throw new Error('useNotify must be used within a NotifyProvider');
    }

    return context;
};

export { NotifyProvider, useNotify };
