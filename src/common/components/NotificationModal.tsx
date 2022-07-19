import React from 'react';
import { useGetNotification } from '@elrondnetwork/dapp-core/hooks';

const NotificationModal: React.FC = () => {
    const { notification, clearNotification } = useGetNotification();
    console.log('LOGGER notification', notification);
    return <div>NotificationModal</div>;
};

export default NotificationModal;
