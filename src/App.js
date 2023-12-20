import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './App.module.scss';

function App() {
    return (
        <main className={classes.App}>
            <header className={`${classes['App__header']}`}>
                <h1>Hello React with Bootstrap</h1>
            </header>

            <Container fluid>
                <Row>
                    <Col sm={12} className={`${classes['App__main-content']}`}>
                        <p>Main Content Area</p>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default App;

