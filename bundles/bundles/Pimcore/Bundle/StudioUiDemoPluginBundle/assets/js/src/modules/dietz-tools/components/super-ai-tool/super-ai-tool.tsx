import React from 'react'
import { Box, Alert } from '@pimcore/studio-ui-bundle/components'

const SuperAiTool: React.FC = () => {
  return (
    <Box padding="small">
      <h1>Super AI Tool</h1>
      <Alert message="I am the fanciest AI tool in the world, as I am able to show static text without the need of any prompt." />
    </Box>
  )
}

export default SuperAiTool
