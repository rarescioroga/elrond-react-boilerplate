import { executeAsyncCall } from '../../../utils';
import { apiUrl } from '../../../config';

export const getShopDetails = async (shopName: string) => {
    if (shopName) {
        return await executeAsyncCall(`${apiUrl}/shop/${shopName}`);
    }
};
