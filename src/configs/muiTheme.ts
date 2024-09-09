import { createTheme } from '@mui/material/styles';
import { poppins } from '@/configs/localFont';

export const muiTheme = createTheme({
    typography: {
        fontFamily: poppins.style.fontFamily,
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '8px 16px',
                },
                head: {
                    backgroundColor: 'transparent',
                    borderBottom: 'none',
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: () => ({
                    textAlign: 'center',
                    fontSize: '1rem',
                    fontWeight: '400',
                    padding: '10px',
                    backgroundColor: '#0A090F',
                }),
            },
        },
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    width: 'fit-content',
                    top: '24px',
                    left: '50%',
                    right: 'auto',
                    transform: 'translateX(-50%)',
                },
            },
        },
        MuiSnackbarContent: {
            styleOverrides: {
                root: {
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#49494D',
                },
                message: () => ({
                    padding: 0,
                }),
            },
        },
    },
});
