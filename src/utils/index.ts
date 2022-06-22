export const executeAsyncCall = async (url: string) => {
    const responseData = await fetch(url);
    const responseJson = await responseData.json();

    if (responseJson.statusCode && responseJson.statusCode !== 200) {
        throw new Error(responseJson.message);
    }

    return responseJson;
};

export const shortenWalletAddress = (address: string, charsAmount = 8) => {
    const firstPart = address.substring(0, charsAmount);
    return `${firstPart}...`;
};

export const isCollectionFullyMinted = (collection: any) => {
    const { minted_indexes_total, amount_of_tokens_total } = collection;
    return Number(amount_of_tokens_total) - Number(minted_indexes_total) === 0;
};

export const getCollectionImageSrc = (collection: any) => {
    return `https://devnet-media.elrond.com/nfts/asset/${collection.image_base_cid}/1.png`;
};

export const stringToHex = (str: string) => {
    if (str) {
        const arr1 = [];
        for (let n = 0, l = str.length; n < l; n++) {
            const hex = Number(str.charCodeAt(n)).toString(16);
            arr1.push(hex);
        }
        return arr1.join('');
    }
    return '';
};
