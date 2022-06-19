import { executeAsyncCall } from '../../../utils';
import { apiUrl } from '../../../config';

export const getListedNfts = async (collectionId: string) => {
    if (collectionId) {
        return await executeAsyncCall(`${apiUrl}/nft/listed/${collectionId}`);
    }
};
