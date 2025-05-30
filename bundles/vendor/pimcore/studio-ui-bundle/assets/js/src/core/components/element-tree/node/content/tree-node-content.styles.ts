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

import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    container: css`
      width: 100%;
      overflow: hidden;
    `,
    containerChild: css`
      min-width: 150px
    `,
    unpublishedIcon: css`
      color: ${token.colorIconTreeUnpublished}
    `,
    unpublishedIconPath: css`
       .pimcore-icon__image {
          opacity: 0.4
       }
    `,
    indirectLockedIcon: css`
      opacity: 0.5;
    `
  }
})
