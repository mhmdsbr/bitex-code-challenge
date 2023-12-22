"use client"

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { stringify } from '@/utils/stringify';
import classes from './TransactionDetailsModal.module.scss'

const TransactionDetailsModal = ({ show, handleClose, hash, receipt }) => {
    return (
        <Modal className={`bg-secondary modal-xl bg-opacity-75`} show={show} onHide={handleClose}>
            <Modal.Header className="bg-dark">
                <Modal.Title>Transaction Details</Modal.Title>
            </Modal.Header>
                <Modal.Body className={`${classes.transactionModal} bg-dark overflow-scroll`}>
                <p>Transaction Hash: {hash}</p>
                <p>Transaction Receipt: {stringify(receipt, null, 2)}</p>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TransactionDetailsModal;
