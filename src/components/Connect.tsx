'use client'

import { BaseError } from 'viem';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button, Row, Col, Alert, Container } from 'react-bootstrap';
import classes from './Connect.module.scss';

export function Connect() {
    const { connector, isConnected } = useAccount();
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
    const { disconnect } = useDisconnect();

    const isMetaMaskInstalled = Boolean(window.ethereum);

    return (
        <Container className={`${classes['connect-container']} mb-4`}>
            <Row className="justify-content-start">
                <Col>
                    <div className="d-block p-4 border-bottom">
                        <h2 className="text-start">How it works?</h2>
                        <ul className="d-flex flex-column align-items-start p-4 pb-0">
                            <li>Install the MetaMask Extension on Chrome.</li>
                            <li>Add your wallet to MetaMask.</li>
                            <li>Click on Connect to MetaMask Button.</li>
                            <li>If you want to Mint, you can add the amount and click Mint.</li>
                            <li>To send the minted token please add the recipient wallet address and click send.</li>
                        </ul>
                    </div>
                </Col>
            </Row>
            {!isMetaMaskInstalled && (
                <Row className="justify-content-center m-3">
                    <Col>
                        <Alert variant="danger" className="m-auto w-50">
                            MetaMask is not installed. Please install MetaMask to use this application.
                        </Alert>
                    </Col>
                </Row>
            )}
            {isConnected && (
                <Row className="justify-content-center">
                    <Col>
                        <div className="d-flex justify-content-center m-6 w-100">
                            <Button
                                className="w-50 p-3"
                                variant="danger"
                                onClick={() => disconnect()}
                            >
                                Disconnect from {connector?.name}
                            </Button>
                        </div>
                    </Col>
                </Row>
            )}
            <Row className="justify-content-center">
                {connectors
                    .filter((x) => x.ready && x.id !== connector?.id)
                    .map((x) => (
                        <Col key={x.id} xs={12} sm={6} md={4} lg={10} xl={12}>
                            <div className="d-flex justify-content-center m-6 w-100">
                                <Button
                                    className="w-50 p-3"
                                    variant="primary"
                                    onClick={() => connect({ connector: x })}
                                    disabled={isLoading && x.id === pendingConnector?.id}
                                >
                                    Connect to {x.name}
                                    {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
                                </Button>
                            </div>
                        </Col>
                    ))}
            </Row>
            <Row className="mt-3">
                <Col>
                    {error && <Alert variant="danger">{(error as BaseError).shortMessage}</Alert>}
                </Col>
            </Row>
        </Container>
    );
}
