import React, { useState } from 'react';
import { useContractWrite, useSendTransaction, useWaitForTransaction } from 'wagmi';
import { wagmiContractConfig } from './contracts';
import { stringify } from '@/utils/stringify';
import { Form, Button, Alert } from 'react-bootstrap';

export function SendTransaction({ mintedAmount }) {
    const [toAddress, setToAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { data, error, isLoading, isError, sendTransaction } = useSendTransaction();
    const { data: receipt, isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });
    const { write: transferTokens } = useContractWrite({
        ...wagmiContractConfig,
        functionName: 'transfer',
    });

    const isValidEthereumAddress = (address) => {
        const regex = /^(0x)?[0-9a-fA-F]{40}$/;
        return regex.test(address);
    };

    const handleSendTokens = async () => {
        try {
            if (!toAddress) {
                setErrorMessage('Recipient address is required.');
                return;
            }

            if (!isValidEthereumAddress(toAddress)) {
                setErrorMessage('Invalid Ethereum address.');
                return;
            }

            setErrorMessage('');

            await transferTokens({
                args: [toAddress, mintedAmount],
            });
        } catch (error) {
            console.error('Token transfer failed:', error);
        }
    };

    const handleConfirm = async () => {
        const formData = new FormData(document.getElementById('sendTransactionForm'));
        const address = formData.get('address') as string;

        if (address && isValidEthereumAddress(address)) {
            setToAddress(address);
        } else {
            setErrorMessage(address ? 'Invalid Ethereum address.' : 'Recipient address is required.');
            return;
        }

        await handleSendTokens();
    };

    return (
        <>
            <Form
                id="sendTransactionForm"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <Form.Group controlId="formAddress">
                    <Form.Label>Recipient address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter recipient address"
                        name="address"
                        isInvalid={errorMessage !== ''}
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleConfirm}>
                    Confirm
                </Button>
            </Form>

            {toAddress && (
                <>
                    <Alert variant="secondary">
                        Sending {mintedAmount} tokens to {toAddress}...
                    </Alert>
                </>
            )}

            {isLoading && <Alert variant="secondary">Checking wallet...</Alert>}
            {isPending && <Alert variant="secondary">Transaction pending...</Alert>}
            {isSuccess && (
                <>
                    <div>Transaction Hash: {data?.hash}</div>
                    <div>
                        Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
                    </div>
                </>
            )}
            {isError && <Alert variant="danger">Error: {error?.message}</Alert>}
        </>
    );
}
