import React, { memo } from 'react'
import { Skeleton, Table, Td } from '@crosswiselabs/uikit'

const LoadingTable = () => (
  <Table>
    <tbody>
      <tr>
        <Td>
          <Skeleton />
        </Td>
        <Td>
          <Skeleton />
        </Td>
        <Td>
          <Skeleton />
        </Td>
      </tr>
      <tr>
        <Td>
          <Skeleton />
        </Td>
        <Td>
          <Skeleton />
        </Td>
        <Td>
          <Skeleton />
        </Td>
      </tr>
      <tr>
        <Td>
          <Skeleton />
        </Td>
        <Td>
          <Skeleton />
        </Td>
        <Td>
          <Skeleton />
        </Td>
      </tr>
    </tbody>
  </Table>
)

export default memo(LoadingTable)
