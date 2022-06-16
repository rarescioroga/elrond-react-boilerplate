import { apiUrl } from '../../../config';
import { executeAsyncCall } from '../../../utils';

export const getLiveCollections = async () => {
    return await executeAsyncCall(`${apiUrl}/collection/mintable`);
};

export const getAvailableCollections = async () => {
    return await executeAsyncCall(`${apiUrl}/collection/available`);
};

export const getWalletCollections = async (walletAddress: string) => {
    return await executeAsyncCall(`${apiUrl}/collection/address/${walletAddress}`);
};
