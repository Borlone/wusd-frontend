export enum NotificationType {
    SUCCESS = 'import_token_success',
    REJECT = 'import_token_reject',
    UNSUPPORT = 'unsupport_import_token',
}

export type Notification = {
    open: boolean;
    title: string;
    contentType: NotificationType.SUCCESS | NotificationType.REJECT | NotificationType.UNSUPPORT;
};
