'use client'

import { useAccount, useEnsName } from 'wagmi'
import {Container, Row, Col} from 'react-bootstrap';
import classes from "@/components/Account.module.scss";
import {Balance} from "@/components/Balance";

export function Account() {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })

  return (
    <Container className={ `${classes['account-container']} mb-4` }>
      <Row>
        <Col>
            <div className={`d-block p-4`}>
                <h3 className="text-start">Wallet Information</h3>
            </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <ul className={`m-2 text-start d-flex gap-9 justify-content-start`}>
              <li>
                  <h5>Address: </h5>
                  <p>
                      {ensName ?? address}
                      {ensName ? ` (${address})` : null}
                  </p>
              </li>
              <li>
                  <h5>Balance: </h5>
                  <Balance />
              </li>
          </ul>
        </Col>
      </Row>
    </Container>
  )
}
