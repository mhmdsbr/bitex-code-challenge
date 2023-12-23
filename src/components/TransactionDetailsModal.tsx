import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { stringify } from '@/utils/stringify';

interface TransactionDetailsModalProps {
    show: any;
    handleClose: any;
    hash: any;
    receipt: any;
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({ show, handleClose, hash, receipt }) => {
    return (
        <Modal className={`ps-0 bg-secondary modal-xl bg-opacity-75`} show={show} onHide={handleClose}>
            <Modal.Header className="bg-dark">
                <Modal.Title>Transaction Details</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
                <p className="text-break">
                    <span className="fw-bold">Transaction Hash: </span>
                    <br/>
                    {hash}
                </p>
                <p className="text-break">
                    <span className="fw-bold">Transaction Receipt: </span>
                    <br/>
                    {stringify(receipt, null, 2)}
                </p>
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
