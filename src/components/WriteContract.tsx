'use client'

import { BaseError } from 'viem';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { wagmiContractConfig } from './contracts';
import { stringify } from '@/utils/stringify';
import React from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { SendTransaction } from './SendTransaction'; // Import the SendTransaction component
import TransactionDetailsModal from './TransactionDetailsModal'; // Import the new component
import classes from "@/components/WriteContract.module.scss";

export function WriteContract() {
    const [amountToMint, setAmountToMint] = React.useState("");
    const [validationError, setValidationError] = React.useState("");
    const [showModal, setShowModal] = React.useState(false);

    const { write, data, error, isLoading, isError } = useContractWrite({
        ...wagmiContractConfig,
        functionName: 'mint',
    });
    const {
        data: receipt,
        isLoading: isPending,
        isSuccess,
    } = useWaitForTransaction({ hash: data?.hash });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the input
        const amount = parseFloat(amountToMint);
        if (isNaN(amount) || amount <= 0) {
            setValidationError("Please enter a valid number greater than zero.");
            return;
        }

        setValidationError("");

        try {
            await write({
                args: [BigInt(amount)],
            });
        } catch (error) {
            console.error("Minting transaction failed:", error);
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container className={`${classes['writeContract-container']} mb-9`}>
            <Row>
                <Col>
                    <div className={`d-block p-4 pb-0`}>
                        <h3 className="text-start">Mint Token</h3>
                    </div>
                    <Form className="p-4 pb-0 pt-0 d-flex flex-column gap-3" onSubmit={handleSubmit}>
                        <Form.Group className="d-flex flex-column align-items-start" controlId="amountToMint">
                            <Form.Label>Amount to Mint:</Form.Label>
                            <Form.Control
                                className="w-50"
                                type="number"
                                placeholder="Enter amount"
                                value={amountToMint}
                                onChange={(e) => setAmountToMint(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="mb-4 w-25" variant="primary" disabled={isLoading} type="submit">
                            Mint Tokens
                        </Button>
                    </Form>
                    {isSuccess && (
                        <Row className="justify-content-start">
                            <Col>
                                <div className="d-flex flex-column align-items-start">
                                    <Alert className="ms-4" variant="success">
                                        You have successfully minted {amountToMint} token.
                                    </Alert>
                                    <Button className="ms-4 mb-4 w-10" variant="primary" onClick={handleShowModal}>
                                        View Details
                                    </Button>
                                </div>
                            </Col>
                            <TransactionDetailsModal
                                show={showModal}
                                handleClose={handleCloseModal}
                                hash={data?.hash}
                                receipt={receipt}
                            />
                        </Row>
                    )}
                    <Row>
                        <Col className="ms-4">
                            {validationError && <Alert variant="danger">{validationError}</Alert>}
                            {isLoading && <Alert variant="secondary">Checking the wallet...</Alert>}
                            {isPending && <Alert variant="secondary">Transaction pending...</Alert>}
                            {isError && <Alert variant="danger">{(error as BaseError)?.shortMessage}</Alert>}
                        </Col>
                    </Row>

                </Col>
                <Col>
                    {isSuccess && (
                        <>
                            <SendTransaction mintedAmount={amountToMint} />
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
