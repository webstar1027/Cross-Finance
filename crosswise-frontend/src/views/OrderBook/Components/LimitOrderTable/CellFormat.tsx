import React from 'react'
import { ReactElement } from 'react-markdown'
import { Box } from '@crosswiselabs/uikit'

interface CellFormatProps {
  firstRow: ReactElement | number | string
  secondRow: ReactElement
}

const CellFormat: React.FC<CellFormatProps> = ({ firstRow, secondRow }) => {
  return (
    <Box>
      <Box mb="4px">{firstRow}</Box>
      <Box>{secondRow}</Box>
    </Box>
  )
}

export default CellFormat
