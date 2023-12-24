import {Container, Row, Col, Navbar} from 'react-bootstrap';
import { Connect } from '@/components/Connect';
import { Connected } from '@/components/Connected';
import { Account } from '@/components/Account';
import { WriteContract } from '@/components/WriteContract';

export default function Page() {
    return (
        <Container>
            <Navbar expand="lg" className="">
                <Container className="justify-content-center p-3">
                    <div className="text-light fs-3 text-center" >Smart Contract ERC20 - Mint | Transfer</div>
                </Container>
            </Navbar>
            <Row>
                <Col>
                    <Connect />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Connected>
                        <Row className="justify-content-center">
                            <Col>
                                <Account />
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col>
                                <WriteContract />
                            </Col>
                        </Row>
                    </Connected>
                </Col>
            </Row>
            <footer className="border-top pt-4 text-white mb-6">
                <Container>
                    <Row>
                        <Col className="text-lg-start">
                            <p className="text-center mb-3">
                                Copyright © 2023. All Rights Reserved.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </Container>
    );
}



