import { executeAsyncCall } from '../../../utils';
import { apiUrl } from '../../../config';

export const getListedNfts = async (collectionId: string) => {
    if (collectionId) {
        return await executeAsyncCall(`${apiUrl}/nft/listed/${collectionId}`);
    }
};

export const getNftsByAccountAndAddress = async (address: string, collectionId: string) => {
    if (address && collectionId) {
        return await executeAsyncCall(`${apiUrl}/nft/collection/${collectionId}/address/${address}`);
    }
};
