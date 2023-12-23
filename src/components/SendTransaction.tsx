import React, { useState, useEffect } from 'react';
import { useSendTransaction, useWaitForTransaction } from 'wagmi';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import TransactionDetailsModal from "@/components/TransactionDetailsModal";

export function SendTransaction({ mintedAmount }) {
    const [toAddress, setToAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { data, error, isLoading, isError, sendTransaction } = useSendTransaction();
    const { data: receipt, isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });
    const [showModal, setShowModal] = React.useState(false);

    const isValidEthereumAddress = (address) => {
        const regex = /^(0x)?[0-9a-fA-F]{40}$/;
        return regex.test(address);
    };
    useEffect(() => {
        if (isSuccess) {
            setToAddress('');
        }
    }, [isSuccess]);

    const handleConfirm = async (e) => {
        e.preventDefault();

        const formData = new FormData(document.getElementById('sendTransactionForm'));
        const address = formData.get('address') as string;

        if (address && isValidEthereumAddress(address)) {
            try {
                setErrorMessage('');
                setToAddress(address); // Set the address first

                // Move the logic from handleSendTokens here
                await sendTransaction({
                    to: address,
                    value: mintedAmount,
                });

                // After the transaction is sent, you might need to perform any additional tasks
                // For example, you could wait for the transaction to be mined, update UI, etc.
                // This might involve using useWaitForTransaction or similar functionality.

            } catch (error) {
                console.error('Token transfer failed:', error);
            }
        } else {
            setErrorMessage(address ? 'Invalid Ethereum address.' : 'Recipient address is required.');
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <div className={`d-block p-4 pb-0`}>
                        <h3 className="text-start">Send the minted token</h3>
                    </div>
                    <Form
                        id="sendTransactionForm"
                        onSubmit={handleConfirm}
                        className="p-4 pb-0 pt-0 d-flex flex-column gap-3"
                    >
                        <Form.Group className="text-start" controlId="formAddress">
                            <Form.Label>Recipient address</Form.Label>
                            <Form.Control
                                className="w-75"
                                type="text"
                                placeholder="Enter recipient address"
                                name="address"
                                isInvalid={errorMessage !== ''}
                            />
                            <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
                        </Form.Group>
                        <Button className="w-25 mb-4" variant="primary" type="submit">
                            Confirm
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {isSuccess && (
                        <div className="d-flex p-4 pt-0 flex-column align-items-start">
                            <Alert className="" variant="success">
                                You have successfully sent {mintedAmount} tokens that you have recently minted.
                            </Alert>
                            <Button className="mb-4 w-10" variant="primary" onClick={handleShowModal}>
                                View Details
                            </Button>
                        </div>
                    )}

                    {toAddress && (
                        <>
                            <Alert className="m-4" variant="secondary">
                                Sending {mintedAmount} tokens to {toAddress}...
                            </Alert>
                        </>
                    )}
                    {isLoading && <Alert className="m-4" variant="secondary">Checking wallet...</Alert>}
                    {isPending && <Alert className="m-4" variant="secondary">Transaction pending...</Alert>}
                    {isError && <Alert variant="danger">Error: {error?.message}</Alert>}
                </Col>
                <TransactionDetailsModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    hash={data?.hash}
                    receipt={receipt}
                />
            </Row>
        </Container>
    );
}