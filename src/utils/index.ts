export const shortenWalletAddress = (address: string, charsAmount = 8) => {
    const firstPart = address.substring(0, charsAmount);
    return `${firstPart}...`;
};

export const executeAsyncCall = async (url: string) => {
    const responseData = await fetch(url);
    const responseJson = await responseData.json();

    if (responseJson.statusCode && responseJson.statusCode !== 200) {
        throw new Error(responseJson.message);
    }

    return responseJson;
};

export const isCollectionFullyMinted = (collection: any) => {
    const { minted_indexes_total, amount_of_tokens_total } = collection;
    return Number(amount_of_tokens_total) - Number(minted_indexes_total) === 0;
};
