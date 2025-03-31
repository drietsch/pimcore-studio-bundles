import React from 'react'
import { Box, Alert } from '@pimcore/studio-ui-bundle/components'

const VSCODE_URL =
  'https://literate-space-palm-tree-x5wwpr4xpcvx7g-3000.app.github.dev/?folder=/home/workspace/bundles'

const CodeEditor: React.FC = () => {
  return (
    <iframe
      height="100%"
      src={ VSCODE_URL }
      style={ { border: 'none' } }
      title="VSCode Embedded"
      width="100%"
    />
  )
}

export default CodeEditor
