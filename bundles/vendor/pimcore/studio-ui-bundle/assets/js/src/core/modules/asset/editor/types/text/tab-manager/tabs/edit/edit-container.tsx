/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useContext } from 'react'
import { useAssetGetTextDataByIdQuery } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useStyle } from './edit-container.styles'
import { isSet } from '@Pimcore/utils/helpers'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'

const EditContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const { asset } = useAssetDraft(assetContext.id)
  const { styles } = useStyle()

  const fullPath = '/home/workspace/assets' + asset?.fullPath
  const filePath = '/home/workspace/assets' + asset?.path

  return (
    <div className={ styles.relativeContainer }>
      { isSet(fullPath) && isSet(filePath) && (
        <iframe
          src={ `https://literate-space-palm-tree-x5wwpr4xpcvx7g-3000.app.github.dev/?folder=${encodeURIComponent(filePath)}&file=${encodeURIComponent(fullPath)}` }
          style={ { width: '100%', height: '800px', border: 'none' } }
          title="Embedded Editor"
        />
      )}
    </div>
  )
}

export { EditContainer }
