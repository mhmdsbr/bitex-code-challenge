import React, { useState, useEffect } from 'react';
import { useSendTransaction, useWaitForTransaction } from 'wagmi';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import TransactionDetailsModal from "@/components/TransactionDetailsModal";

interface SendTransactionProps {
    mintedAmount?: number;
}
export function SendTransaction({ mintedAmount = 0 } : SendTransactionProps) {
    const [toAddress, setToAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { data, error, isLoading, isError, sendTransaction } = useSendTransaction();
    const { data: receipt, isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });
    const [showModal, setShowModal] = React.useState(false);

    const isValidEthereumAddress = (address: string) => {
        const regex = /^(0x)?[0-9a-fA-F]{40}$/;
        return regex.test(address);
    };
    useEffect(() => {
        if (isSuccess) {
            setToAddress('');
        }
    }, [isSuccess]);

    const handleConfirm = async (e: React.FormEvent) => {
        e.preventDefault();

        const formElement = document.getElementById('sendTransactionForm') as HTMLFormElement | null;

        if (!formElement) {
            console.error("Form element not found");
            return;
        }

        const formData = new FormData(formElement);
        const address = formData.get('address') as string;

        if (address && isValidEthereumAddress(address)) {
            try {
                setErrorMessage('');
                setToAddress(address);

                await sendTransaction({
                    to: address,
                    value: mintedAmount,
                });
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
                    <div className="d-block pt-4 pb-0">
                        <h3 className="text-lg-start text-center">Send the minted token</h3>
                    </div>
                    <Form
                        id="sendTransactionForm"
                        onSubmit={handleConfirm}
                        className="pb-0 pt-0 d-flex flex-column gap-3"
                    >
                        <Form.Group className="d-flex flex-column align-items-lg-start align-items-center" controlId="formAddress">
                            <Form.Label>Recipient address</Form.Label>
                            <Form.Control
                                className="w-100"
                                type="text"
                                placeholder="Enter recipient address"
                                name="address"
                                isInvalid={errorMessage !== ''}
                            />
                            <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
                        </Form.Group>
                        <Button className="mb-4 w-50 m-lg-0 m-auto" variant="primary" type="submit">
                            Confirm
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {isSuccess && (
                        <div className="d-flex pt-0 flex-column align-items-start">
                            <Alert className="ms-0 mt-3" variant="success">
                                You have successfully sent {mintedAmount} tokens that you have recently minted.
                            </Alert>
                            <Button className="m-lg-0 m-auto mb-4 w-10" variant="primary" onClick={handleShowModal}>
                                View Details
                            </Button>
                        </div>
                    )}

                    {toAddress && (
                        <>
                            <Alert className="text-break ms-0 mt-3" variant="secondary">
                                Sending {mintedAmount} tokens to {toAddress}...
                            </Alert>
                        </>
                    )}
                    {isLoading && <Alert className="ms-0 mt-3" variant="secondary">Checking wallet...</Alert>}
                    {isPending && <Alert className="ms-0 mt-3" variant="secondary">Transaction pending...</Alert>}
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