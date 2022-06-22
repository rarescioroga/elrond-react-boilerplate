import { useMemo } from 'react';
import {
    AbiRegistry,
    Address,
    BytesValue,
    ContractFunction,
    SmartContract,
    SmartContractAbi,
    TokenIdentifierValue,
    TokenPayment,
    Transaction,
    TransactionPayload,
    U64Value,
} from '@elrondnetwork/erdjs/out';
import { sendTransactions, useGetAccountInfo } from '@elrondnetwork/dapp-core';

import { chainID, smartContractAddress, smartContractImplementationInterface } from '../../../config';
import haosCardsJson from '../../../assets/haos-cards-sc.abi.json';
import { stringToHex } from '../../../utils';

const ONE_EGLD = Math.pow(10, 18);

const useTransactions = () => {
    const { address } = useGetAccountInfo();

    const contract = useMemo(() => {
        return new SmartContract({
            address: new Address(smartContractAddress),
        });
    }, [smartContractAddress]);
    const abiRegistryContract = useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const abiRegistry = AbiRegistry.create(haosCardsJson);
        const abi = new SmartContractAbi(abiRegistry, [smartContractImplementationInterface || '']);
        const address = new Address(smartContractAddress);
        return new SmartContract({ address, abi });
    }, [haosCardsJson, smartContractAddress]);

    const listNft = async (collectionId: string, nft: { identifier: string; nonce: number }) => {
        const { nonce, identifier } = nft;

        const interaction = abiRegistryContract.methods.listNft([0.3 * ONE_EGLD, identifier]);
        const tx = interaction
            .withSingleESDTNFTTransfer(TokenPayment.nonFungible(collectionId, nonce), new Address(address))
            .withValue(TokenPayment.egldFromAmount(0))
            .withGasLimit(20000000)
            .withChainID(chainID)
            .buildTransaction();

        const { sessionId } = await sendTransactions({
            transactions: tx,
            redirectAfterSign: false,
        });
    };

    const buyNft = async ({
        nftId,
        collectionId,
        nftNonce,
    }: {
        nftId: string;
        collectionId: string;
        nftNonce: number;
    }) => {
        const tx = contract.call({
            func: new ContractFunction('buyNft'),
            value: TokenPayment.egldFromAmount(0),
            args: [new TokenIdentifierValue(nftId), BytesValue.fromUTF8(collectionId), new U64Value(nftNonce)],
            gasLimit: 10000000,
            chainID,
        });

        const { sessionId } = await sendTransactions({
            transactions: tx,
            redirectAfterSign: false,
        });
    };

    const mintNft = async (collectionName: string, price: number) => {
        const tx = new Transaction({
            receiver: new Address(smartContractAddress),
            value: TokenPayment.egldFromAmount(price),
            data: new TransactionPayload(`mint@${stringToHex(collectionName)}@01`),
            gasLimit: 80000000,
            chainID,
        });
        const { sessionId } = await sendTransactions({
            transactions: tx,
            transactionsDisplayInfo: {
                processingMessage: 'Processing the transaction',
                errorMessage: 'An error has occurred',
                successMessage: 'Card bought successfully!',
            },
            redirectAfterSign: false,
        });
    };

    //
    // const withdraw = async () => {
    //     const contract = new SmartContract({
    //         address: new Address('erd1qqqqqqqqqqqqqpgqz0kzfgpr0679hlc3s2hqa3nk6xqmm20xh55qf83km4'),
    //     });
    //
    //     const tx = contract.call({
    //         func: new ContractFunction('withdraw'),
    //         args: [new U64Value(27)],
    //         gasLimit: 10000000,
    //         chainID: 'D',
    //     });
    //
    //     const { sessionId } = await sendTransactions({
    //         transactions: tx,
    //         redirectAfterSign: false,
    //     });
    // };

    return {
        listNft,
        buyNft,
        mintNft,
    };
};

export default useTransactions;
