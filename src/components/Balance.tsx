'use client'

import { useState } from 'react'
import type { Address } from 'wagmi'
import { useAccount, useBalance } from 'wagmi'

export function Balance() {
  return (
    <>
      <div>
        <AccountBalance />
      </div>
    </>
  )
}

export function AccountBalance() {
  const { address } = useAccount()
  const { data } = useBalance({
    address,
    watch: true,
  })

  return (
    <div>
      {data?.formatted} GoerliETH
    </div>
  )
}
