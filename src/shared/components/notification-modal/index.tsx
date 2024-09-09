import SystemModal from '../system-modal';
import ImportTokenSuccessContent from './ImportTokenSuccess';
import UnsupportImportToken from './UnsupportImportToken';
import { useGlobalStore } from '@/shared/store';
import { NotificationType } from '@/types/notification';

const content: { [key: string]: any } = {
    [NotificationType.SUCCESS]: <ImportTokenSuccessContent />,
    [NotificationType.UNSUPPORT]: <UnsupportImportToken />,
};

export default function NotificationModal() {
    const { notiInfo, setNotiInfo } = useGlobalStore();

    return (
        <SystemModal bottomMobile title={notiInfo?.title} open={notiInfo?.open ?? false} onClose={() => setNotiInfo(null)}>
            {notiInfo?.contentType ? content[notiInfo?.contentType] : null}
        </SystemModal>
    );
}
