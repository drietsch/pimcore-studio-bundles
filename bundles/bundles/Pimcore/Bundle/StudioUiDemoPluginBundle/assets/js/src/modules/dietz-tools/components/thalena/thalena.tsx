import React, { useState } from 'react'
import { Droppable } from '@pimcore/studio-ui-bundle/components'

const Thalena: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null)

  const handleDrop = (info: any) => {
    console.log('[Studio Drop] Info:', info)

    if (info.type !== 'asset') {
      setMessage('❌ Not an asset')
      return
    }

    const asset = info.data
    setMessage(`✅ Dropped: ${asset.filename || asset.id}`)
  }

  return (
    <Droppable
      isValidContext={ (info) => info.type === 'asset' }
      isValidData={ (info) => info.type === 'asset' }
      onDrop={ handleDrop }
      style={ {
        width: '100%',
        height: '200px',
        border: '2px dashed #999',
        borderRadius: '8px',
        background: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#333',
        fontSize: '16px'
      } }
      variant="outline"
    >
      <div>
        Drop an asset from Pimcore DAM here
        {message && <div style={ { marginTop: '1rem' } }>{message}</div>}
      </div>
    </Droppable>
  )
}

export default Thalena
