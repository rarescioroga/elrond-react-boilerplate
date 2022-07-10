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
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks/account';
import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { useTrackTransactionStatus } from '@elrondnetwork/dapp-core/hooks';
import { useDispatch, useSelector } from 'react-redux';

import haosCardsJson from '../../../assets/haos-cards-sc.abi.json';
import { chainID, smartContractAddress, smartContractImplementationInterface } from '../../../config';
import { stringToHex } from '../../../utils';
import { selectTxSessionId, reFetchData, setTxSessionId } from '../slices/appConfigSlice';

const ONE_EGLD = Math.pow(10, 18);

const useTransactions = () => {
    const dispatch = useDispatch();
    const txSessionId = useSelector(selectTxSessionId);
    const { address } = useGetAccountInfo();

    useTrackTransactionStatus({
        transactionId: txSessionId,
        onSuccess: () => dispatch(reFetchData()),
    });

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

    const listNft = async (nft: { identifier: string; nonce: number; collection: string }, price: number) => {
        const { nonce, identifier, collection: collectionId } = nft;

        const interaction = await abiRegistryContract.methods.listNft([price * ONE_EGLD, identifier]);
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
        dispatch(setTxSessionId(sessionId));
    };

    const buyNft = async (nft: { identifier: string; collection: string; nonce: number; listing_price: string }) => {
        const tx = contract.call({
            func: new ContractFunction('buyNft'),
            value: TokenPayment.egldFromAmount(Number(nft.listing_price)),
            args: [
                new TokenIdentifierValue(nft.identifier),
                BytesValue.fromUTF8(nft.collection),
                new U64Value(nft.nonce),
            ],
            gasLimit: 10000000,
            chainID,
        });

        const { sessionId } = await sendTransactions({
            transactions: tx,
            redirectAfterSign: false,
        });
        dispatch(setTxSessionId(sessionId));
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
        dispatch(setTxSessionId(sessionId));
    };

    const withdrawNft = async (nft: { identifier: string; collection: string }) => {
        const tx = contract.call({
            func: new ContractFunction('withdraw'),
            args: [new TokenIdentifierValue(nft.identifier), BytesValue.fromUTF8(nft.collection)],
            gasLimit: 10000000,
            chainID,
        });

        const { sessionId } = await sendTransactions({
            transactions: tx,
            redirectAfterSign: false,
        });
        dispatch(setTxSessionId(sessionId));
    };

    return {
        listNft,
        buyNft,
        mintNft,
        withdrawNft,
    };
};

export default useTransactions;
