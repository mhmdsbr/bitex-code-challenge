import React, {useState} from 'react';
import {useContractWrite, useSendTransaction, useWaitForTransaction} from 'wagmi';
import {wagmiContractConfig} from './contracts';
import {stringify} from '@/utils/stringify';

export function SendTransaction({ mintedAmount }) {
    const [toAddress, setToAddress] = useState('');
    const { data, error, isLoading, isError, sendTransaction } = useSendTransaction();
    const { data: receipt, isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });
    const { write: transferTokens } = useContractWrite({
        ...wagmiContractConfig,
        functionName: 'transfer',
    });

    const handleSendTokens = async () => {
        try {
            if (!toAddress) {
                console.error('Recipient address is empty.');
                return;
            }

            // Call the transferTokens function with the recipient address and amount
            await transferTokens({
                args: [toAddress, mintedAmount],
            });
        } catch (error) {
            console.error('Token transfer failed:', error);
        }
    };

    const handleConfirm = async () => {
        // Set the recipient address from the form
        const formData = new FormData(document.getElementById('sendTransactionForm'));
        const address = formData.get('address') as string;

        // Ensure the address is not empty before setting toAddress state
        if (address) {
            setToAddress(address);
        } else {
            console.error('Recipient address is empty.');
        }

        // Call the handleSendTokens function
        await handleSendTokens();
    };

    return (
        <>
            <form
                id="sendTransactionForm"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <input name="address" placeholder="Recipient address" />
                <button type="submit" onClick={handleConfirm}>
                    Confirm
                </button>
            </form>

            {toAddress && (
                <>
                    <div>
                        Sending {mintedAmount} tokens to {toAddress}...
                    </div>
                </>
            )}

            {isLoading && <div>Check wallet...</div>}
            {isPending && <div>Transaction pending...</div>}
            {isSuccess && (
                <>
                    <div>Transaction Hash: {data?.hash}</div>
                    <div>
                        Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
                    </div>
                </>
            )}
            {isError && <div>Error: {error?.message}</div>}
        </>
    );
}
