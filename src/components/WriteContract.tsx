'use client'

import { BaseError } from 'viem';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { wagmiContractConfig } from './contracts';
import { stringify } from '@/utils/stringify';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { SendTransaction } from './SendTransaction'; // Import the SendTransaction component
import classes from "@/components/WriteContract.module.scss";

export function WriteContract() {
    const [amountToMint, setAmountToMint] = React.useState("");
    const [validationError, setValidationError] = React.useState("");

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

        // Clear any previous validation errors
        setValidationError("");

        try {
            // Call the ERC20 token contract's mint function
            await write({
                args: [BigInt(amount)],
            });
        } catch (error) {
            console.error("Minting transaction failed:", error);
        }
    };

    return (
        <Container className={`${classes['writeContract-container']} mb-9`}>
            <Row>
                <Col>
                    <div className={`d-block p-4`}>
                        <h3 className="text-center">Mint Token</h3>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="d-flex flex-column align-items-center" controlId="amountToMint">
                            <Form.Label>Amount to Mint:</Form.Label>
                            <Form.Control
                                className="m-4 w-25"
                                type="number"
                                placeholder="Enter amount"
                                value={amountToMint}
                                onChange={(e) => setAmountToMint(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="mb-4" variant="primary" disabled={isLoading} type="submit">
                            Mint Tokens
                        </Button>
                    </Form>
                </Col>
            </Row>

            {validationError && <Alert variant="danger">{validationError}</Alert>}
            {isLoading && <div>Check wallet...</div>}
            {isPending && <div>Transaction pending...</div>}
            {isSuccess && (
                <>
                    <div>Transaction Hash: {data?.hash}</div>
                    <div>
                        Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
                    </div>
                    {/* Pass mintedAmount as prop to SendTransaction */}
                    <SendTransaction mintedAmount={amountToMint} />
                </>
            )}
            {isError && <Alert variant="danger">{(error as BaseError)?.shortMessage}</Alert>}
        </Container>
    );
}
